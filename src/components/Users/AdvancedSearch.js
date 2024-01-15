import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormElement from '../Ui/FormElement'
import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { buttonStyles } from '../../theme/buttons'

const AdvancedSearch = ({
  searchForm, setSearchForm, inputChangeHandler, loading, onSubmit,
}) => {
  const buttonClasses = buttonStyles()

  const loadAdvancedSearchFormContent = (formElements, setForm) => {
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
        changed={e => inputChangeHandler(e, formEl, formElements, setForm)}
        grid={formElements[formEl].grid}
        disabled={loading}
        formElementSpacing={3}
        key={formEl + i}
      />
    ))

    return form
  }

  return (
    <Box>
      {loading && <LoadingBackdrop placement="inset" loadingText="loading..." boxed />}
      <form>
        <Box>
          <Grid container spacing={3}>
            {loadAdvancedSearchFormContent(searchForm, setSearchForm)}
          </Grid>
        </Box>
        <Box>
          <Button
            color="secondary"
            onClick={e => onSubmit(e)}
            disabled={false}
            className={buttonClasses.defaultButton}
            style={{
              minWidth: '250px',
            }}
          >
            Search
          </Button>
        </Box>
      </form>
    </Box>
  )
}

AdvancedSearch.defaultProps = {
  searchForm: null,
  loading: false,
}

AdvancedSearch.propTypes = {
  inputChangeHandler: PropTypes.func.isRequired,
  setSearchForm: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  searchForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  loading: PropTypes.bool,
}

export default AdvancedSearch
