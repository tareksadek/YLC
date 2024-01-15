import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import SkeletonContainer from '../../layout/SkeletonContainer'

import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'
import { formStyles } from './styles'

const FormCard = ({
  form,
  connectionSettings,
  onViewForm,
  onEditForm,
  onUseForm,
  loading,
}) => {
  const classes = formStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  const [formMenuAnchor, setFormMenuAnchor] = useState(null)
  let isActive = false

  if (connectionSettings) {
    isActive = connectionSettings.activeFormId ? connectionSettings.activeFormId === form.id : connectionSettings.defaultFormId === form.id
  }

  const openFormMenu = e => {
    e.stopPropagation()
    setFormMenuAnchor(e.currentTarget)
  }

  const closeFormMenu = e => {
    e.stopPropagation()
    setFormMenuAnchor(null)
  }

  const viewDetails = (e, formData) => {
    closeFormMenu(e)
    onViewForm(formData)
  }

  const editDetails = (e, formData) => {
    closeFormMenu(e)
    onEditForm(formData)
  }

  const activateForm = (e, formId) => {
    closeFormMenu(e)
    onUseForm(e, formId)
  }

  return (
    <ListItem className={classes.connectionItemContainer}>
      {loading ? (
        <SkeletonContainer list={[
          { variant: 'circle', width: 40, height: 40 },
          { variant: 'rect', width: '75%' },
        ]}
        />
      ) : (
        <>
          <ListItemText
            disableTypography
            className={classes.connectionItemTextContainer}
            primary={(
              <Box className={classes.connectionName}>
                <Typography component="p" variant="body1" className={classes.connectionNameText}>
                  {form.title}
                </Typography>
                {form && isActive && (
                  <Chip
                    size="small"
                    icon={<CheckCircleOutlineIcon />}
                    label="Active"
                    className={classes.chip}
                  />
                )}
              </Box>
            )}
          />
          <ListItemSecondaryAction className={classes.connectionItemActionContainer}>
            <IconButton aria-label="edit" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={e => openFormMenu(e)}>
              <MoreVertIcon color="secondary" fontSize="small" />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={formMenuAnchor}
              keepMounted
              open={Boolean(formMenuAnchor)}
              onClose={closeFormMenu}
              classes={{ paper: layoutClasses.menu }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={e => viewDetails(e, form)} className={classes.cardMenuButton}>{pageStatics.buttons.formMenu.view}</MenuItem>
              <MenuItem onClick={e => editDetails(e, form)} className={classes.cardMenuButton}>{pageStatics.buttons.formMenu.assign}</MenuItem>
              <MenuItem disabled={isActive} onClick={isActive ? () => false : e => activateForm(e, form.id)} className={classes.cardMenuButton}>
                {pageStatics.buttons.formMenu.use}
              </MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  )
}

FormCard.defaultProps = {
  form: null,
  loading: false,
  connectionSettings: null,
}

FormCard.propTypes = {
  form: PropTypes.objectOf(PropTypes.oneOfType([
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
  onViewForm: PropTypes.func.isRequired,
  onEditForm: PropTypes.func.isRequired,
  onUseForm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default FormCard
