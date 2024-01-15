import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import { listStyles } from './styles'

import FormCard from './FormCard'
import FormCardSkeleton from './FormCardSkeleton'

const FormsList = ({
  forms,
  connectionSettings,
  onUseForm,
  loading,
  selectedForm,
}) => {
  const classes = listStyles()

  const createFormsList = () => {
    let formsList = []
    if (forms) {
      formsList = forms.map((form, i) => (
        <FormCard
          index={i}
          key={form.id}
          form={form}
          onUseForm={onUseForm}
          loading={loading}
          connectionSettings={connectionSettings}
          selectedForm={selectedForm}
        />
      ))
    } else {
      formsList = [...Array(12)].map(() => (
        <FormCardSkeleton key={Math.floor(Math.random() * 1000000)} />
      ))
    }

    return formsList
  }

  return (
    <div className={classes.root}>
      <List className={classes.connectionsList}>
        {createFormsList()}
      </List>
    </div>
  )
}

FormsList.defaultProps = {
  forms: null,
  loading: false,
  connectionSettings: null,
  selectedForm: null,
}

FormsList.propTypes = {
  forms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  connectionSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onUseForm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  selectedForm: PropTypes.string,
}

export default FormsList
