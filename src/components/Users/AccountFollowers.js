import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog'

import CloseIcon from '@material-ui/icons/Close'

import Followers from '../../containers/Followers/Followers'

import { accountInfo } from './styles'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const AccountFollowers = ({
  closeDialog, dialogOpen, userInfo,
}) => {
  const classes = accountInfo()

  return (
    <Dialog
      fullScreen
      open={dialogOpen}
      onClose={closeDialog}
      TransitionComponent={Transition}
      classes={{
        paperFullScreen: classes.paperFullScreen,
      }}
    >
      <AppBar className={classes.dialogHeader}>
        <Toolbar>
          <IconButton className={`${classes.dialogClose}`} edge="start" color="inherit" onClick={closeDialog} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography
            className={`${classes.dialogTitle}`}
            align="center"
            variant="h4"
          >
            {userInfo && (
              userInfo.userName
            )}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.dialogContent}>
        <Followers switchTheme={() => true} adminConnectionsRequestId={userInfo ? userInfo.userId : null} />
      </Box>
    </Dialog>
  )
}

AccountFollowers.defaultProps = {
  dialogOpen: false,
  userInfo: null,
}

AccountFollowers.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default AccountFollowers
