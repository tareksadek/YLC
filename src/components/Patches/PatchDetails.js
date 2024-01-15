import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import PageTitle from '../../layout/PageTitle'

import { createUserDialog } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

import { useLanguage } from '../../hooks/useLang'

const PatchDetails = ({
  closeDialog, dialogOpen, patchInfo, onViewInvitations,
}) => {
  const classes = createUserDialog()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.patches

  const viewPatchInvitations = e => {
    e.preventDefault()
    onViewInvitations(patchInfo.patchId)
  }

  const patchThemeColorStyle = patchInfo && patchInfo.theme ? {
    color: patchInfo.theme.selectedColor.code,
  } : null

  return (
    <FullScreenDialog
      title={`${patchInfo.patchTitle} ${pageStatics.data.titles.patchDetails}`}
      open={dialogOpen}
      onClose={() => closeDialog()}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => viewPatchInvitations(e)}
          disabled={!patchInfo}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.viewPatchInvitations}
        </Button>
      )}
    >
      {!patchInfo && <LoadingBackdrop placement="inset" loadingText={pageStatics.messages.loading.loadingPatchDetails} boxed />}
      <Box className={classes.dialogContent}>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title={pageStatics.data.titles.patchInfo} />
          <List aria-label={pageStatics.data.titles.patchDetails} className={classes.patchDetailsList}>
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchId}
                secondary={patchInfo.patchId}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchInvCount.first}
                secondary={`${patchInfo.contains} ${pageStatics.data.titles.patchInvCount.second}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchStatus}
                secondary={`${patchInfo.status}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchCreatedOn}
                secondary={format(new Date(patchInfo.createdOn.seconds ? patchInfo.createdOn.toDate() : patchInfo.createdOn).getTime(), 'MMM dd, yyyy')}
              />
            </ListItem>
          </List>
        </Box>

        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title={pageStatics.data.titles.patchLayoutInfo} />
          <List aria-label={pageStatics.data.titles.patchDetails} className={classes.patchDetailsList}>
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchLayout}
                secondary={patchInfo.theme ? patchInfo.theme.layout : 'Default'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchTheme}
                secondary={patchInfo.theme ? patchInfo.theme.theme : 'Default'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchColor}
                secondary={`
                ${patchInfo.theme && patchInfo.theme.selectedColor ? patchInfo.theme.selectedColor.name : 'Default'} ${patchInfo.theme && patchInfo.theme.selectedColor ? patchInfo.theme.selectedColor.code : ''}
                `}
                secondaryTypographyProps={{
                  style: patchThemeColorStyle,
                }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.defaultLinksToTheme}
                secondary={patchInfo.theme && patchInfo.theme.defaultLinksToTheme ? 'Yes' : 'No'}
              />
            </ListItem>
          </List>
        </Box>

        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title={pageStatics.data.titles.patchStoreInfo} />
          <List aria-label={pageStatics.data.titles.patchDetails} className={classes.patchDetailsList}>
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchLogo}
                secondary={patchInfo.store ? patchInfo.store.layout : 'Default'}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={pageStatics.data.titles.patchLogoLink}
                secondary={patchInfo.store && patchInfo.store.logoLink ? patchInfo.store.logoLink : 'Default'}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </FullScreenDialog>
  )
}

PatchDetails.defaultProps = {
  dialogOpen: false,
  patchInfo: null,
}

PatchDetails.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  patchInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onViewInvitations: PropTypes.func.isRequired,
}

export default PatchDetails
