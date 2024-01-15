import React, {
  useState, useEffect, lazy, Suspense, useCallback, useRef,
} from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { CSVLink } from 'react-csv'
// import QRCode from 'react-qr-code'
import QRCodeStyling from 'qr-code-styling'
// import { svgAsDataUri } from 'save-svg-as-png'

import Box from '@material-ui/core/Box'
// import Pagination from '@material-ui/lab/Pagination'
// import Typography from '@material-ui/core/Typography'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import PageTitle from '../../layout/PageTitle'

import {
  getPatchInvitations, disableInvitation, deleteInvitation, resetInvitation,
} from '../../API/invitations'
import { getFirebaseFunctions, getFirebaseStorage } from '../../API/firebase'
import { deleteUserById } from '../../API/users'
import { deleteCardByuserId, getCardById } from '../../API/cards'
import { deleteCounterById } from '../../API/counter'
import { deleteSubscriberById } from '../../API/subscriptions'
import { getPatchByPatchId, updatePatchInvitations } from '../../API/invitationPatches'

import * as actions from '../../store/actions'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'

import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

import { SENDOWL_CSV_HEADER } from '../../utilities/appVars'

const CreateInvitation = lazy(() => import('../../components/InvitationsAdmin/AddInvitations'))
const EditInvitations = lazy(() => import('../../components/InvitationsAdmin/EditInvitations'))
const InvitationList = lazy(() => import('../../components/InvitationsAdmin/InvitationList'))
const InvitationDetailsDialog = lazy(() => import('../../components/InvitationsAdmin/InvitationDetailsDialog'))
// const FilterInvitations = lazy(() => import('../../components/InvitationsAdmin/FilterInvitations'))
// const QrList = lazy(() => import('../../components/InvitationsAdmin/QrList'))

// const qrCode = new QRCodeStyling({
//   width: 250,
//   height: 250,
//   dotsOptions: {
//     color: '#272727',
//     type: 'rounded',
//   },
// })

