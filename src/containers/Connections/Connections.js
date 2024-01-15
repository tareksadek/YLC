import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  sub, isEqual, isAfter, isBefore,
} from 'date-fns'

import { CSVLink } from 'react-csv'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import GetAppIcon from '@material-ui/icons/GetApp'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import SkeletonContainer from '../../layout/SkeletonContainer'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'
import InfoBox from '../../components/Ui/InfoBox'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { deductConnectionsById } from '../../API/cards'
import { deleteConnectionById } from '../../API/connections'

import {
  mapToArray, mapToFacebookArray, mapToMailchimpArray, mapToSalesForceArray, mapToHubspotArray, generateVcard,
} from '../../utilities/utils'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import ConnectionsGrid from '../../components/Connections/ConnectionsGrid'
import AdvancedSearch from '../../components/Connections/AdvancedSearch'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { connectionsStyles } from './styles'

import {
  CONNECTIONS_CSV_HEADER,
  CONNECTIONS_FACEBOOK_CSV_HEADER,
  CONNECTIONS_MAILCHIMP_CSV_HEADER,
  CONNECTIONS_SALESFORCE_CSV_HEADER,
  CONNECTIONS_HUBSPOT_CSV_HEADER,
} from '../../utilities/appVars'

import * as actions from '../../store/actions'

const ConnectionNoteDialog = lazy(() => import('../../components/Connections/ConnectionNoteDialog'))
const AddConnectionDialog = lazy(() => import('../../components/Connections/AddConnectionDialog'))
const EditConnectionDialog = lazy(() => import('../../components/Connections/EditConnectionDialog'))
const AssignTag = lazy(() => import('../../components/Connections/AssignTag'))

