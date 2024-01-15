import React, {
  useState, lazy, Suspense, useEffect,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
import ConnectionsGrid from '../Connections/ConnectionsGrid'
import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import {
  mapToArray, mapToFacebookArray, mapToMailchimpArray, mapToSalesForceArray, mapToHubspotArray,
} from '../../utilities/utils'

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

const AccountConnections = ({
  connections, open, onClose, memberName, memberConnectionsLoading,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = connectionNoteDialogStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections
  const teamStatics = language.languageVars.pages.connections

  const [connectionNoteDialogOpen, setConnectionNoteDialogOpen] = useState(window.location.hash === '#details')
  const [connectionNoteDialogData, setConnectionNoteDialogData] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    const onHashChange = () => {
      setConnectionNoteDialogOpen(window.location.hash === '#details')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

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

  return (
    <FullScreenDialog
      open={open}
      onClose={onClose}
      title={`${memberName} ${pageStatics.data.titles.userConnectionsDialog}`}
      loading={false}
    >
      {memberConnectionsLoading ? (
        <LoadingBackdrop loadingText="Loading connections..." boxed />
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
                <ConnectionsGrid
                  connections={connections}
                  onOpenDetailsDialog={openConnectionNoteDialogHandler}
                  onAddToContact={() => true}
                  searchedConnections={null}
                  searchingInProgress={false}
                  disableActions={memberConnectionsLoading}
                  tags={null}
                  onRemove={() => true}
                  onOpenEditDialog={() => true}
                  onOpenAssignDialog={() => true}
                  onOpenProDialog={() => true}
                  disableEdit
                  disableAssign
                  disableRemove
                />
              </Box>
            ) : (
              <>
                {!memberConnectionsLoading && (
                  <Alert
                    title={`${pageStatics.messages.notifications.noMemberConnections.title}`}
                    description={pageStatics.messages.notifications.noMemberConnections.first}
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
                color={color.color.code}
                tags={null}
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

AccountConnections.defaultProps = {
  connections: null,
  open: false,
  memberName: null,
  memberConnectionsLoading: false,
}

AccountConnections.propTypes = {
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
}

export default connect(null, mapDispatchToProps)(AccountConnections)