const InvitationsAdmin = ({ onSetNotification }) => {
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.invitations
  const location = useLocation()
  const { patchId, invitationID } = queryString.parse(location.search)
  const invitationDomain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${language.languageVars.appDomain}`

  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const [invitations, setInvitations] = useState(null)
  // const [filteredInvitations, setFilteredInvitations] = useState(null)
  // const [currentPage, setCurrentPage] = useState(1)
  const [updated, setUpdated] = useState(false)
  const [createInvitationDialogOpen, setCreateInvitationDialogOpen] = useState(false)
  const [editInvitationsDialogOpen, setEditInvitationsDialogOpen] = useState(false)
  const [invitationDetailsDialogOpen, setInvitationDetailsDialogOpen] = useState(false)
  const [invitationDetailsDialogData, setInvitationDetailsDialogData] = useState(null)
  const [patch, setPatch] = useState(null)
  const [loading, setLoading] = useState(false)
  const qrCodeRefList = useRef([])
  // const [loadingNewInvitation, setLoadingNewInvitation] = useState(false)

  const pageUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/activate?tac=' : language.languageVars.appActivationURL

  const loadInvitations = useCallback(async () => {
    try {
      const patchData = await getPatchByPatchId(patchId)
      const allInvitations = await getPatchInvitations(patchId, invitationID || null)
      // let sortedInvitations = allInvitations
      // if (patchData.package === 'master') {
      //   sortedInvitations = allInvitations.sort((a, b) => {
      //     const comp1 = a.masterId
      //     const comp2 = b.masterId
      //     let r
      //     if (comp1 > comp2) {
      //       r = 1
      //     } else if (comp1 < comp2) {
      //       r = -1
      //     } else {
      //       r = 0
      //     }

      //     if (r === 0) {
      //       r = (typeof a.key !== 'undefined' && typeof b.key !== 'undefined') ? a.key - b.key : 0
      //     }

      //     return r
      //   })
      // }
      setPatch(patchData)
      setInvitations(allInvitations)
      // setFilteredInvitations(sortedInvitations)
      setUpdated(false)
    } catch (err) {
      throw new Error(err)
    }
  }, [invitationID, patchId])

  useEffect(() => {
    let mounted = true

    if (mounted || updated) {
      (async () => {
        await loadInvitations()
      })()
    }

    return () => { mounted = false }
  }, [loadInvitations, updated])

  console.log(invitations);

  // useEffect(() => {
  //   if (invitations && invitations.length > 0) {
  //     qrCode.append(ref.current)
  //   }
  // }, [invitations])
  useEffect(() => {
    if (invitations) {
      invitations.forEach((invitation, index) => {
        qrCodeRefList.current[index] = new QRCodeStyling({
          width: 250,
          height: 250,
          dotsOptions: { color: '#272727', type: 'rounded' },
        });
        qrCodeRefList.current[index].append(document.getElementById(`qrCode-${index}`));
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitations])

  useEffect(() => {
    if (invitations && invitations.length > 0) {
      qrCodeRefList.current.forEach((code, index) => {
        if (invitations[index]) {
          code.update({
            data: `${pageUrl}${invitations[index].code}`,
          })
        }
      })
    }
  }, [pageUrl, invitations])

  // const pageInvitations = pageNumber => {
  //   let invitationsInPage

  //   if (filteredInvitations) {
  //     invitationsInPage = filteredInvitations.slice(((pageNumber - 1) * (INVITATIONS_PER_PAGE)), ((pageNumber) * (INVITATIONS_PER_PAGE)))
  //   }

  //   return invitationsInPage
  // }

  // const paginationChangeHandler = (e, page) => {
  //   setCurrentPage(page)
  //   pageInvitations(page)
  // }

  const openInvitationDetailsDialogHandler = invitation => {
    setInvitationDetailsDialogOpen(true)
    setInvitationDetailsDialogData(invitation)
  }

  const closeInvitationDetailsDialogHandler = () => {
    setInvitationDetailsDialogOpen(false)
    setInvitationDetailsDialogData(null)
  }

  // const filterInvitations = type => {
  //   let newInvitations = null
  //   if (invitations && type === 'available') {
  //     newInvitations = [...invitations].filter(invitation => invitation.usedBy === null)
  //   } else if (invitations && type === 'used') {
  //     newInvitations = [...invitations].filter(invitation => invitation.usedBy !== null)
  //   } else if (invitations && type === 'connected') {
  //     newInvitations = [...invitations].filter(invitation => invitation.connected)
  //   } else if (invitations && type === 'unlinked') {
  //     newInvitations = [...invitations].filter(invitation => !invitation.connected)
  //   } else {
  //     newInvitations = [...invitations]
  //   }
  //   setFilteredInvitations(newInvitations)
  // }

  const closeInvitationDialogHandler = () => {
    setCreateInvitationDialogOpen(false)
  }

  const openInvitationDialogHandler = () => {
    setCreateInvitationDialogOpen(true)
  }

  const closeEditInvitationsDialogHandler = () => {
    setEditInvitationsDialogOpen(false)
  }

  const openEditInvitationsDialogHandler = () => {
    setEditInvitationsDialogOpen(true)
  }

  const updateInvitationList = () => {
    setUpdated(true)
  }

  const disableInvitationHandler = async invitationCode => {
    try {
      await disableInvitation(invitationCode)
      onSetNotification({
        message: pageStatics.messages.notifications.disableInvitationSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.disableInvitationError,
        type: 'error',
      })
    }
  }

  const deleteInvitationHandler = async invitationCode => {
    try {
      await deleteInvitation(invitationCode)
      await updatePatchInvitations('subtract', 1, patch.patchId)
      setUpdated(true)
      onSetNotification({
        message: pageStatics.messages.notifications.deleteInvitationSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.deleteInvitationError,
        type: 'error',
      })
    }
  }

  const checkInvitationCodeValidity = invitationObj => {
    let validMessage = 'Valid'
    if (invitationObj.used) {
      validMessage = 'Used'
      return validMessage
    }
    // if (invitationObj.expirationDate.toDate() < new Date()) {
    //   validMessage = 'Expired'
    // }
    return validMessage
  }

  // const openCreateInvitationDialogHandler = () => {
  //   setCreateInvitationDialogOpen(true)
  // }

  const mapToArray = (arr = []) => {
    const res = [];
    arr.forEach(obj => {
      res.push([`${invitationDomain}/activate?tac=${obj.code}`], [])
    })
    return res
  }

  const mapToSendOwlArray = (arr = []) => {
    const res = []
    let j = 0
    res.push(SENDOWL_CSV_HEADER)
    arr.forEach((obj, i) => {
      j = i < 9 ? `0${i + 1}` : i + 1
      res.push([`TESTSKU${j}`, `${invitationDomain}/activate?tac=${obj.code}`])
    })
    return res
  }

  const resetInvitationHandler = async (userId, invitationId) => {
    closeInvitationDetailsDialogHandler()
    const confirmBox = window.confirm('This action will wipe out the connected profile data and reset the invitation as new. Only do this action if the user wants to reset his account and never use it for different Tappl device.')
    if (confirmBox === true) {
      setLoading(true)
      try {
        const userData = await getCardById(userId)
        const dbFunctions = await getFirebaseFunctions()
        const deleteUserCall = dbFunctions.httpsCallable('deleteUser')
        const deletedUser = await deleteUserCall(userId)
        await deleteUserById(userId)
        await deleteCardByuserId(userId)
        await deleteSubscriberById(userId)
        await deleteCounterById(userId)

        if (userData.vCardFile) {
          await getFirebaseStorage().ref(`card/${userData.vCardFile}`).delete()
        }
        await resetInvitation(invitationId)
        await loadInvitations()
        setLoading(false)
        onSetNotification({
          message: 'Invitations reset successfully.',
          type: deletedUser.data.message.type,
        })
      } catch (err) {
        setLoading(false)
        onSetNotification({
          message: 'Resetting invitation failed',
          type: 'error',
        })
      }
    }
  }

  const downloadQrList = async e => {
    e.preventDefault()
    for (let i = 0; i < invitations.length; i += 1) {
      qrCodeRefList.current[i].download({ extension: 'svg', name: `${invitations[i].patchId.trim()}_${invitations[i].code.trim()}_QRcode.svg` })
    }
  }

  // const addInvitation = async () => {
  //   setLoadingNewInvitation(true)
  //   try {
  //     await generateInvitaionCode(patch.package, patch.patchId, 'single', patch.masterId || null, patch.theme || null)
  //     await updatePatchInvitations(patch.patchId)
  //     setLoadingNewInvitation(false)
  //     onSetNotification({
  //       message: 'Invitation added successfully',
  //       type: 'success',
  //     })
  //   } catch (err) {
  //     onSetNotification({
  //       message: 'There was a problem adding invitation',
  //       type: 'error',
  //     })
  //     setLoadingNewInvitation(false)
  //   }
  // }

  // const openCreatePatchDialogHandler = () => {
  //   setCreateInvitationDialogOpen(true)
  // }

  // const closePatchDialogHandler = () => {
  //   setCreatePatchDialogOpen(false)
  // }

  if (loading) {
    return <LoadingBackdrop loadingText="Resetting invitation..." boxed />
  }

  // if (loadingNewInvitation) {
  //   return <LoadingBackdrop loadingText="Adding invitation..." placement="inset" />
  // }
  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        {!invitations ? (
          <LoadingBackdrop loadingText={pageStatics.messages.loading.loadingInvitations} boxed />
        ) : (
          <>
            {
            //   <Button
            //   color="primary"
            //   onClick={() => openCreateInvitationDialogHandler()}
            //   className={buttonClasses.defaultButton}
            //   style={{
            //     backgroundColor: color.color.code,
            //     minWidth: '250px',
            //   }}
            // >
            //     {pageStatics.buttons.generateInvitationCode}
            //   </Button>
            }
            {/* <Box>
              <CSVLink
                data={mapToArray(invitations)}
                filename={`${patchId}_${language.languageVars.appNameCAPS}.csv`}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: color.color.code,
                  minWidth: '250px',
                }}
              >
                Download CSV
              </CSVLink>
            </Box> */}
            {/* <Box mt={2}>
              <CSVLink
                data={mapToSendOwlArray(invitations)}
                filename={`${patchId}_${language.languageVars.appNameCAPS}_Sendowl.csv`}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: color.color.code,
                  minWidth: '250px',
                }}
              >
                Download Sendowl CSV
              </CSVLink>
            </Box> */}
            <Box className={`${layoutClasses.panel}`}>
              {/* <Suspense fallback={language.languageVars.loading}>
                <FilterInvitations onFilter={filterInvitations} />
              </Suspense> */}
              <PageTitle title={`${patch && patch.patchId}: ${patch && patch.patchTitle}`} />
              <Box mt={2} mb={2} display="flex" flexWrap="wrap" justifyContent="space-between" style={{ gap: 16 }}>
                <ButtonGroup size="large" aria-label="Downloads">
                  <Button className={buttonClasses.sortButton}>
                    <CSVLink
                      data={mapToArray(invitations)}
                      filename={`${patchId}_${language.languageVars.appNameCAPS}.csv`}
                    >
                      Download CSV
                    </CSVLink>
                  </Button>
                  <Button className={buttonClasses.sortButton}>
                    <CSVLink
                      data={mapToSendOwlArray(invitations)}
                      filename={`${patchId}_${language.languageVars.appNameCAPS}_Sendowl.csv`}
                    >
                      Download Sendowl CSV
                    </CSVLink>
                  </Button>
                  <Button
                    onClick={e => downloadQrList(e)}
                    className={`${buttonClasses.sortButton}`}
                  >
                    Download QR list
                  </Button>
                </ButtonGroup>
                <ButtonGroup size="large" aria-label="Downloads">
                  <Button
                    color="primary"
                    className={`${buttonClasses.defaultButton} ${buttonClasses.smallButton}`}
                    style={{
                      backgroundColor: color.color.code,
                      width: 'auto',
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}
                    onClick={() => openInvitationDialogHandler()}
                  >
                    Add invitations
                  </Button>
                  <Button
                    color="primary"
                    className={`${buttonClasses.defaultButton} ${buttonClasses.smallButton}`}
                    style={{
                      backgroundColor: color.color.code,
                      width: 'auto',
                      paddingLeft: 16,
                      paddingRight: 16,
                    }}
                    onClick={() => openEditInvitationsDialogHandler()}
                  >
                    Edit invitations
                  </Button>
                </ButtonGroup>
              </Box>
              <Suspense fallback={language.languageVars.loading}>
                <InvitationList
                  invitations={invitations}
                  onOpenDetailsDialog={openInvitationDetailsDialogHandler}
                  disableInvitation={disableInvitationHandler}
                  deleteInvitation={deleteInvitationHandler}
                  isValid={checkInvitationCodeValidity}
                  resetInvitation={resetInvitationHandler}
                />
              </Suspense>
              {/* {(filteredInvitations && filteredInvitations.length > 9) && (
                <Box mt={5}><Pagination count={Math.ceil(filteredInvitations.length / INVITATIONS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>
              )} */}
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>QR codes</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                  <Box display="flex" flexWrap="wrap" justifyContent="center">
                    {invitations && invitations.map((_, index) => (
                      <Box key={index}>
                        <div id={`qrCode-${index}`} />
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
              {/* <Suspense fallback={language.languageVars.loading}>
                <QrList invitations={filteredInvitations} />
              </Suspense> */}
            </Box>
            <Suspense fallback={language.languageVars.loading}>
              <InvitationDetailsDialog
                open={invitationDetailsDialogOpen}
                onClose={closeInvitationDetailsDialogHandler}
                invitation={invitationDetailsDialogData}
                resetInvitation={resetInvitationHandler}
              />
            </Suspense>
          </>
        )}
        <Suspense fallback={language.languageVars.loading}>
          <CreateInvitation
            dialogOpen={createInvitationDialogOpen}
            closeDialog={closeInvitationDialogHandler}
            updateInvitationList={updateInvitationList}
            onSetNotification={onSetNotification}
            patch={patch}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <EditInvitations
            invitations={invitations}
            dialogOpen={editInvitationsDialogOpen}
            closeDialog={closeEditInvitationsDialogHandler}
            updateInvitationList={updateInvitationList}
            onSetNotification={onSetNotification}
            patch={patch}
          />
        </Suspense>
      </Box>
    </Box>
  )
}

InvitationsAdmin.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(null, mapDispatchToProps)(InvitationsAdmin)
