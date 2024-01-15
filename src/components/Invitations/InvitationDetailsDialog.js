import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { format } from 'date-fns'

import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { getUserById } from '../../API/users'
import { getCardById } from '../../API/cards'
import { getCounterById } from '../../API/counter'

import { useLanguage } from '../../hooks/useLang'

import { buttonStyles } from '../../theme/buttons'
import { invitationDetailsDialogStyles } from './styles'

import * as actions from '../../store/actions'

const InvitationDetailsDialog = ({
  open, onClose, invitation, onSetNotification,
}) => {
  const classes = invitationDetailsDialogStyles()
  const buttonClasses = buttonStyles()

  const language = useLanguage()
  const pageStatics = language.languageVars.pages.userInvitations

  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState(null)
  const [cardData, setCardData] = useState(null)
  const [addedToContacts, setAddedToContacts] = useState(null)

  useEffect(() => {
    let mounted = true

    if (mounted && invitation) {
      (async () => {
        setLoading(true)
        try {
          const userDataObj = await getUserById(invitation.usedBy)
          const cardDataObj = await getCardById(invitation.usedBy)
          const addedCount = await getCounterById(invitation.usedBy)
          setUserData(userDataObj)
          setCardData(cardDataObj)
          setAddedToContacts(addedCount)
          setLoading(false)
        } catch (err) {
          onSetNotification({
            message: pageStatics.messages.notifications.loadUserDataError,
            type: 'error',
          })
          setLoading(false)
        }
      })()
    }

    return () => { mounted = false }
  }, [invitation, onSetNotification, pageStatics.messages.notifications.loadUserDataError])

  return (
    <Dialog aria-labelledby="share-dialog-title" open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {loading && <LoadingBackdrop placement="inset" loadingText={pageStatics.messages.loading.loadingUserData} />}
      <DialogTitle id="share-dialog-title" className={classes.titleContainer}>
        {`${pageStatics.data.titles.invitationDetailsDialog} ${(userData && userData.userName) ? userData.userName : ''}`}
        <IconButton className={`${classes.dialogClose}`} edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.dialogContent}>
          <Box mb={2}>
            <Box className={classes.viewUserData}>
              {userData && userData.email && (
                <Typography component="p" variant="body1">
                  {`${pageStatics.data.userInfo.email}:`}
                  <span>{userData.email}</span>
                </Typography>
              )}

              {userData && userData.created && (
                <Typography component="p" variant="body1">
                  {`${pageStatics.data.userInfo.created}:`}
                  <span>{format(new Date(userData.created.toDate()), 'dd-MM-yyyy h:mm a')}</span>
                </Typography>
              )}

              {userData && userData.lastLogin && (
                <Typography component="p" variant="body1">
                  {`${pageStatics.data.userInfo.lastLogin}:`}
                  <span>{format(new Date(userData.lastLogin.toDate()), 'dd-MM-yyyy h:mm a')}</span>
                </Typography>
              )}

              {addedToContacts && (
                <Typography component="p" variant="body1">
                  {`${pageStatics.data.userInfo.addedToContacts}:`}
                  <span>{`${addedToContacts.clickedNo} times`}</span>
                </Typography>
              )}

              {cardData && (
                <Typography component="p" variant="body1">
                  {`${pageStatics.data.userInfo.connections}:`}
                  <span>{`${(cardData.connections && cardData.connections.length > 0) ? cardData.connections.length : 0}`}</span>
                </Typography>
              )}
            </Box>
            <Box className={classes.visitButtonContainer} mt={4} mb={2}>
              <a
                color="secondary"
                href={`${language.languageVars.appProfileURL}${userData && userData.urlSuffix}`}
                className={buttonClasses.defaultButton}
                target="_blank"
                style={{
                  backgroundColor: cardData && cardData.settings.selectedColor.code,
                  minWidth: '250px',
                }}
                rel="noreferrer"
              >
                {pageStatics.buttons.visitProfile}
              </a>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

InvitationDetailsDialog.defaultProps = {
  open: false,
  invitation: null,
}

InvitationDetailsDialog.propTypes = {
  open: PropTypes.bool,
  invitation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onClose: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(null, mapDispatchToProps)(InvitationDetailsDialog)
