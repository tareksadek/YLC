import React, {
  useState, lazy, Suspense, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  sub, isEqual, isAfter, isBefore,
} from 'date-fns'

import { CSVLink } from 'react-csv'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import GetAppIcon from '@material-ui/icons/GetApp'

import SkeletonContainer from '../../layout/SkeletonContainer'
import FullScreenDialog from '../../layout/FullScreenDialog'
import Alert from '../../layout/Alert'
import PageTitle from '../../layout/PageTitle'
import LoadingPlaceholder from '../../layout/LoadingPlaceholder'
import ConnectionsGrid from '../Connections/ConnectionsGrid'
import AdvancedSearch from '../Connections/AdvancedSearch'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import {
  mapToArray, mapToFacebookArray, mapToMailchimpArray, mapToSalesForceArray, mapToHubspotArray, generateVcard,
} from '../../utilities/utils'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
import { connectionNoteDialogStyles } from './styles'

import {
  CONNECTIONS_CSV_HEADER,
  CONNECTIONS_FACEBOOK_CSV_HEADER,
  CONNECTIONS_MAILCHIMP_CSV_HEADER,
  CONNECTIONS_SALESFORCE_CSV_HEADER,
  CONNECTIONS_HUBSPOT_CSV_HEADER,
} from '../../utilities/appVars'

import * as actions from '../../store/actions'

const ConnectionNoteDialog = lazy(() => import('../Connections/ConnectionNoteDialog'))

const TeamMemberConnections = ({
  connections, onSetNotification, open, onClose, memberName, memberConnectionsLoading, auth, cardData,
  connectionTags,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = connectionNoteDialogStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections
  const teamStatics = language.languageVars.pages.connections
  const fallBackColor = cardData && cardData.settings && cardData.settings.theme === 'light' ? '#272727' : '#ffffff'

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

  const [searchedConnections, setSearchedConnections] = useState(null)
  const [connectionNoteDialogOpen, setConnectionNoteDialogOpen] = useState(window.location.hash === '#details')
  const [connectionNoteDialogData, setConnectionNoteDialogData] = useState(null)
  const [advancedSearchForm, setAdvancedSearchForm] = useState({ ...initialAdvancedSearchFormState })
  const [advancedSearchFormValid, setAdvancedSearchFormValid] = useState(false)
  const [searchingInProgress, setSearchingInProgress] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const onHashChange = () => {
      setConnectionNoteDialogOpen(window.location.hash === '#details')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const data = {
      startDate: sub(new Date(auth.createdOn.toDate()), { days: 0 }),
      endDate: new Date(),
    }
    const adjustedAdvancedSearchForm = adjustFormValues(advancedSearchForm, data, null)
    setAdvancedSearchForm(prevForm => ({ ...prevForm, ...adjustedAdvancedSearchForm.adjustedForm }))
    setAdvancedSearchFormValid(adjustedAdvancedSearchForm.formValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.createdOn])

  const openMenu = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const closeViewMenu = e => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const openConnectionNoteDialogHandler = connection => {
    setConnectionNoteDialogOpen(true)
    setConnectionNoteDialogData(connection)
  }

  const closeConnectionNoteDialogHandler = () => {
    setConnectionNoteDialogOpen(false)
    setConnectionNoteDialogData(null)
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

    const filteredConnections = connections.filter(connection => {
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

  return (
    <FullScreenDialog
      open={open}
      onClose={onClose}
      title={`${memberName} ${pageStatics.data.titles.memberConnectionsDialog}`}
      loading={false}
    >
      {memberConnectionsLoading ? (
        <LoadingPlaceholder />
      ) : (
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            {(connections && connections.length > 0) ? (
              <Box className={`${layoutClasses.panel}`}>
                <Button
                  color="secondary"
                  onClick={e => openMenu(e)}
                  className={`${buttonClasses.textButton} ${classes.downloadCSV}`}
                  style={{
                    color: color.color.code,
                  }}
                  disabled={memberConnectionsLoading}
                >
                  <GetAppIcon style={{ color: color.color.code }} />
                  {pageStatics.buttons.download}
                </Button>
                <Menu
                  id="download-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={closeViewMenu}
                  classes={{ paper: classes.downloadMenu }}
                  PopoverClasses={{ root: classes.downloadMenuPopover }}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                  <MenuItem className={classes.cardMenuButton}>
                    <CSVLink
                      data={mapToArray(connections, CONNECTIONS_CSV_HEADER) || []}
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
                      data={mapToFacebookArray(connections, CONNECTIONS_FACEBOOK_CSV_HEADER) || []}
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
                      data={mapToMailchimpArray(connections, CONNECTIONS_MAILCHIMP_CSV_HEADER) || []}
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
                      data={mapToSalesForceArray(connections, CONNECTIONS_SALESFORCE_CSV_HEADER) || []}
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
                      data={mapToHubspotArray(connections, CONNECTIONS_HUBSPOT_CSV_HEADER) || []}
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
                    {teamStatics.messages.info.general.first}
                  </Typography>
                </Box>
                <AdvancedSearch
                  advancedSearchFormElements={advancedSearchForm}
                  loading={memberConnectionsLoading}
                  changed={inputChangeHandler}
                  onSearch={searchConnectionsHandler}
                  onClearSearch={clearSearchConnectionsHandler}
                  valid={advancedSearchFormValid}
                  clearSearchEnabled={!!searchedConnections}
                  tags={connectionTags && connectionTags.length > 0 ? connectionTags.map(tag => ({ ...tag, value: tag.id })) : []}
                  disableActions={memberConnectionsLoading}
                />
                <ConnectionsGrid
                  connections={connections}
                  onOpenDetailsDialog={openConnectionNoteDialogHandler}
                  onAddToContact={addToContact}
                  searchedConnections={searchedConnections}
                  searchingInProgress={searchingInProgress}
                  disableActions={memberConnectionsLoading}
                  tags={connectionTags && connectionTags.length > 0 ? connectionTags : null}
                  onRemove={() => true}
                  onOpenEditDialog={() => true}
                  onOpenAssignDialog={() => true}
                  disableEdit
                  disableAssign
                  disableRemove
                />
              </Box>
            ) : (
              <>
                {!memberConnectionsLoading && (
                  <Alert
                    title={`${pageStatics.messages.info.noMemberConnections.title}`}
                    description={pageStatics.messages.info.noMemberConnections.first}
                    type="info"
                  />
                )}
              </>
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
        </Box>
      )}
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

TeamMemberConnections.defaultProps = {
  connections: null,
  open: false,
  memberName: null,
  memberConnectionsLoading: false,
  auth: null,
  connectionTags: null,
  cardData: null,
}

TeamMemberConnections.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  connections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  memberName: PropTypes.string,
  memberConnectionsLoading: PropTypes.bool,
  auth: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  connectionTags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default connect(null, mapDispatchToProps)(TeamMemberConnections)
