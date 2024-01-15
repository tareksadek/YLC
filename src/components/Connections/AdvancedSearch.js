import React from 'react'
import PropTypes from 'prop-types'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import FormElement from '../Ui/FormElement'

import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { advancedSearchStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'

const AdvancedSearch = ({
  advancedSearchFormElements, loading, changed, tags, onSearch, onClearSearch, clearSearchEnabled, valid, disableActions,
}) => {
  const classes = advancedSearchStyles()
  const buttonClasses = buttonStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  const loadTabForm = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={formElements[formEl].value}
        elementOptions={tags || []}
        touched={formElements[formEl].touched}
        valid={formElements[formEl].isValid}
        shouldValidate={formElements[formEl].validtationRules}
        elementSetup={formElements[formEl].elementSetup}
        errorMessage={formElements[formEl].errorMessage}
        changed={e => changed(e, formEl)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  return (
    <Accordion className={classes.advancedSearchContainer}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.advancedSearchTitleContainer}
      >
        <Typography className={classes.heading}>{pageStatics.data.titles.advancedSearch}</Typography>
      </AccordionSummary>
      {!disableActions && (
        <AccordionDetails className={classes.advancedSearchFormContainer}>
          <Grid container spacing={3}>
            {loadTabForm(advancedSearchFormElements)}
          </Grid>
          <Box className={classes.advancedSearchButtonsContainer}>
            <Button
              color="secondary"
              onClick={e => onSearch(e)}
              className={`${buttonClasses.defaultButton} ${buttonClasses.smallButton}`}
              disabled={!valid}
              style={{
                backgroundColor: color.color.code,
                minWidth: 100,
                width: 'auto',
              }}
            >
              {pageStatics.buttons.advancedSearch}
            </Button>
            <Button
              color="secondary"
              onClick={e => onClearSearch(e)}
              className={`${buttonClasses.outlineButton} ${buttonClasses.smallButton}`}
              disabled={!clearSearchEnabled}
              style={{
                borderColor: clearSearchEnabled && color.color.code,
                minWidth: 100,
                width: 'auto',
              }}
            >
              {pageStatics.buttons.advancedSearchClear}
            </Button>
          </Box>
        </AccordionDetails>
      )}
    </Accordion>
  )
}

AdvancedSearch.defaultProps = {
  loading: false,
  advancedSearchFormElements: null,
  tags: null,
  valid: false,
  clearSearchEnabled: false,
  disableActions: false,
}

AdvancedSearch.propTypes = {
  loading: PropTypes.bool,
  changed: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  advancedSearchFormElements: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  valid: PropTypes.bool,
  clearSearchEnabled: PropTypes.bool,
  disableActions: PropTypes.bool,
}

export default AdvancedSearch
