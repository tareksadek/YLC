import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import PersonIcon from '@material-ui/icons/Person'

import NotificationDialog from '../../layout/NotificationDialog'

import { useLanguage } from '../../hooks/useLang'

import { connectionNoteDialogStyles } from './styles'

const ConnectionNoteDialog = ({
  open, onClose, connection,
}) => {
  const classes = connectionNoteDialogStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  return (
    <NotificationDialog
      type="custom"
      background="#fff"
      title={`${connection && connection.firstName} ${(connection && connection.lastName) && connection.lastName}`}
      icon={<PersonIcon style={{ color: '#272727' }} />}
      open={open}
      onClose={() => onClose()}
    >
      <Box className={classes.viewCardData}>
        {connection && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.addedOn}:`}
            <span>{`${connection && format(new Date(connection.addedOn.toDate()), 'dd-MM-yyyy h:mm a')}`}</span>
          </Typography>
        )}
        {connection && connection.firstName && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.firstName}:`}
            <span>{connection.firstName}</span>
          </Typography>
        )}

        {connection && connection.lastName && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.lastName}:`}
            <span>{connection.lastName}</span>
          </Typography>
        )}

        {connection && connection.email && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.email}:`}
            <span>{connection.email}</span>
          </Typography>
        )}

        {connection && connection.website && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.website}:`}
            <span>{connection.website}</span>
          </Typography>
        )}

        {connection && connection.workPhone && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.workPhone}:`}
            <span>{connection.workPhone}</span>
          </Typography>
        )}

        {connection && connection.organization && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.organization}:`}
            <span>{connection.organization}</span>
          </Typography>
        )}

        {connection && connection.title && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.title}:`}
            <span>{connection.title}</span>
          </Typography>
        )}

        {connection && connection.note && (
          <Box className={classes.notesContainer}>
            <Typography className={classes.notesTitle} component="p" variant="body1">
              {`${pageStatics.data.connectionInfo.note}:`}
            </Typography>
            <Typography className={classes.notes} component="p" variant="body1">
              <span>{connection.note}</span>
            </Typography>
          </Box>
        )}
      </Box>
    </NotificationDialog>
  )
}

ConnectionNoteDialog.defaultProps = {
  open: false,
  connection: null,
}

ConnectionNoteDialog.propTypes = {
  open: PropTypes.bool,
  connection: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onClose: PropTypes.func.isRequired,
}

export default ConnectionNoteDialog
