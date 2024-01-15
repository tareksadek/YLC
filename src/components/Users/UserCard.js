import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import InfoIcon from '@material-ui/icons/Info'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { QrIcon } from '../../layout/CustomIcons'

import { getFirebaseStorage } from '../../API/firebase'

import { cardStyles } from './styles'

const UserCard = ({
  userInfo,
  openQrdialog,
  openAccountInfo,
  openChangeEmailDialog,
  openChangePackageDialog,
  sendWelcomeEmail,
  deleteUser,
  changeActiveState,
}) => {
  const classes = cardStyles()
  const history = useHistory()
  const [profileUrl, setProfileUrl] = useState(null)
  const [loadedPic, setLoadedPic] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        if (userInfo.image) {
          const profileImage = await getFirebaseStorage().ref(`profile/${userInfo.image}`).getDownloadURL()
          setLoadedPic(profileImage)
        }
        const domainUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : 'https://yourlastcard.app/'
        setProfileUrl(`${domainUrl}profile/${userInfo.urlSuffix}`)
      })()
    }

    return () => { mounted = false }
  }, [userInfo])

  const handleClick = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = e => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const openAccountInfoHandler = () => {
    openAccountInfo(userInfo)
  }

  const openQrDialogHandler = () => {
    openQrdialog(userInfo.userName, profileUrl)
  }

  const openChangeEmailHandler = () => {
    openChangeEmailDialog(userInfo)
    setAnchorEl(null)
  }

  const openChangepackageHandler = () => {
    openChangePackageDialog(userInfo)
    setAnchorEl(null)
  }

  const deleteUserHandler = () => {
    deleteUser(userInfo.userId)
    setAnchorEl(null)
  }

  const changeActiveStateHandler = () => {
    changeActiveState(userInfo.userId, !userInfo.settings.active)
    setAnchorEl(null)
  }

  const openPublicProfileHandler = () => {
    history.push(`/profile/${userInfo.urlSuffix}`)
  }

  const editProfileInfoHandler = () => {
    history.push(`/edit/${userInfo.userId}/info`)
  }

  const editProfileContactHandler = () => {
    history.push(`/edit/${userInfo.userId}/contact`)
  }

  const editProfileLinksHandler = () => {
    history.push(`/edit/${userInfo.userId}/links`)
  }

  const editProfileVideoHandler = () => {
    history.push(`/edit/${userInfo.userId}/bio`)
  }

  const editProfilePictureHandler = () => {
    history.push(`/edit/${userInfo.userId}/picture`)
  }

  return (
    <Card
      classes={{
        root: classes.root,
      }}
      className={classes.root}
    >
      <CardContent className={classes.cardContent}>
        <Avatar alt={userInfo.userName} src={loadedPic} className={classes.userAvatar} />
        <Typography variant="body1" component="p" className={classes.userName}>
          {userInfo.userName}
        </Typography>
        <Typography variant="body1" component="p" className={classes.userEmail}>
          {userInfo.email}
        </Typography>
        <IconButton aria-label="settings" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <IconButton aria-label="edit" onClick={() => openAccountInfoHandler()}>
          <InfoIcon color="secondary" fontSize="small" />
        </IconButton>
        <IconButton aria-label="share" color="primary" onClick={() => openPublicProfileHandler()}>
          <AccountBoxIcon color="secondary" fontSize="small" />
        </IconButton>
        <IconButton color="secondary" aria-label="qrCode" onClick={() => openQrDialogHandler()}>
          <QrIcon color="secondary" fontSize="small" />
        </IconButton>
      </CardActions>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: classes.cardMenu }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={() => editProfileInfoHandler()} className={classes.cardMenuButton}>Edit profile info</MenuItem>
        <MenuItem onClick={() => editProfileContactHandler()} className={classes.cardMenuButton}>Edit profile contacts</MenuItem>
        <MenuItem onClick={() => editProfileLinksHandler()} className={classes.cardMenuButton}>Edit profile links</MenuItem>
        <MenuItem onClick={() => editProfileVideoHandler()} className={classes.cardMenuButton}>Edit profile video</MenuItem>
        <MenuItem onClick={() => editProfilePictureHandler()} className={classes.cardMenuButton}>Edit profile picture</MenuItem>
        <MenuItem onClick={() => openChangeEmailHandler()} className={classes.cardMenuButton}>Change email</MenuItem>
        <MenuItem onClick={() => openChangepackageHandler()} className={classes.cardMenuButton}>Change package</MenuItem>
        <MenuItem onClick={() => sendWelcomeEmail(userInfo.email, userInfo.userName, userInfo.userId)} className={classes.cardMenuButton}>Send welcome email</MenuItem>
        <MenuItem onClick={() => changeActiveStateHandler()} className={classes.cardMenuButton}>
          {userInfo.settings.active ? 'Disable user' : 'Activate user'}
        </MenuItem>
        <MenuItem onClick={() => deleteUserHandler()} className={classes.cardMenuButton}>Delete user</MenuItem>
      </Menu>
    </Card>
  );
}

UserCard.defaultProps = {
  userInfo: null,
}

UserCard.propTypes = {
  userInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  openQrdialog: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  changeActiveState: PropTypes.func.isRequired,
  openAccountInfo: PropTypes.func.isRequired,
  openChangeEmailDialog: PropTypes.func.isRequired,
  openChangePackageDialog: PropTypes.func.isRequired,
  sendWelcomeEmail: PropTypes.func.isRequired,
}

export default UserCard
