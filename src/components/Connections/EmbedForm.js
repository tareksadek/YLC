import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import ListItem from '@material-ui/core/ListItem'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import FormElement from '../Ui/FormElement'
import Alert from '../../layout/Alert'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { formStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const EmbedForm = ({
  isSelected,
  embedButtonDisabled,
  typeForm,
  embedForm,
  onEmbedFormChange,
  onEmbedFormSaved,
  loading,
  // onViewForm,
  onUseForm,
  showEmbedForm,
  currentForm,
  useButtonEnabled,
}) => {
  const classes = formStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()

  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  const [formMenuAnchor, setFormMenuAnchor] = useState(null)

  const openFormMenu = e => {
    e.stopPropagation()
    setFormMenuAnchor(e.currentTarget)
  }

  const closeFormMenu = e => {
    e.stopPropagation()
    setFormMenuAnchor(null)
  }

  // const viewDetails = (e, formData) => {
  //   closeFormMenu(e)
  //   onViewForm(formData)
  // }

  const activateForm = (e, formId) => {
    closeFormMenu(e)
    onUseForm(e, formId)
  }

  const loadFormContent = (formElements, formType) => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={formElements[formEl].value}
        elementOptions={formElements[formEl].elementOptions}
        touched={formElements[formEl].touched}
        valid={formElements[formEl].isValid}
        errorMessage={formElements[formEl].errorMessage}
        shouldValidate={formElements[formEl].validtationRules}
        elementSetup={formElements[formEl].elementSetup}
        changed={e => onEmbedFormChange(e, formEl, formType)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  return (
    <ListItem className={classes.embedItemContainer}>
      <Accordion className={classes.embedAccordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.embedTitle}>
            {pageStatics.data.titles.embedForm}
          </Typography>
          {isSelected && (
            <Chip
              size="small"
              icon={<CheckCircleOutlineIcon />}
              label="Active"
              className={classes.chip}
            />
          )}
        </AccordionSummary>
        <AccordionDetails className={classes.embedAccordionDetails}>
          <Box mb={2}>
            <Typography>
              {pageStatics.data.description.embedForm}
            </Typography>
            <Box mt={1}>
              <Alert
                title={pageStatics.messages.notifications.embedForm.title}
                description={pageStatics.messages.notifications.embedForm.body}
                type="warning"
                noMargin
              />
            </Box>
          </Box>
          <Grid container spacing={3}>
            {loadFormContent(typeForm, 'type')}
          </Grid>
          {currentForm && currentForm === 'typeform' && (
            <Alert
              title={pageStatics.data.titles.typeFormAlert}
              description={[
                pageStatics.data.description.typeFormAlert.first,
                pageStatics.data.description.typeFormAlert.second,
                pageStatics.data.description.typeFormAlert.third,
                pageStatics.data.description.typeFormAlert.fourth,
                pageStatics.data.description.typeFormAlert.fifth,
              ]}
              type="info"
              noIcon
            />
          )}
          {currentForm && currentForm === 'google' && (
            <Alert
              title={pageStatics.data.titles.googleAlert}
              description={[
                pageStatics.data.description.googleAlert.first,
                pageStatics.data.description.googleAlert.second,
                pageStatics.data.description.googleAlert.third,
                pageStatics.data.description.googleAlert.fourth,
              ]}
              type="info"
              noIcon
            />
          )}
          {currentForm && currentForm === 'microsoft' && (
            <Alert
              title={pageStatics.data.titles.microsoftAlert}
              description={[
                pageStatics.data.description.microsoftAlert.first,
                pageStatics.data.description.microsoftAlert.second,
                pageStatics.data.description.microsoftAlert.third,
                pageStatics.data.description.microsoftAlert.fourth,
              ]}
              type="info"
            />
          )}
          {currentForm && currentForm === 'jotform' && (
            <Alert
              title={pageStatics.data.titles.jotformAlert}
              description={[
                pageStatics.data.description.jotformAlert.first,
                pageStatics.data.description.jotformAlert.second,
                pageStatics.data.description.jotformAlert.third,
                pageStatics.data.description.jotformAlert.fourth,
              ]}
              type="info"
            />
          )}
          {showEmbedForm && (
            <Grid container spacing={3}>
              {loadFormContent(embedForm, 'embed')}
            </Grid>
          )}
          <Box className={classes.embedFormButtons}>
            <Box className={classes.embedFormButtonsLeft}>
              <Button
                className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                onClick={e => onEmbedFormSaved(e)}
                disabled={embedButtonDisabled}
                style={{
                  backgroundColor: color.color.code,
                }}
              >
                {pageStatics.buttons.saveFormSettings}
              </Button>
            </Box>
            {!isSelected && (
              <Box className={classes.embedFormButtonsRight}>
                <Button
                  className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                  onClick={e => activateForm(e, 'embed')}
                  disabled={!useButtonEnabled}
                  style={{
                    backgroundColor: color.color.code,
                  }}
                >
                  {pageStatics.buttons.useForm}
                </Button>
              </Box>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <IconButton aria-label="edit" className={classes.embedMenuAnchor} aria-haspopup="true" color="secondary" onClick={e => openFormMenu(e)}>
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
        <MenuItem onClick={isSelected ? () => false : e => activateForm(e, 'embed')} className={classes.cardMenuButton}>{pageStatics.buttons.formMenu.use}</MenuItem>
      </Menu>
    </ListItem>
  )
}

EmbedForm.defaultProps = {
  isSelected: false,
  embedButtonDisabled: false,
  embedForm: null,
  loading: false,
  typeForm: null,
  showEmbedForm: false,
  currentForm: null,
  useButtonEnabled: false,
}

EmbedForm.propTypes = {
  loading: PropTypes.bool,
  isSelected: PropTypes.bool,
  embedButtonDisabled: PropTypes.bool,
  typeForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  embedForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onEmbedFormChange: PropTypes.func.isRequired,
  onEmbedFormSaved: PropTypes.func.isRequired,
  // onViewForm: PropTypes.func.isRequired,
  onUseForm: PropTypes.func.isRequired,
  showEmbedForm: PropTypes.bool,
  currentForm: PropTypes.string,
  useButtonEnabled: PropTypes.bool,
}

export default EmbedForm
