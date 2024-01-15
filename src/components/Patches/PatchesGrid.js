import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import { DataGrid } from '@mui/x-data-grid'

import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import StarIcon from '@material-ui/icons/Star'

import ConnectionsGridToolbar from './GridToolbar'

import { useLanguage } from '../../hooks/useLang'

import { gridStyles } from './styles'

import * as vars from '../../utilities/appVars'

const PatchesGrid = ({
  patches, disableRemove, onRemove, onChangeStatus, searchedPatches, disableActions, onViewPatchDetails, onViewPatchInvitations,
  onChangeTitle,
}) => {
  const gridClasses = gridStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.patches

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

  const openDetailsDialog = e => {
    closeViewMenu(e)
    onViewPatchDetails(menuUser)
  }

  const changeTitle = e => {
    closeViewMenu(e)
    onChangeTitle(menuUser)
  }

  const changeStatus = e => {
    closeViewMenu(e)
    onChangeStatus(menuUser)
  }

  const viewPatchInvitations = (e, patchData) => {
    closeViewMenu(e)
    onViewPatchInvitations(patchData.patchId)
  }

  const removePatch = e => {
    closeViewMenu(e)
    onRemove(menuUser.patchId)
  }

  // const openEditDialog = e => {
  //   onOpenEditDialog(menuUser)
  //   closeViewMenu(e)
  // }

  // const openAssignDialog = e => {
  //   onOpenAssignDialog(menuUser)
  //   closeViewMenu(e)
  // }

  // const removeConnection = e => {
  //   onRemove(menuUser)
  //   closeViewMenu(e)
  // }

  // const addToContacts = e => {
  //   onAddToContact(menuUser)
  //   closeViewMenu(e)
  // }

  return (
    <Box className={gridClasses.gridWrapper}>
      {patches && (
        <DataGrid
          loading={!patches}
          autoHeight
          pageSize={vars.PATCHES_PER_PAGE}
          rows={searchedPatches || patches || []}
          getRowId={row => new Date(row.createdOn.seconds ? row.createdOn.toDate() : row.createdOn).getTime()}
          components={{
            Toolbar: ConnectionsGridToolbar,
          }}
          columns={[
            {
              field: 'patchId',
              headerName: 'ID',
              cellClassName: gridClasses.nameCell,
              minWidth: 50,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewPatchInvitations(e, row)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{row.patchId}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'patchTitle',
              headerName: 'Title',
              cellClassName: gridClasses.nameCell,
              minWidth: 150,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewPatchInvitations(e, row)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{row.patchTitle}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'contains',
              headerName: 'Inv.',
              cellClassName: gridClasses.nameCell,
              minWidth: 80,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewPatchInvitations(e, row)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{row.contains}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'status',
              headerName: 'Status',
              cellClassName: gridClasses.nameCell,
              minWidth: 120,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewPatchInvitations(e, row)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{row.status}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'createdOn',
              headerName: 'Created',
              cellClassName: gridClasses.nameCell,
              flex: 1,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewPatchInvitations(e, row)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{format(new Date(row.createdOn.seconds ? row.createdOn.toDate() : row.createdOn).getTime(), 'MMM dd, yyyy')}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'alwaysPro',
              headerName: 'Type',
              cellClassName: gridClasses.nameCell,
              flex: 1,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewPatchInvitations(e, row)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    {row.alwaysPro ? (
                      <span>
                        <StarIcon style={{ color: '#ffb100' }} />
                        Bypass
                      </span>
                    ) : (
                      <span>
                        Default
                      </span>
                    )}
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
                    <MenuItem onClick={e => viewPatchInvitations(e, menuUser)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.patchesMenu.viewInvitations}</MenuItem>
                    <MenuItem onClick={e => openDetailsDialog(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.patchesMenu.details}</MenuItem>
                    <MenuItem onClick={e => changeTitle(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.patchesMenu.changeTitle}</MenuItem>
                    <MenuItem onClick={e => changeStatus(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.patchesMenu.changeStatus}</MenuItem>
                    {!disableRemove && (
                      <MenuItem onClick={e => removePatch(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.patchesMenu.remove}</MenuItem>
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
          getRowClassName={params => `row-${params.getValue(params.id, 'status')}`}
        />
      )}
    </Box>
  )
}

PatchesGrid.defaultProps = {
  patches: null,
  searchedPatches: null,
  disableActions: false,
  disableRemove: false,
}

PatchesGrid.propTypes = {
  patches: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onRemove: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onViewPatchDetails: PropTypes.func.isRequired,
  onViewPatchInvitations: PropTypes.func.isRequired,
  searchedPatches: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  disableActions: PropTypes.bool,
  disableRemove: PropTypes.bool,
}

export default PatchesGrid
