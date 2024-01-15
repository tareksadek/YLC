import React, {
  useState, useEffect, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CSVLink } from 'react-csv'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CircularProgress from '@material-ui/core/CircularProgress'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'

import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { deletePatchById } from '../../API/invitationPatches'
import { deleteInvitationsByPatchId, getMasterInvitations } from '../../API/invitations'
import { getProducts } from '../../API/products'

import * as actions from '../../store/actions'

import { patchesStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

import { cleanInvitationCode } from '../../utilities/utils'

import * as vars from '../../utilities/appVars'

// const PatchesList = lazy(() => import('../../components/Patches/PatchesList'))
const CreatePatch = lazy(() => import('../../components/Patches/CreatePatch'))
const ChangeStatus = lazy(() => import('../../components/Patches/ChangeStatus'))
const ChangeTitle = lazy(() => import('../../components/Patches/ChangeTitle'))
// const SearchPatches = lazy(() => import('../../components/Patches/SearchPatches'))
// const FilterPatches = lazy(() => import('../../components/Patches/FilterPatches'))
// const SortPatches = lazy(() => import('../../components/Patches/SortPatches'))
const PatchesGrid = lazy(() => import('../../components/Patches/PatchesGrid'))
const PatchDetails = lazy(() => import('../../components/Patches/PatchDetails'))

const Patches = ({
  onLoadPatches,
  // onSortPatches,
  loading,
  patches,
  patchesCount,
  // patchesPerPage,
  // gridLayout,
  onSetNotification,
}) => {
  const classes = patchesStyles()
  const [createPatchDialogOpen, setCreatePatchDialogOpen] = useState(false)
  const [changeStatusDialogOpen, setChangeStatusDialogOpen] = useState(false)
  const [changeTitleDialogOpen, setChangeTitleDialogOpen] = useState(false)
  // const [searchedPatches, setSearchedPatches] = useState(null)
  // const [filterededPatches, setFilteredPatches] = useState(null)
  const [patchInfo, setPatchInfo] = useState(null)
  const [loadingBackdrop, setLoadingBackdrop] = useState(false)
  // const [searchingInProgress, setSearchingInProgress] = useState(false)
  const [patchDetailsDialogOpen, setPatchDetailsDialogOpen] = useState(false)
  const [products, setProducts] = useState(null)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
  const [selectedProductShort, setSelectedProductShort] = useState(null)
  const [masterInvitations, setMasterInvitations] = useState(null)
  const [downloadInvitations, setDownloadInvitations] = useState(null)
  const auth = useAuth()
  const history = useHistory()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.patches
  // const classes = patchesStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  // const patchesGrid = gridLayout || {
  //   lg: 3, md: 4, sm: 6, xs: 6,
  // }
  const { user } = auth

  const invitationDomain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${language.languageVars.appDomain}`
  console.log(patches);
  useEffect(() => {
    let mounted = true
    const { superAdminStatus } = auth

    if (mounted && !patches) {
      (async () => {
        if (user) {
          if (superAdminStatus) {
            await onLoadPatches()
          } else {
            history.push(vars.LOGIN_REDIRECT)
          }
        }
      })()
    }

    return () => {
      mounted = false
    }
  }, [auth, history, onLoadPatches, patches, user])

  useEffect(() => {
    let mounted = true
    setLoadingProducts(true)

    if (mounted && !products) {
      (async () => {
        const prods = await getProducts()
        if (prods && prods.length > 0) {
          const downInv = await getMasterInvitations()
          setMasterInvitations(downInv)
          setDownloadInvitations(downInv.filter(inv => inv.productId === prods[0].id))
        }
        setProducts(prods)
        setSelectedProductId(prods && prods.length > 0 ? prods[0].id : null)
        setSelectedProductShort(prods && prods.length > 0 ? prods[0].short : null)
      })()
    }

    setLoadingProducts(false)

    return () => {
      mounted = false
    }
  }, [products])

  // const pagePatches = pageNumber => {
  //   let patchesInPage

  //   if (searchedPatches) {
  //     return searchedPatches
  //   }

  //   if (filterededPatches) {
  //     return filterededPatches
  //   }

  //   if (patches) {
  //     patchesInPage = patches.slice(((pageNumber - 1) * (patchesPerPage)), ((pageNumber) * (patchesPerPage)))
  //   }

  //   return patchesInPage
  // }

  // const searchPatchesHandler = searchKeyword => {
  //   setSearchingInProgress(true)
  //   const searchFor = searchKeyword.toLowerCase()

  //   if (searchFor.length >= 3) {
  //     setSearchedPatches(patches.filter(patch => {
  //       const searchNumber = patch.patchId
  //       if (searchNumber.toLowerCase().includes(searchFor)) {
  //         return true
  //       }

  //       return false
  //     }))
  //   } else {
  //     setSearchedPatches(null)
  //     // setCurrentPage(1)
  //   }
  //   setSearchingInProgress(false)
  //   return false
  // }

  // const clearSearchHandler = () => {
  //   setSearchedPatches(null)
  // }

  // const filterPatchesHandler = (filterValue, filterType) => {
  //   const filterBy = filterValue
  //   let filter

  //   setFilteredPatches(patches.filter(filteredPatch => {
  //     if (filterType === 'package') {
  //       filter = filteredPatch.package
  //     }

  //     if (filter === filterBy) {
  //       return true
  //     }

  //     return false
  //   }))

  //   return false
  // }

  // const clearFilterHandler = () => {
  //   setFilteredPatches(null)
  // }

  // const paginationChangeHandler = (e, page) => {
  //   setCurrentPage(page)
  //   pagePatches(page)
  // }

  const openCreatePatchDialogHandler = () => {
    setCreatePatchDialogOpen(true)
  }

  const closePatchDialogHandler = () => {
    setCreatePatchDialogOpen(false)
  }

  const openChangeTitleDialogHandler = info => {
    setPatchInfo(info)
    setChangeTitleDialogOpen(true)
  }

  const closeChangeTitleDialogHandler = () => {
    setChangeTitleDialogOpen(false)
    setPatchInfo(null)
  }

  const openChangeStatusDialogHandler = info => {
    setPatchInfo(info)
    setChangeStatusDialogOpen(true)
  }

  const closeChangeStatusDialogHandler = () => {
    setChangeStatusDialogOpen(false)
    setPatchInfo(null)
  }

  const openPatchDetailsDialogHandler = info => {
    setPatchInfo(info)
    setPatchDetailsDialogOpen(true)
  }

  const closePatchDetailsDialogHandler = () => {
    setPatchDetailsDialogOpen(false)
  }

  const reloadPatches = async () => {
    try {
      await onLoadPatches(user.email)
    } catch (err) {
      throw new Error(err)
    }
  }

  // const sortPatches = (value, type) => {
  //   onSortPatches(value, type)
  // }

  const deletePatch = async patchId => {
    setLoadingBackdrop(true)
    try {
      await deletePatchById(patchId)
      await deleteInvitationsByPatchId(patchId)
      setMasterInvitations(null)
      setDownloadInvitations(null)
      setLoadingBackdrop(false)
      setProducts(null)
      await reloadPatches()
      onSetNotification({
        message: 'Batch deleted successfully',
        type: 'success',
      })
    } catch (err) {
      setLoadingBackdrop(false)
      onSetNotification({
        message: 'There was a problem deleting batch',
        type: 'error',
      })
    }
  }

  const selectInvitationProductHandler = prod => {
    setSelectedProductId(prod.id)
    setSelectedProductShort(prod.short)
    setDownloadInvitations(masterInvitations.filter(inv => inv.productId === prod.id))
  }

  const mapToSendOwlLinksArray = (arr = []) => {
    const res = []
    let j = 0
    res.push(vars.SENDOWL_CSV_HEADER)
    arr.forEach((obj, i) => {
      j = i < 9 ? `0${i + 1}` : i + 1
      res.push([`TESTSKU${j}`, `${invitationDomain}/activate?tac=${obj.code}`])
    })
    return res
  }

  const mapToSendOwlCodesArray = (arr = []) => {
    const res = []
    let j = 0
    res.push(vars.SENDOWL_CSV_HEADER)
    arr.forEach((obj, i) => {
      j = i < 9 ? `0${i + 1}` : i + 1
      res.push([`TESTSKU${j}`, cleanInvitationCode(obj.code)])
    })
    return res
  }

  const showInvitationsHandler = patchId => {
    history.push(`/invitationsAdmin?patchId=${patchId}`)
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        {(loading || loadingBackdrop) && <LoadingBackdrop loadingText={language.languageVars.processing} boxed />}
        <Box display="flex" flexDirection="column-reverse" alignItems="center" justifyContent="space-between" mb={2}>
          {loadingProducts ? (
            <CircularProgress />
          ) : (
            <Box mt={1} width="100%">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Download</Typography>
                </AccordionSummary>
                <AccordionDetails style={{ padding: 0 }}>
                  <Box p={1}>
                    <List component="ul" aria-label="products">
                      {products && products.map(product => (
                        <ListItem className={classes.productsList} button key={product.id} onClick={() => selectInvitationProductHandler(product)}>
                          <ListItemIcon>
                            {product.id === selectedProductId ? (
                              <CheckCircleOutlineIcon />
                            ) : (
                              <RadioButtonUncheckedIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText primary={product.title} secondary={product.description} />
                        </ListItem>
                      ))}
                    </List>
                    {selectedProductId && selectedProductShort && downloadInvitations && downloadInvitations.length > 0 && (
                      <ButtonGroup size="large" aria-label="Downloads">
                        <Button className={buttonClasses.sortButton} disabled={!downloadInvitations || downloadInvitations.length === 0}>
                          <CSVLink
                            data={mapToSendOwlLinksArray(downloadInvitations)}
                            filename={`${selectedProductShort}_${language.languageVars.appNameCAPS}_Sendowl_Links.csv`}
                            className={!downloadInvitations || downloadInvitations.length === 0 ? classes.diabledDownloadButton : ''}
                          >
                            Download Invitation Links
                          </CSVLink>
                        </Button>
                        <Button className={buttonClasses.sortButton} disabled={!downloadInvitations || downloadInvitations.length === 0}>
                          <CSVLink
                            data={mapToSendOwlCodesArray(downloadInvitations)}
                            filename={`${selectedProductShort}_${language.languageVars.appNameCAPS}_Sendowl_Codes.csv`}
                            className={!downloadInvitations || downloadInvitations.length === 0 ? classes.diabledDownloadButton : ''}
                          >
                            Download Invitation Codes
                          </CSVLink>
                        </Button>
                      </ButtonGroup>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          )}

          <Button
            color="primary"
            onClick={() => openCreatePatchDialogHandler()}
            className={buttonClasses.defaultButton}
            style={{
              backgroundColor: color.color.code,
              minWidth: '250px',
              marginBottom: 8,
            }}
          >
            {pageStatics.buttons.createNewPatch}
          </Button>
        </Box>
        {/* <Box className={classes.filterContainer}>
          <Suspense fallback={pageStatics.messages.loading.constructingSearch}>
            <SearchPatches onSearch={searchPatchesHandler} onClear={clearSearchHandler} />
            <FilterPatches onFilter={filterPatchesHandler} onClear={clearFilterHandler} />
            <SortPatches onSort={sortPatches} />
          </Suspense>
        </Box> */}
        {/* <Suspense fallback={language.languageVars.loading}>
          <PatchesList
            patches={pagePatches(currentPage)}
            loading={loading}
            grid={patchesGrid}
            openChangeStatusDialog={openChangeStatusDialogHandler}
            deletePatch={deletePatch}
          />
        </Suspense> */}
        <Suspense fallback={language.languageVars.loading}>
          <CreatePatch
            reloadPatches={reloadPatches}
            patchesCount={patchesCount}
            dialogOpen={createPatchDialogOpen}
            closeDialog={closePatchDialogHandler}
            products={products}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <ChangeTitle
            patchInfo={patchInfo}
            reloadPatches={reloadPatches}
            dialogOpen={changeTitleDialogOpen}
            closeDialog={closeChangeTitleDialogHandler}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <ChangeStatus
            patchInfo={patchInfo}
            reloadPatches={reloadPatches}
            dialogOpen={changeStatusDialogOpen}
            closeDialog={closeChangeStatusDialogHandler}
          />
        </Suspense>
        {patchDetailsDialogOpen && (
          <Suspense fallback={language.languageVars.loading}>
            <PatchDetails
              patchInfo={patchInfo}
              onViewInvitations={showInvitationsHandler}
              dialogOpen={patchDetailsDialogOpen}
              closeDialog={closePatchDetailsDialogHandler}
            />
          </Suspense>
        )}
        {/* {(!searchedPatches && !filterededPatches) && <Box mt={5}><Pagination count={Math.ceil(patchesCount / patchesPerPage)} variant="outlined" onChange={paginationChangeHandler} /></Box>} */}
        <Suspense fallback={language.languageVars.loading}>
          <PatchesGrid
            patches={patches}
            onRemove={deletePatch}
            // onOpenDetailsDialog={openConnectionNoteDialogHandler}
            // onOpenEditDialog={openEditConnectionDialogHandler}
            // onOpenAssignDialog={openAssignTagDialogHandler}
            // onAddToContact={addToContact}
            onChangeStatus={openChangeStatusDialogHandler}
            onChangeTitle={openChangeTitleDialogHandler}
            onViewPatchDetails={openPatchDetailsDialogHandler}
            onViewPatchInvitations={showInvitationsHandler}
            // searchedPatches={searchedPatches}
            // searchingInProgress={searchingInProgress}
            disableActions={loading}
            disableRemove={false}
          />
        </Suspense>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  loading: state.patches.loading,
  patches: state.patches.patches,
  patchesCount: state.patches.patchesCount,
  patchesPerPage: state.patches.patchesPerPage,
})

const mapDispatchToProps = dispatch => ({
  onLoadPatches: () => dispatch(actions.loadPatches()),
  onSortPatches: (value, type) => dispatch(actions.sortPatches(value, type)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

Patches.defaultProps = {
  loading: false,
  patches: null,
  patchesCount: 0,
  // patchesPerPage: 0,
  // gridLayout: null,
}

Patches.propTypes = {
  loading: PropTypes.bool,
  patches: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  patchesCount: PropTypes.number,
  // patchesPerPage: PropTypes.number,
  onLoadPatches: PropTypes.func.isRequired,
  // onSortPatches: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  // gridLayout: PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  // ])),
}

export default connect(mapStateToProps, mapDispatchToProps)(Patches)
