import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { DataGrid } from '@mui/x-data-grid'

import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import MoreVertIcon from '@material-ui/icons/MoreVert'

import ConnectionsGridToolbar from './GridToolbar'

import { useLanguage } from '../../hooks/useLang'

import { gridStyles } from './styles'

import * as vars from '../../utilities/appVars'

const ConnectionsGrid = ({
  connections, onRemove, onOpenDetailsDialog, onOpenEditDialog, onOpenAssignDialog, onAddToContact, searchedConnections, disableActions, tags,
  disableEdit, disableAssign, disableRemove,
}) => {
  const gridClasses = gridStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections

  const [anchorEl, setAnchorEl] = useState(null)
  const [menuUser, setMenuUser] = useState(null)

  const openMenu = (e, userData) => {
    e.stopPropagation()
    setMenuUser(userData)
    setAnchorEl(e.currentTarget)
  }

  const closeViewMenu = e => {
    e.stopPropagation()
    setMenuUser(null)
    setAnchorEl(null)
  }

  const openDetailsDialog = (e, userData) => {
    if (userData) {
      onOpenDetailsDialog(userData)
    } else {
      onOpenDetailsDialog(menuUser)
      closeViewMenu(e)
    }
  }

  const openEditDialog = e => {
    onOpenEditDialog(menuUser)
    closeViewMenu(e)
  }

  const openAssignDialog = e => {
    onOpenAssignDialog(menuUser)
    closeViewMenu(e)
  }

  const removeConnection = e => {
    onRemove(menuUser)
    closeViewMenu(e)
  }

  const addToContacts = e => {
    onAddToContact(menuUser)
    closeViewMenu(e)
  }

  return (
    <Box className={gridClasses.gridWrapper}>
      {connections && (
        <DataGrid
          loading={!connections}
          autoHeight
          pageSize={vars.CONNECTIONS_PER_PAGE}
          rows={searchedConnections || connections || []}
          getRowId={row => new Date(row.addedOn.seconds ? row.addedOn.toDate() : row.addedOn).getTime()}
          components={{
            Toolbar: ConnectionsGridToolbar,
          }}
          columns={[
            {
              field: 'userName',
              headerName: 'Name',
              cellClassName: gridClasses.nameCell,
              minWidth: 120,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => openDetailsDialog(e, row)}>
                  {row.tags && row.tags.length > 0 && (
                    <Box className={gridClasses.tagsContainer}>
                      {row.tags.map(tag => {
                        const currentTag = tags.filter(tagObj => tagObj.id === tag)[0]
                        if (currentTag) {
                          return (
                            <span
                              key={tag}
                              style={{ backgroundColor: currentTag.color }}
                            >
                              &nbsp;
                            </span>
                          )
                        }
                        return false
                      })}
                    </Box>
                  )}
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{row.userName}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'email',
              headerName: 'E-mail',
              flex: 1,
              cellClassName: gridClasses.emailCell,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => openDetailsDialog(e, row)}>
                  <Typography className={gridClasses.emailCell} component="p" variant="body1">
                    <span>{row.email}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: '',
              headerName: '',
              felx: 1,
              width: 50,
              sortable: false,
              filterable: false,
              disableColumnMenu: true,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridActionsContainer}>
                  <Box className={gridClasses.gridActionsButtons}>
                    <IconButton
                      aria-label="settings"
                      className={gridClasses.menuAnchor}
                      aria-haspopup="true"
                      color="secondary"
                      onClick={e => openMenu(e, row)}
                      disabled={disableActions}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeViewMenu}
                    classes={{ paper: gridClasses.cardMenu }}
                    PopoverClasses={{ root: gridClasses.connectionMenuPopover }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={e => addToContacts(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.connectionsMenu.addToContacts}</MenuItem>
                    <MenuItem onClick={e => openDetailsDialog(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.connectionsMenu.details}</MenuItem>
                    {!disableEdit && (
                      <MenuItem onClick={e => openEditDialog(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.connectionsMenu.edit}</MenuItem>
                    )}
                    {!disableAssign && (
                      <MenuItem onClick={e => openAssignDialog(e)} className={gridClasses.cardMenuButton}>
                        {pageStatics.buttons.connectionsMenu.assign}
                      </MenuItem>
                    )}
                    {!disableRemove && (
                      <MenuItem onClick={e => removeConnection(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.connectionsMenu.remove}</MenuItem>
                    )}
                  </Menu>
                </Box>
              ),
            },
          ]}
          onPageChange={() => true}
          className={gridClasses.gridContainer}
          componentsProps={{
            panel: { className: gridClasses.gridPanel },
            columnMenu: { className: gridClasses.columnMenu },
          }}
        />
      )}
    </Box>
  )
}

ConnectionsGrid.defaultProps = {
  connections: null,
  searchedConnections: null,
  disableActions: false,
  tags: null,
  disableEdit: false,
  disableAssign: false,
  disableRemove: false,
}

ConnectionsGrid.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onRemove: PropTypes.func.isRequired,
  onOpenDetailsDialog: PropTypes.func.isRequired,
  onOpenEditDialog: PropTypes.func.isRequired,
  onAddToContact: PropTypes.func.isRequired,
  onOpenAssignDialog: PropTypes.func.isRequired,
  searchedConnections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  disableActions: PropTypes.bool,
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  disableEdit: PropTypes.bool,
  disableAssign: PropTypes.bool,
  disableRemove: PropTypes.bool,
}

export default ConnectionsGrid
