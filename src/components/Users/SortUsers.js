import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { useLanguage } from '../../hooks/useLang'

import { filterStyles } from './styles'

import * as vars from '../../utilities/appVars'

const SortUsers = ({ onSort }) => {
  const classes = filterStyles()
  const language = useLanguage()

  const [sortValue, setSortValue] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const sortChangeHandler = (name, value, type) => {
    setSortValue(name)
    onSort(value, type)
    handleClose()
  }

  const filterClearHandler = () => {
    setSortValue('')
  }

  return (
    <Box mt={1} mb={5} className={classes.filterContainer}>
      <Button
        aria-controls="sort-menu"
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        onClick={handleClick}
        className={`${classes.filterButton} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
      >
        {`Sorting: ${sortValue || 'None'}`}
        <Divider className={classes.divider} orientation="vertical" />
        <ArrowDropDownIcon />
      </Button>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        id="sort-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        dir={language.direction}
      >
        <MenuItem
          classes={{
            root: classes.root,
          }}
          onClick={() => filterClearHandler()}
        >
          <ListItemText primary="All" />
        </MenuItem>
        {vars.SORTS.map(filter => (
          <MenuItem
            classes={{
              root: classes.root,
            }}
            onClick={() => sortChangeHandler(filter.name, filter.value, filter.type)}
            key={filter.name}
          >
            <ListItemText
              primary={filter.name}
              primaryTypographyProps={{
                classes: {
                  body1: language.direction === 'rtl' ? classes.arabicFont : '',
                },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

SortUsers.propTypes = {
  onSort: PropTypes.func.isRequired,
}

export default SortUsers
