import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

import { filterStyles } from './styles'

import * as vars from '../../utilities/appVars'

const FilterInvitations = ({ onFilter }) => {
  const classes = filterStyles()

  const [filterValue, setFiltertValue] = useState('All')

  const filterChangeHandler = (name, type) => {
    setFiltertValue(name)
    onFilter(type)
  }

  return (
    <Box mt={1} mb={5} className={classes.sortContainer}>
      <ButtonGroup className={classes.sortButtonsContainer} size="large" aria-label="Sort connections">
        {vars.INVITATION_FILTER.map(filter => (
          <Button
            key={filter.name}
            onClick={() => filterChangeHandler(filter.name, filter.type)}
            className={`${classes.sortButton} ${filterValue === filter.name && classes.selectedSortButton}`}
          >
            {filter.name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}

FilterInvitations.propTypes = {
  onFilter: PropTypes.func.isRequired,
}

export default FilterInvitations
