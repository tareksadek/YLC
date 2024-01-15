import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'

import SearchIcon from '@material-ui/icons/Search'
import BackspaceIcon from '@material-ui/icons/Backspace'

import { useLanguage } from '../../hooks/useLang'

import { searchStyles } from './styles'

const SearchConnections = ({ onSearch, onClear }) => {
  const classes = searchStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  const [searchValue, setSearchValue] = useState('')

  const searchChangeHandler = e => {
    const search = e.target.value
    setSearchValue(search)
    onSearch(search)
  }

  const searchClearHandler = () => {
    setSearchValue('')
    onClear()
  }

  const enterClick = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  return (
    <Box mt={1} mb={5} mr={1} className={classes.searchContainer}>
      <Paper elevation={0} square component="form" className={classes.root}>
        <InputBase
          className={`${classes.input} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
          placeholder={pageStatics.forms.searchConnections}
          startAdornment={(
            <InputAdornment position="start">
              <SearchIcon style={{ color: '#888888' }} />
            </InputAdornment>
          )}
          value={searchValue}
          onChange={e => searchChangeHandler(e)}
          onKeyDown={e => enterClick(e)}
        />
        <Divider className={classes.divider} orientation="vertical" />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={searchClearHandler} disabled={searchValue.length === 0}>
          <BackspaceIcon />
        </IconButton>
      </Paper>
    </Box>
  )
}

SearchConnections.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
}

export default SearchConnections