const Connections = ({
  cardData, connections, onSetNotification, onRemoveConnection,
  connectionTags, connectionForms, connectionSettings, onLoadConnectionData, activeProfileId,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = connectionsStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections
  const color = useColor()
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix
  const fallBackColor = cardData && cardData.settings && cardData.settings.theme === 'light' ? '#272727' : '#ffffff'
  // const isPro = auth.isSubscriber && (auth.subscriberStatus === 'active' || auth.subscriberStatus === 'trialing')
  const initialAdvancedSearchFormState = {
    startDate: createFormElementObj('date', pageStatics.forms.advancedSearch.startDate,
      {
        type: 'date',
        name: 'startDate',
        placeholder: pageStatics.forms.advancedSearch.startDate,
        disablePast: false,
        disableFuture: true,
        maxDate: sub(new Date(), { days: 0 }),
      },
      null,
      null,
      { required: true },
      false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    endDate: createFormElementObj('date', pageStatics.forms.advancedSearch.endDate,
      {
        type: 'date',
        name: 'endDate',
        placeholder: pageStatics.forms.advancedSearch.endDate,
        disablePast: false,
        disableFuture: true,
        maxDate: new Date(),
      },
      null,
      null,
      { required: true },
      false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    tags: createFormElementObj('checkboxGroup', `${pageStatics.forms.advancedSearch.tags}`,
      {
        type: 'checkbox', name: 'tags', placeholder: `${pageStatics.forms.advancedSearch.tags}`, tag: 'text',
      },
      '',
      connectionTags && connectionTags.length > 0 ? connectionTags.map(tag => ({ ...tag, value: tag.id })) : [],
      { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  }

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingConnections)
  const [connectionNoteDialogOpen, setConnectionNoteDialogOpen] = useState(window.location.hash === '#details')
  const [connectionNoteDialogData, setConnectionNoteDialogData] = useState(null)
  const [addConnectionDialogOpen, setAddConnectionDialogOpen] = useState(window.location.hash === '#connect')
  const [editConnectionDialogOpen, setEditConnectionDialogOpen] = useState(window.location.hash === '#edit')
  const [assignTagDialogOpen, setAssignTagDialogOpen] = useState(window.location.hash === '#assign')
  const [editConnectionDialogData, setEditConnectionDialogData] = useState(null)
  const [advancedSearchForm, setAdvancedSearchForm] = useState({ ...initialAdvancedSearchFormState })
  const [advancedSearchFormValid, setAdvancedSearchFormValid] = useState(false)
  const [searchedConnections, setSearchedConnections] = useState(null)
  const [searchingInProgress, setSearchingInProgress] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const openMenu = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const closeViewMenu = e => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  // useEffect(() => {
  //   let mounted = true

  //   if ((mounted && !cardData.userId) || adminConnectionsRequestId || !isTheLoggedinUser) {
  //     (async () => {
  //       setLoading(true)
  //       // await getCardById(adminConnectionsRequestId || auth.user.uid)
  //       if (!adminConnectionsRequestId) {
  //         await onLoadCard(auth.user.uid)
  //       }
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [
  //   onLoadCard, auth.user.uid, adminConnectionsRequestId, cardData.userId, isTheLoggedinUser, cardData.offerTags,
  // ])

  useEffect(() => {
    let mounted = true
    if (mounted && cardData.userId && !cardData.loading) {
      (async () => {
        // setLoading(true)
        try {
          await onLoadConnectionData(cardData.userId, cardData.masterProfileId, true)
          // setLoadingDone(true)
          // setTimeout(() => setLoading(false), 1000)
        } catch (err) {
          setLoadingDone(true)
          setTimeout(() => setLoading(false), 1000)
        }
      })()
    }

    return () => { mounted = false }
  }, [onLoadConnectionData, cardData])

  // useEffect(() => {
  //   let mounted = true
  //
  //   if (mounted && auth.user.uid && !connectionForms) {
  //     (async () => {
  //       await onLoadForms(auth.user.uid)
  //       await onLoadConnectionSettings(auth.user.uid)
  //     })()
  //   }
  //
  //   return () => { mounted = false }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.user.uid, onLoadForms, onLoadConnectionSettings])

  // useEffect(() => {
  //   let mounted = true
  //
  //   if (mounted && !connectionTags) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadConnectionTags(auth.user.uid)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }
  //   return () => { mounted = false }
  // }, [onLoadConnectionTags, auth.user.uid, connectionTags])

  useEffect(() => {
    const onHashChange = () => {
      setAddConnectionDialogOpen(window.location.hash === '#connect')
      setConnectionNoteDialogOpen(window.location.hash === '#details')
      setEditConnectionDialogOpen(window.location.hash === '#edit')
      setAssignTagDialogOpen(window.location.hash === '#assign')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // useEffect(() => {
  //   if (!adminConnectionsRequestId && window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme, adminConnectionsRequestId])

  useEffect(() => {
    const date = auth.createdOn ? new Date(auth.createdOn.toDate()) : new Date()
    const data = {
      startDate: sub(date, { days: 0 }),
      endDate: new Date(),
    }
    const adjustedAdvancedSearchForm = adjustFormValues(advancedSearchForm, data, null)
    setAdvancedSearchForm(prevForm => ({ ...prevForm, ...adjustedAdvancedSearchForm.adjustedForm }))
    setAdvancedSearchFormValid(adjustedAdvancedSearchForm.formValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.createdOn])

  const defaultFormId = connectionSettings && connectionSettings.defaultFormId
  const activeForm = connectionForms && connectionForms.find(connectionForm => connectionForm.id === defaultFormId)

  const removeConnectionHandler = async connection => {
    const confirmBox = window.confirm(`
      ${pageStatics.messages.notifications.deleteConnectionPrompt.first}
      ${connection.firstName || ''} ${connection.lastName || ''}
      ${pageStatics.messages.notifications.deleteConnectionPrompt.second}
    `)
    if (confirmBox === true) {
      setLoadingMessage(pageStatics.messages.loading.removingConnection)
      setLoadingDone(false)
      setLoading(true)
      try {
        await deleteConnectionById(activeProfileId || auth.user.uid, connection.id)
        await deductConnectionsById(auth.user.uid, cardData.defaultId, connection.addedByOwner)
        onRemoveConnection(connection.id)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
        setLoadingMessage(pageStatics.messages.loading.loadingConnections)
        onSetNotification({
          message: pageStatics.messages.notifications.deleteConnectionSuccess,
          type: 'success',
        })
      } catch (err) {
        onSetNotification({
          message: pageStatics.messages.notifications.deleteConnectionError,
          type: 'error',
        })
        throw new Error(err)
      }
    }
  }

  const addToContact = async contactInfo => {
    try {
      const a = document.createElement('a')
      const vcardName = `${contactInfo.firstName || ''}_${contactInfo.lastName || ''}_${new Date().getTime()}.vcf`
      const websiteLinkObj = contactInfo.website ? [{ link: contactInfo.website, linkTitle: 'website', active: true }] : null
      const file = generateVcard(contactInfo, websiteLinkObj, vcardName, null, null, null)
      const url = window.URL.createObjectURL(new Blob([file], { type: 'text/vcard' }))
      a.href = url
      a.download = vcardName
      a.click()
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.downloadVcardError,
        type: 'error',
      })
    }
  }

  const openConnectionNoteDialogHandler = connection => {
    setConnectionNoteDialogData(connection)
    window.location.hash = '#details'
  }

  const closeConnectionNoteDialogHandler = () => {
    window.history.back()
  }

  const openEditConnectionDialogHandler = connection => {
    setEditConnectionDialogData(connection)
    window.location.hash = '#edit'
  }

  const closeEditConnectionDialogHandler = () => {
    setEditConnectionDialogData(null)
    window.history.back()
  }

  const openAssignTagDialogHandler = connection => {
    setEditConnectionDialogData(connection)
    window.location.hash = '#assign'
  }

  const closeAssignTagDialogHandler = () => {
    setEditConnectionDialogData(null)
    window.history.back()
  }

  const openAddConnectionDialog = () => {
    window.location.hash = '#connect'
  }

  const closeAddConnectionDialog = () => {
    window.history.back()
  }

  const inputChangeHandler = async (eve, key) => {
    let changeEvent
    let e = eve
    if (!e) {
      e = ''
    }
    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedAdvancedSearchForm = adjustFormValues(advancedSearchForm, changeEvent, key)
    setAdvancedSearchForm(adjustedAdvancedSearchForm.adjustedForm)
    setAdvancedSearchFormValid(adjustedAdvancedSearchForm.formValid)
  }

  const clearSearchConnectionsHandler = e => {
    e.preventDefault()
    setSearchingInProgress(true)
    setSearchedConnections(null)
    const data = {
      startDate: new Date(auth.createdOn.toDate()),
      endDate: new Date(),
      tags: [],
    }
    const adjustedAdvancedSearchForm = adjustFormValues(advancedSearchForm, data, null)
    setAdvancedSearchForm(prevForm => ({ ...prevForm, ...adjustedAdvancedSearchForm.adjustedForm }))
    setAdvancedSearchFormValid(adjustedAdvancedSearchForm.formValid)
    setSearchingInProgress(false)
  }

  const searchConnectionsHandler = e => {
    e.preventDefault()
    setSearchingInProgress(true)
    const formDetails = createFormValuesObj(advancedSearchForm)
    const searchStartDate = formDetails.startDate && formDetails.startDate !== '' ? formDetails.startDate : new Date(auth.createdOn.toDate())
    const searchEndDate = formDetails.endDate && formDetails.endDate !== '' ? formDetails.endDate : new Date()
    const searchTags = formDetails.tags && formDetails.tags.length > 0 ? formDetails.tags : []

    // if (searchTags.length === 0) {
    //   clearSearchConnectionsHandler(e)
    //   return
    // }

    const filteredConnections = connections.connections.filter(connection => {
      let searchRes = (isAfter(connection.addedOn.toDate(), searchStartDate) && isBefore(connection.addedOn.toDate(), searchEndDate))
      || isEqual(connection.addedOn.toDate(), searchStartDate)

      if (searchTags.length > 0) {
        searchRes = connection.tags && connection.tags.length > 0 ? searchTags.some(r => connection.tags.indexOf(r) >= 0) : false
      }

      return searchRes
    })
    setSearchedConnections(filteredConnections)
    setSearchingInProgress(false)
  }

  // if (loading) {
  //   return <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} />
  // }

  // console.log(activeProfileId);
  // console.log(auth.user.uid);

  if (connections.loading || loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.page}>
          <Box>
            <InfoBox infoList={[pageStatics.messages.info.general.title]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />}
      <Header title={pageStatics.data.titles.page}>
        <Box>
          <InfoBox infoList={[pageStatics.messages.info.general.title]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          {(connections.connections && connections.connections.length > 0) ? (
            <Box className={`${layoutClasses.panel}`}>
              <Button
                color="secondary"
                onClick={e => openMenu(e)}
                className={`${buttonClasses.textButton} ${classes.downloadCSV}`}
                style={{
                  color: color.color.code,
                }}
                disabled={loading}
              >
                <GetAppIcon style={{ color: color.color.code }} />
                {pageStatics.buttons.download}
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={closeViewMenu}
                classes={{ paper: classes.downloadMenu }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem className={classes.cardMenuButton}>
                  <CSVLink
                    data={mapToArray(connections.connections, CONNECTIONS_CSV_HEADER) || []}
                    filename={`${language.languageVars.files.myConnections}.csv`}
                    className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                    style={{
                      backgroundColor: color.color.code,
                      maxWidth: 220,
                    }}
                  >
                    {pageStatics.buttons.downloadCSV}
                  </CSVLink>
                </MenuItem>
                <MenuItem className={classes.cardMenuButton}>
                  <CSVLink
                    data={mapToFacebookArray(connections.connections, CONNECTIONS_FACEBOOK_CSV_HEADER) || []}
                    filename={`${language.languageVars.files.facebookCampaign}.csv`}
                    className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                    style={{
                      backgroundColor: color.color.code,
                      maxWidth: 220,
                    }}
                  >
                    {pageStatics.buttons.downloadFacebookCSV}
                  </CSVLink>
                </MenuItem>
                <MenuItem className={classes.cardMenuButton}>
                  <CSVLink
                    data={mapToMailchimpArray(connections.connections, CONNECTIONS_MAILCHIMP_CSV_HEADER) || []}
                    filename={`${language.languageVars.files.mailChimp}.csv`}
                    className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                    style={{
                      backgroundColor: color.color.code,
                      maxWidth: 220,
                    }}
                  >
                    {pageStatics.buttons.downloadMailchimpCSV}
                  </CSVLink>
                </MenuItem>
                <MenuItem className={classes.cardMenuButton}>
                  <CSVLink
                    data={mapToSalesForceArray(connections.connections, CONNECTIONS_SALESFORCE_CSV_HEADER) || []}
                    filename={`${language.languageVars.files.salesforce}.csv`}
                    className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                    style={{
                      backgroundColor: color.color.code,
                      maxWidth: 220,
                    }}
                  >
                    {pageStatics.buttons.downloadSalesforceCSV}
                  </CSVLink>
                </MenuItem>
                <MenuItem className={classes.cardMenuButton}>
                  <CSVLink
                    data={mapToHubspotArray(connections.connections, CONNECTIONS_HUBSPOT_CSV_HEADER) || []}
                    filename={`${language.languageVars.files.hubspot}.csv`}
                    className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                    style={{
                      backgroundColor: color.color.code,
                      maxWidth: 220,
                    }}
                  >
                    {pageStatics.buttons.downloadHubspotCSV}
                  </CSVLink>
                </MenuItem>
              </Menu>
              <PageTitle
                title={pageStatics.data.titles.panel}
              />
              <Box mb={2}>
                <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                  {pageStatics.messages.info.general.first}
                </Typography>
              </Box>
              <AdvancedSearch
                advancedSearchFormElements={advancedSearchForm}
                loading={loading}
                changed={inputChangeHandler}
                onSearch={searchConnectionsHandler}
                onClearSearch={clearSearchConnectionsHandler}
                valid={advancedSearchFormValid}
                clearSearchEnabled={!!searchedConnections}
                tags={connectionTags && connectionTags.length > 0 ? connectionTags.map(tag => ({ ...tag, value: tag.id })) : []}
                disableActions={loading}
              />
              <ConnectionsGrid
                connections={connections.connections}
                onRemove={removeConnectionHandler}
                onOpenDetailsDialog={openConnectionNoteDialogHandler}
                onOpenEditDialog={openEditConnectionDialogHandler}
                onOpenAssignDialog={openAssignTagDialogHandler}
                onAddToContact={addToContact}
                searchedConnections={searchedConnections}
                searchingInProgress={searchingInProgress}
                disableActions={loading}
                tags={connectionTags && connectionTags.length > 0 ? connectionTags : null}
              />
              {
                // <Box className={classes.connectionsActionsContainer}>
                //   <CSVLink
                //     data={mapToArray(connections.connections, CONNECTIONS_CSV_HEADER) || []}
                //     filename={`${language.languageVars.files.myConnections}.csv`}
                //     className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                //     style={{
                //       backgroundColor: color.color.code,
                //       maxWidth: 220,
                //     }}
                //   >
                //     {pageStatics.buttons.downloadCSV}
                //   </CSVLink>
                //   <CSVLink
                //     data={mapToFacebookArray(connections.connections, CONNECTIONS_FACEBOOK_CSV_HEADER) || []}
                //     filename={`${language.languageVars.files.facebookCampaign}.csv`}
                //     className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                //     style={{
                //       backgroundColor: color.color.code,
                //       maxWidth: 220,
                //     }}
                //   >
                //     {pageStatics.buttons.downloadFacebookCSV}
                //   </CSVLink>
                //   <CSVLink
                //     data={mapToMailchimpArray(connections.connections, CONNECTIONS_MAILCHIMP_CSV_HEADER) || []}
                //     filename={`${language.languageVars.files.mailChimp}.csv`}
                //     className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                //     style={{
                //       backgroundColor: color.color.code,
                //       maxWidth: 220,
                //     }}
                //   >
                //     {pageStatics.buttons.downloadMailchimpCSV}
                //   </CSVLink>
                // </Box>
              }
            </Box>
          ) : (
            <>
              {connections.dataLoaded && (
                <Alert
                  title={pageStatics.messages.info.noConnections.title}
                  description={pageStatics.messages.info.noConnections.first}
                  type="info"
                />
              )}
            </>
          )}
          {auth.user && (
            <Box mb={1} mt={2} className={`${classes.addNewConnectionContainer} ${classes.editButtonContainer}`}>
              <Button
                color="secondary"
                onClick={() => openAddConnectionDialog()}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: color.color.code,
                  minWidth: '250px',
                  width: '100%',
                }}
                disabled={loading}
              >
                {pageStatics.buttons.addConnection}
              </Button>
            </Box>
          )}
        </Box>
        {connectionNoteDialogData && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 150 },
            ]}
            />
          )}
          >
            <ConnectionNoteDialog
              open={connectionNoteDialogOpen}
              onClose={closeConnectionNoteDialogHandler}
              connection={connectionNoteDialogData}
              color={color.color.code || fallBackColor}
              tags={connectionTags}
            />
          </Suspense>
        )}
        <Suspense fallback={(
          <SkeletonContainer list={[
            { variant: 'rect', fullWidth: true, height: 150 },
          ]}
          />
        )}
        >
          <AddConnectionDialog
            open={addConnectionDialogOpen}
            onClose={closeAddConnectionDialog}
            userId={activeProfileId || auth.user.uid}
            connectionSettings={connectionSettings}
            activeForm={activeForm}
            color={color.color.code || fallBackColor}
            connectionTags={connectionTags}
            defaultId={cardData.defaultId}
          />
        </Suspense>
        {editConnectionDialogData && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 150 },
            ]}
            />
          )}
          >
            <EditConnectionDialog
              open={editConnectionDialogOpen}
              onClose={closeEditConnectionDialogHandler}
              connection={editConnectionDialogData}
              color={color.color.code || fallBackColor}
              userId={cardData.userId}
            />
          </Suspense>
        )}
        <Suspense fallback={(
          <SkeletonContainer list={[
            { variant: 'rect', fullWidth: true, height: 150 },
          ]}
          />
        )}
        >
          <AssignTag
            open={assignTagDialogOpen}
            onClose={closeAssignTagDialogHandler}
            connection={editConnectionDialogData}
            tags={connectionTags && connectionTags.length > 0 ? connectionTags : null}
            userId={cardData.userId}
          />
        </Suspense>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  connections: state.connections,
  connectionTags: state.connections.connectionTags,
  connectionSettings: state.connections.connectionSettings,
  connectionForms: state.connections.connectionForms,
  activeProfileId: state.profiles.activeProfileId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onRemoveConnection: email => dispatch(actions.removeUserConnection(email)),
  onLoadConnections: userId => dispatch(actions.loadConnections(userId)),
  onLoadConnectionTags: userId => dispatch(actions.loadConnectionTags(userId)),
  onLoadForms: userId => dispatch(actions.loadConnectionForms(userId)),
  onLoadConnectionSettings: userId => dispatch(actions.loadConnectionSettings(userId)),
  onLoadConnectionData: (userId, masterId, loadConnections) => dispatch(actions.loadConnectionData(userId, masterId, loadConnections)),
})

Connections.defaultProps = {
  cardData: null,
  connections: null,
  connectionTags: null,
  connectionForms: null,
  connectionSettings: null,
  activeProfileId: null,
}

Connections.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onRemoveConnection: PropTypes.func.isRequired,
  connections: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  connectionTags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  connectionForms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  connectionSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onLoadConnectionData: PropTypes.func.isRequired,
  activeProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections)
