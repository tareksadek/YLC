import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import { cardStyles } from './styles'

const PatchCard = ({
  patchInfo,
  openChangeStatusDialog,
  deletePatch,
}) => {
  const classes = cardStyles()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = e => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  const openChangeStatusHandler = () => {
    openChangeStatusDialog(patchInfo)
    setAnchorEl(null)
  }

  const showInvitationsHandler = patchId => {
    history.push(`/invitationsAdmin?patchId=${patchId}`)
  }

  const showPatchStatus = status => {
    let patchStatus = 'Ready'
    if (status === 'china') {
      patchStatus = 'Sent to factory'
    } else if (status === 'usa') {
      patchStatus = 'Sent to sales point'
    }
    return patchStatus
  }

  const deletePatchHandler = () => {
    deletePatch(patchInfo.patchId)
    setAnchorEl(null)
  }

  return (
    <Card
      classes={{
        root: classes.root,
      }}
      className={classes.root}
    >
      <CardContent className={classes.cardContent}>
        <Typography variant="body1" component="p" className={classes.userName}>
          {`${patchInfo.package}: ${patchInfo.patchTitle || 'No title'}`}
        </Typography>
        <Typography variant="body1" component="p" className={classes.userEmail}>
          {`${format(new Date(patchInfo.createdOn.toDate()), 'dd - MM - yyyy')}`}
        </Typography>
        <Typography variant="body1" component="p" className={classes.userName}>
          {patchInfo.patchId}
        </Typography>
        <Typography variant="body1" component="p" className={classes.userEmail}>
          {`${patchInfo.contains} Invitations`}
        </Typography>
        <span className={`${classes.patchStatus} ${patchInfo.status === 'china' ? classes.patchStatusChina : ''} ${patchInfo.status === 'usa' ? classes.patchStatusUsa : ''}`}>
          {showPatchStatus(patchInfo.status)}
        </span>
        <IconButton aria-label="settings" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button color="secondary" aria-label="edit" onClick={() => showInvitationsHandler(patchInfo.patchId)}>
          View invitations
        </Button>
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
        <MenuItem onClick={() => openChangeStatusHandler()} className={classes.cardMenuButton}>Change status</MenuItem>
        <MenuItem onClick={() => deletePatchHandler()} className={classes.cardMenuButton}>Delete patch</MenuItem>
      </Menu>
    </Card>
  );
}

PatchCard.defaultProps = {
  patchInfo: null,
}

PatchCard.propTypes = {
  patchInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  openChangeStatusDialog: PropTypes.func.isRequired,
  deletePatch: PropTypes.func.isRequired,
}

export default PatchCard
