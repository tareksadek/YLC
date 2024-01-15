import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useTheme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcCallIcon from '@material-ui/icons/AddIcCall'

import AddConnectionDialog from '../../Connections/AddConnectionDialog'

import { useLanguage } from '../../../hooks/useLang'

import { buttonStyles } from '../../../theme/buttons'
import { actionButtonsStyles } from '../styles'

const ActionButtons = ({
  colorCode, cardClickedHandler, profileType, userId, defaultId, connectDialogOpen, openConnectDialog, closeConnectDialog, userName, canFollow,
  isFollowed, userType, activeForm, connectionSettings, isEmbedForm, connectionTags,
}) => {
  const defaultTheme = useTheme()
  const classes = actionButtonsStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  let followConnect

  if (canFollow && isFollowed) {
    // followConnect = language.languageVars.pages.viewProfile.buttons.unfollow
    followConnect = connectionSettings && connectionSettings.buttonTitle ? connectionSettings.buttonTitle : pageStatics.data.titles.defaultButtonTitle
  } else if (canFollow) {
    // followConnect = language.languageVars.pages.viewProfile.buttons.follow
    followConnect = connectionSettings && connectionSettings.buttonTitle ? connectionSettings.buttonTitle : pageStatics.data.titles.defaultButtonTitle
  } else {
    followConnect = connectionSettings && connectionSettings.buttonTitle ? connectionSettings.buttonTitle : pageStatics.data.titles.defaultButtonTitle
  }

  let buttonRadius
  let buttonClass
  let buttonContainerClass

  if (profileType === 'social') {
    buttonRadius = 30
    buttonClass = classes.socialActionButton
    buttonContainerClass = classes.socialActionButtonContainer
  } else if (profileType === 'basic') {
    buttonRadius = 16
    buttonContainerClass = classes.basicActionButtonContainer
  } else if (profileType === 'square') {
    buttonRadius = 16
    buttonClass = classes.squareActionButton
    buttonContainerClass = classes.squareActionButtonContainer
  } else {
    buttonRadius = 8
  }

  return (
    <>
      <Box className={`${classes.viewCardActionsContainer} ${profileType === 'square' ? classes.viewCardSquareActionsContainer : ''}`}>
        <Box className={`${classes.actionButtonContainer} ${buttonContainerClass}`}>
          <Button
            className={`${buttonClasses.defaultButton} ${classes.viewActionButton} ${profileType === 'square' ? classes.squareViewActionButton : ''} ${buttonClass}`}
            style={{
              backgroundColor: colorCode,
              borderRadius: buttonRadius,
            }}
            onClick={() => openConnectDialog(true)}
          >
            {followConnect}
            {!activeForm && <CircularProgress color="secondary" size={20} />}
          </Button>
          {
            // authUser && isTheLoggedinUser && profileType !== 'basic' && (
            // <Typography component="p" variant="body1" align="center" className={`${classes.contactAddedMessage} ${profileType === 'basic' ? classes.basicContactAddedMessage : ''}`}>
            //   {`${connectionsCount || 0} connections`}
            // </Typography>
            // )
          }
        </Box>
        <Box className={`${classes.actionButtonContainer} ${buttonContainerClass}`}>
          <Button
            className={`${buttonClasses.outlineButton} ${classes.viewActionButtonIcon} ${profileType === 'square' ? classes.squareViewActionButtonIcon : ''} ${buttonClass}`}
            style={{
              color: colorCode,
              borderColor: colorCode,
              borderRadius: buttonRadius,
              paddingTop: 10,
              paddingBottom: 10,
              borderWidth: profileType === 'social' && defaultTheme.name === 'light' ? 0 : 2,
            }}
            onClick={() => cardClickedHandler()}
            disabled={false}
          >
            {profileType === 'social' ? pageStatics.data.titles.saveContactsButton : <AddIcCallIcon />}
          </Button>
          {
            // authUser && isTheLoggedinUser && profileType !== 'basic' && (
            // <Typography component="p" variant="body1" align="center" className={`${classes.contactAddedMessage} ${profileType === 'basic' ? classes.basicContactAddedMessage : ''}`}>
            //   {`Added ${clickedNo || 0} times`}
            // </Typography>
            // )
          }
        </Box>
      </Box>
      {/* {activeForm && ( */}
      <AddConnectionDialog
        open={connectDialogOpen}
        onClose={closeConnectDialog}
        userId={userId}
        userName={userName}
        color={colorCode}
        userType={userType}
        activeForm={activeForm}
        connectionSettings={connectionSettings}
        isEmbedForm={isEmbedForm}
        connectionTags={connectionTags}
        defaultId={defaultId}
      />
      {/* )} */}
    </>
  )
}

const mapStateToProps = state => ({
  userId: state.cards.userId,
  defaultId: state.cards.defaultId,
})

ActionButtons.defaultProps = {
  colorCode: null,
  profileType: null,
  userName: null,
  connectDialogOpen: false,
  canFollow: false,
  isFollowed: false,
  // followingInProgress: false,
  userId: null,
  defaultId: null,
  userType: null,
  activeForm: null,
  connectionSettings: null,
  isEmbedForm: false,
  connectionTags: null,
}

ActionButtons.propTypes = {
  colorCode: PropTypes.string,
  cardClickedHandler: PropTypes.func.isRequired,
  profileType: PropTypes.string,
  connectDialogOpen: PropTypes.bool,
  openConnectDialog: PropTypes.func.isRequired,
  closeConnectDialog: PropTypes.func.isRequired,
  userName: PropTypes.string,
  canFollow: PropTypes.bool,
  isFollowed: PropTypes.bool,
  // followingInProgress: PropTypes.bool,
  userId: PropTypes.string,
  defaultId: PropTypes.string,
  userType: PropTypes.string,
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
  isEmbedForm: PropTypes.bool,
  connectionTags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default connect(mapStateToProps, null)(ActionButtons)
