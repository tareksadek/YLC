import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'

import SkeletonContainer from '../../layout/SkeletonContainer'

import { formStyles } from './styles'

const FormCard = ({
  form,
  onUseForm,
  loading,
  selectedForm,
}) => {
  const classes = formStyles()

  let isActive = false

  if (selectedForm) {
    isActive = selectedForm === form.id
  }

  const activateForm = (e, formId) => {
    onUseForm(e, formId)
  }

  return (
    <ListItem
      className={classes.connectionItemContainer}
      onClick={e => activateForm(e, form.id)}
    >
      {loading ? (
        <SkeletonContainer list={[
          { variant: 'circle', width: 40, height: 40 },
          { variant: 'rect', width: '75%' },
        ]}
        />
      ) : (
        <ListItemText
          disableTypography
          className={classes.connectionItemTextContainer}
          primary={(
            <Box className={classes.connectionName}>
              {form && isActive ? <CheckCircleOutlineIcon className={classes.selectedFormIcon} /> : <RadioButtonUncheckedIcon />}
              <Typography component="p" variant="body1" className={classes.connectionNameText}>
                {form.onboarding}
              </Typography>
            </Box>
          )}
        />
      )}
    </ListItem>
  )
}

FormCard.defaultProps = {
  form: null,
  loading: false,
  selectedForm: null,
}

FormCard.propTypes = {
  form: PropTypes.objectOf(PropTypes.oneOfType([
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

export default FormCard
