import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import { listStyles } from './styles'

import FormCard from './FormCard'
import FormCardSkeleton from './FormCardSkeleton'
import EmbedForm from './EmbedForm'

const FormsList = ({
  forms,
  connectionSettings,
  onOpenFormDialog,
  onOpenEditDialog,
  onUseForm,
  loading,
  embedButtonDisabled,
  typeForm,
  embedForm,
  onEmbedFormChange,
  onEmbedFormSaved,
  showEmbedForm,
  currentForm,
  useButtonEnabled,
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
          onViewForm={onOpenFormDialog}
          onEditForm={onOpenEditDialog}
          onUseForm={onUseForm}
          loading={loading}
          connectionSettings={connectionSettings}
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
        <EmbedForm
          isSelected={!!(connectionSettings && connectionSettings.embedForm && connectionSettings.embedForm.embedCode && connectionSettings.activeFormId && connectionSettings.activeFormId === 'embed')}
          embedButtonDisabled={embedButtonDisabled}
          typeForm={typeForm}
          embedForm={embedForm}
          onEmbedFormChange={onEmbedFormChange}
          onEmbedFormSaved={onEmbedFormSaved}
          loading={loading}
          onViewForm={onOpenFormDialog}
          onUseForm={onUseForm}
          showEmbedForm={showEmbedForm}
          currentForm={currentForm}
          useButtonEnabled={useButtonEnabled}
        />
      </List>
    </div>
  )
}

FormsList.defaultProps = {
  forms: null,
  loading: false,
  connectionSettings: null,
  embedButtonDisabled: false,
  embedForm: null,
  typeForm: null,
  showEmbedForm: false,
  currentForm: null,
  useButtonEnabled: false,
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
  onOpenFormDialog: PropTypes.func.isRequired,
  onOpenEditDialog: PropTypes.func.isRequired,
  onUseForm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
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
  showEmbedForm: PropTypes.bool,
  currentForm: PropTypes.string,
  useButtonEnabled: PropTypes.bool,
}

export default FormsList
