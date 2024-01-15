import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import GoogleMapReact from 'google-map-react'
import ReactPlayer from 'react-player'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import EditIcon from '@material-ui/icons/Edit'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone'
import PrintIcon from '@material-ui/icons/Print'
import RoomIcon from '@material-ui/icons/Room'

import ActionButtons from './ActionButtons'
import SocialLinks from './SocialLinks'
import CustomLinks from './CustomLinks'
import InfoButton from './InfoButton'
import InfoDrawer from './InfoDrawer'
import ProfilePlaceholder from '../../Ui/ProfilePlaceholder'
import Alert from '../../../layout/Alert'

import { useLanguage } from '../../../hooks/useLang'
import { useDisplayMode } from '../../../hooks/useDisplayMode'

import { GOOGLE_MAPS_KEY } from '../../../utilities/appVars'

import { businessViewStyles } from '../styles'
import { buttonStyles } from '../../../theme/buttons'

const BusinessView = ({
  colorCode, userName, authUser, vCardFile, cardClickedHandler, clickedNo, email, links, socialLinksOrder,
  lastName, organization, title, workPhone, workFax, homePhone, homeFax, note,
  connectDialogOpen, openConnectDialog, closeConnectDialog, connectionsCount, countClicks, bioVideo, closeInfoDialog,
  infoDialogOpen, openInfoDialog, passwordProtected, isTheLoggedinUser, canFollow, isFollowed, followingInProgress, logo,
  activeForm, connectionSettings, redirect, isEmbedForm, defaultLinksToTheme, address, marker, connectionTags, isMaster, settings,
}) => {
  const classes = businessViewStyles()
  const buttonClasses = buttonStyles()
  const history = useHistory()
  const mode = useDisplayMode()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.viewProfile
  const showDrawer = (authUser && settings.drawerEnabeled)
  || (!authUser && settings.drawerEnabeled && note)
  || (!authUser && settings.drawerEnabeled && bioVideo)
  || (!authUser && settings.drawerEnabeled && workPhone)
  || (!authUser && settings.drawerEnabeled && workFax)
  || (!authUser && settings.drawerEnabeled && homeFax)
  || (!authUser && settings.drawerEnabeled && homePhone)
  || (!authUser && settings.drawerEnabeled && address)

  const goToInfo = () => {
    history.push('/info')
  }

  const goToContacts = () => {
    history.push('/contact')
  }

  const goToVideo = () => {
    history.push('/bio')
  }

  const goToLinks = () => {
    history.push('/links')
  }

  return (
    <Box>
      {redirect && isTheLoggedinUser && (
        <Box mt={2} style={{ maxWidth: 550, margin: '16px auto 0 auto' }}>
          <Alert
            title={pageStatics.data.titles.redirected}
            description={redirect}
            type="warning"
          />
        </Box>
      )}
      <Box className={classes.businessViewInfoContainer}>
        <Typography component="p" variant="body1" className={classes.viewCardName}>
          {/* {firstName || lastName ? userName : ''} */}
          {isMaster ? lastName || '' : userName || ''}
          {mode.mode === 'edit' && (
            <span className={classes.placeholderButtonContainer}>
              <Button
                color="secondary"
                onClick={() => goToInfo()}
                className={buttonClasses.editModeButtonCircle}
              >
                <EditIcon style={{ fontSize: '0.9rem' }} />
              </Button>
            </span>
          )}
        </Typography>
        {(title || organization) && (
          <Typography component="p" variant="body1" className={classes.viewCardAbout}>
            {title || ''}
            {title ? ` - ${organization}` : (organization || '')}
          </Typography>
        )}
      </Box>
      {/* <Box className={classes.businessViewInfoContainer}>
        {(!passwordProtected || isTheLoggedinUser) && email && (
          <Box className={classes.emailContainer}>
            <a href={`mailto:${email}`} style={{ color: colorCode }}>
              {email}
              {mode.mode === 'edit' && (
                <span className={classes.placeholderButtonContainer} style={{ top: 0 }}>
                  <Button
                    color="secondary"
                    onClick={() => goToContact()}
                    className={buttonClasses.editModeButtonCircle}
                  >
                    <EditIcon style={{ fontSize: '0.9rem' }} />
                  </Button>
                </span>
              )}
            </a>
          </Box>
        )}
        {(!passwordProtected || isTheLoggedinUser) && homePhone && (
          <Typography component="p" variant="body1" className={classes.viewCardPhone}>
            {homePhone}
          </Typography>
        )}
      </Box> */}
      {(!passwordProtected || isTheLoggedinUser) && (
        <>
          <Box mt={2}>
            <ActionButtons
              authUser={authUser}
              vCardFile={vCardFile}
              colorCode={colorCode}
              cardClickedHandler={cardClickedHandler}
              clickedNo={clickedNo}
              connectDialogOpen={connectDialogOpen}
              openConnectDialog={openConnectDialog}
              closeConnectDialog={closeConnectDialog}
              userName={userName}
              connectionsCount={connectionsCount}
              isTheLoggedinUser={isTheLoggedinUser}
              canFollow={canFollow}
              isFollowed={isFollowed}
              followingInProgress={followingInProgress}
              isEmbedForm={isEmbedForm}
              connectionSettings={connectionSettings}
              activeForm={activeForm}
              connectionTags={connectionTags}
            />
          </Box>

          {!showDrawer && note && (
            <Box className={classes.bioContainer}>
              <Typography component="p" variant="body1">
                {note}
              </Typography>
              {mode.mode === 'edit' && authUser && isTheLoggedinUser && (
                <Box mt={2} mb={2}>
                  <Button
                    color="secondary"
                    onClick={() => goToInfo()}
                    className={buttonClasses.editModeButton}
                  >
                    Edit bio
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {links && <CustomLinks links={links} colorCode={colorCode} countClicks={countClicks} profileType="business" />}

          {((!links || links.filter(link => link.platform === 'custom').length === 0) && authUser && isTheLoggedinUser && mode.mode === 'edit') && (
            <Box className={classes.placeholderContainer} mt={3}>
              <ProfilePlaceholder
                title={pageStatics.data.placeholder.customLinks.title}
                description={pageStatics.data.placeholder.customLinks.description}
                buttonText={pageStatics.data.placeholder.customLinks.button}
                isClickable
                isLarge
                link="/links"
              />
            </Box>
          )}

          {links && <SocialLinks defaultLinksToTheme={defaultLinksToTheme} socialLinksOrder={socialLinksOrder} links={links} countClicks={countClicks} colorCode={colorCode} profileType="business" />}

          {((!links || links.filter(link => link.platform !== 'custom').length === 0) && authUser && isTheLoggedinUser && mode.mode === 'edit') && (
            <Box className={classes.placeholderContainer} mt={3}>
              <ProfilePlaceholder
                title={pageStatics.data.placeholder.socialLinks.title}
                description={pageStatics.data.placeholder.socialLinks.description}
                buttonText={pageStatics.data.placeholder.socialLinks.button}
                isClickable
                isLarge
                link="/links"
              />
            </Box>
          )}

          {mode.mode === 'edit' && authUser && isTheLoggedinUser && (links && links.length > 0) && (
            <Box mt={5} mb={2}>
              <Button
                color="secondary"
                onClick={() => goToLinks()}
                className={buttonClasses.editModeButton}
              >
                Add / Edit links
              </Button>
            </Box>
          )}

          {!showDrawer && bioVideo && (
            <Box className={classes.bioVideoContainer}>
              <Box className={classes.videoContainer}>
                <ReactPlayer controls url={bioVideo} width="100%" height="100%" />
              </Box>
              {mode.mode === 'edit' && authUser && isTheLoggedinUser && (
                <Box mt={2} mb={2}>
                  <Button
                    color="secondary"
                    onClick={() => goToVideo()}
                    className={buttonClasses.editModeButton}
                  >
                    Edit video
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {!showDrawer && (email || homePhone || workPhone || workFax || address) && (
            <Box className={classes.contactsContainer}>
              <List aria-label="main mailbox folders">
                {email && (
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={(
                        <a href={`mailto:${email}`}>{email}</a>
                      )}
                    />
                  </ListItem>
                )}
                {homePhone && (
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIphoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={(
                        <a href={`tel:${homePhone}`}>{homePhone}</a>
                      )}
                    />
                  </ListItem>
                )}
                {workPhone && (
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={(
                        <a href={`tel:${workPhone}`}>{workPhone}</a>
                      )}
                    />
                  </ListItem>
                )}
                {workFax && (
                  <ListItem>
                    <ListItemIcon>
                      <PrintIcon />
                    </ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={(
                        <p>{workFax}</p>
                      )}
                    />
                  </ListItem>
                )}
                {address && (
                  <>
                    <ListItem>
                      <ListItemIcon>
                        <RoomIcon />
                      </ListItemIcon>
                      <ListItemText
                        disableTypography
                        primary={(
                          <a href={`geo:${marker && marker.lat ? marker.lat : 0},${marker && marker.lng ? marker.lng : 0}?q=${address}`}>{address}</a>
                        )}
                      />
                    </ListItem>
                    {marker && marker.lat && marker.lng && (
                      <ListItem>
                        <Box className={classes.mapContainer}>
                          <GoogleMapReact
                            bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
                            yesIWantToUseGoogleMapApiInternals
                            defaultCenter={marker}
                            defaultZoom={15}
                          >
                            <RoomIcon
                              style={{ color: '#272727', fontSize: 36 }}
                              className={classes.mapMarker}
                              lat={marker.lat}
                              lng={marker.lng}
                            />
                          </GoogleMapReact>
                        </Box>
                      </ListItem>
                    )}
                  </>
                )}
              </List>
              {mode.mode === 'edit' && authUser && isTheLoggedinUser && (
                <Box mt={2} mb={2}>
                  <Button
                    color="secondary"
                    onClick={() => goToContacts()}
                    className={buttonClasses.editModeButton}
                  >
                    Edit contacts
                  </Button>
                </Box>
              )}
            </Box>
          )}

          {showDrawer && (
            <Box className={`${classes.infoButtonContainer} ${classes.businessInfoButtonContainer}`} style={{ backgroundColor: colorCode }}>
              <InfoButton colorCode={colorCode} bioVideo={bioVideo} showInfoDialogHandler={openInfoDialog} logo={logo} organization={organization} />
            </Box>
          )}

          {/* <Box className={`${classes.infoButtonContainer} ${classes.businessInfoButtonContainer}`} style={{ backgroundColor: colorCode }}>
            {showDrawer && (
              <InfoButton colorCode={colorCode} bioVideo={bioVideo} showInfoDialogHandler={openInfoDialog} logo={logo} />
            )}
          </Box> */}

          {showDrawer && (
            <InfoDrawer
              userName={userName}
              note={note}
              closeDialog={closeInfoDialog}
              dialogOpen={infoDialogOpen}
              openDialog={openInfoDialog}
              bioVideo={bioVideo}
              authUser={authUser}
              showHelperButtons={isTheLoggedinUser}
              colorCode={colorCode}
              defaultLinksToTheme={defaultLinksToTheme}
              workPhone={workPhone}
              workFax={workFax}
              homeFax={homeFax}
              address={address}
              marker={marker}
            />
          )}
        </>
      )}
    </Box>
  )
}

BusinessView.defaultProps = {
  colorCode: null,
  // firstName: null,
  lastName: null,
  userName: null,
  authUser: null,
  vCardFile: null,
  clickedNo: 0,
  email: null,
  links: null,
  socialLinksOrder: null,
  organization: null,
  title: null,
  workPhone: null,
  homePhone: null,
  workFax: null,
  homeFax: null,
  note: null,
  connectDialogOpen: false,
  connectionsCount: 0,
  infoDialogOpen: false,
  bioVideo: null,
  passwordProtected: false,
  isTheLoggedinUser: false,
  canFollow: false,
  isFollowed: false,
  followingInProgress: false,
  logo: null,
  activeForm: null,
  connectionSettings: null,
  redirect: null,
  isEmbedForm: false,
  defaultLinksToTheme: false,
  address: null,
  marker: null,
  connectionTags: null,
  isMaster: false,
  settings: null,
}

BusinessView.propTypes = {
  colorCode: PropTypes.string,
  // firstName: PropTypes.string,
  lastName: PropTypes.string,
  userName: PropTypes.string,
  authUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  vCardFile: PropTypes.string,
  cardClickedHandler: PropTypes.func.isRequired,
  clickedNo: PropTypes.number,
  email: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  socialLinksOrder: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  organization: PropTypes.string,
  title: PropTypes.string,
  workPhone: PropTypes.string,
  homePhone: PropTypes.string,
  workFax: PropTypes.string,
  homeFax: PropTypes.string,
  note: PropTypes.string,
  connectDialogOpen: PropTypes.bool,
  openConnectDialog: PropTypes.func.isRequired,
  closeConnectDialog: PropTypes.func.isRequired,
  connectionsCount: PropTypes.number,
  countClicks: PropTypes.func.isRequired,
  infoDialogOpen: PropTypes.bool,
  closeInfoDialog: PropTypes.func.isRequired,
  openInfoDialog: PropTypes.func.isRequired,
  bioVideo: PropTypes.string,
  passwordProtected: PropTypes.bool,
  isTheLoggedinUser: PropTypes.bool,
  canFollow: PropTypes.bool,
  isFollowed: PropTypes.bool,
  followingInProgress: PropTypes.bool,
  logo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  activeForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  connectionSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  redirect: PropTypes.string,
  isEmbedForm: PropTypes.bool,
  defaultLinksToTheme: PropTypes.bool,
  address: PropTypes.string,
  marker: PropTypes.objectOf(PropTypes.oneOfType([
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
  isMaster: PropTypes.bool,
  settings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
}

export default BusinessView
