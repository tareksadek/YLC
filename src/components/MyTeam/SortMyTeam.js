import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

import { layoutStyles } from '../../theme/layout'

import * as vars from '../../utilities/appVars'

const SortMyTeam = ({ onSort }) => {
  const layoutClasses = layoutStyles()

  const [sortValue, setSortValue] = useState('A - Z')

  const sortChangeHandler = (name, value, type) => {
    setSortValue(name)
    onSort(value, type)
  }

  return (
    <Box mt={1} mb={5} className={layoutClasses.sortContainer}>
      <ButtonGroup className={layoutClasses.sortButtonsContainer} size="large" aria-label="Sort connections">
        {vars.TEAM_MEMBERS_SORTS.map(filter => (
          <Button
            key={filter.name}
            onClick={() => sortChangeHandler(filter.name, filter.value, filter.type)}
            className={`${layoutClasses.sortButton} ${sortValue === filter.name && layoutClasses.selectedSortButton}`}
          >
            {filter.name}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}

SortMyTeam.propTypes = {
  onSort: PropTypes.func.isRequired,
}

export default SortMyTeam
