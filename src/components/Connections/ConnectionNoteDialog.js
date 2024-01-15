import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

import PersonIcon from '@material-ui/icons/Person'

import NotificationDialog from '../../layout/NotificationDialog'

import { useLanguage } from '../../hooks/useLang'

import { connectionNoteDialogStyles } from './styles'

const ConnectionNoteDialog = ({
  open, onClose, connection, tags,
}) => {
  const classes = connectionNoteDialogStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  let addedOn
  if (connection) {
    addedOn = connection.addedOn.seconds ? connection.addedOn.toDate() : connection.addedOn
  }

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
            <span>{`${connection && format(new Date(addedOn), 'dd-MM-yyyy h:mm a')}`}</span>
          </Typography>
        )}
        {connection && connection.firstName && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.name}:`}
            <span>{`${connection.firstName} ${connection.lastName}`}</span>
          </Typography>
        )}

        {connection && connection.email && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.email}:`}
            <span>{connection.email}</span>
          </Typography>
        )}

        {connection && connection.workPhone && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.workPhone}:`}
            <span>{connection.workPhone}</span>
          </Typography>
        )}

        {connection && connection.interest && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.interest}:`}
            <span>{connection.interest}</span>
          </Typography>
        )}

        {connection && connection.reason && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.reason}:`}
            <span>{connection.reason}</span>
          </Typography>
        )}

        {connection && connection.period && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.period}:`}
            <span>{connection.period}</span>
          </Typography>
        )}

        {connection && connection.mortgage && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.mortgage}:`}
            <span>{connection.mortgage}</span>
          </Typography>
        )}

        {connection && connection.consultation && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.consultation}:`}
            <span>{connection.consultation}</span>
          </Typography>
        )}

        {connection && connection.website && (
          <Typography component="p" variant="body1">
            {`${pageStatics.data.connectionInfo.website}:`}
            <span>{connection.website}</span>
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

        {connection && connection.tags && connection.tags.length > 0 && (
          <Box className={classes.connectionTagsContainer}>
            {connection.tags.map(tag => {
              const currentTag = tags.filter(tagObj => tagObj.id === tag)[0]
              if (currentTag) {
                return (
                  <Chip
                    key={tag}
                    label={currentTag.display}
                    className={classes.connectionTagChip}
                    style={{ backgroundColor: currentTag.color }}
                  />
                )
              }
              return false
            })}
          </Box>
        )}
      </Box>
    </NotificationDialog>
  )
}

ConnectionNoteDialog.defaultProps = {
  open: false,
  connection: null,
  tags: null,
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
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default ConnectionNoteDialog
