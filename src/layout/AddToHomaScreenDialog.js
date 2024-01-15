/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import AddToHomeScreenIcon from '@material-ui/icons/AddToHomeScreen'

import NotificationDialog from './NotificationDialog'

import { useLanguage } from '../hooks/useLang'

import { buttonStyles } from '../theme/buttons'
import { layoutStyles } from '../theme/layout'

const AddToHomaScreenDialog = ({
  open, onClose,
}) => {
  const layoutClasses = layoutStyles()
  const addToHomaScreenDialogStyles = makeStyles(theme => ({
    titleContainer: {
      textAlign: 'center',
      '& h2': {
        fontWeight: 600,
        color: '#272727',
      },
    },
    dialogContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      '& img': {
        maxWidth: 300,
        width: '100%',
        borderRadius: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    },
    installText: {
      color: '#272727',
    },
    installSubText: {
      marginBottom: theme.spacing(2),
      fontSize: '0.8rem',
      color: '#272727',
    },
    dialogButtonContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& button': {
        minWidth: 150,
        backgroundColor: '#272727',
        color: '#fff',
      },
    },
  }))
  const classes = addToHomaScreenDialogStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.layout
  const isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  return (
    <NotificationDialog
      type="custom"
      background="#fff"
      title={pageStatics.data.titles.install}
      icon={<AddToHomeScreenIcon style={{ color: '#272727' }} />}
      open={open}
      onClose={() => onClose()}
    >
      <Box className={`${classes.dialogContent}`}>
        <Typography variant="body1" component="p" align="center" className={classes.installText}>
          {pageStatics.data.installPWA.first}
        </Typography>
        <Typography variant="body1" component="p" align="center" className={classes.installSubText}>
          {pageStatics.data.installPWA.second}
        </Typography>
        {/* <img className={layoutClasses.addToHomeScreenImage} src={isSafari || iOS ? '/assets/images/add_to_home_screen_ios.jpg' : '/assets/images/add_to_home_screen_android.jpg'} alt={language.languageVars.appNameCAPS} /> */}
        {
          isSafari || iOS ? (
            <video
              src="/assets/images/add_to_home_screen_iphone.mp4"
              height="480"
              width="270"
              controls
              playsInline
            >
              {pageStatics.data.installPWA.first}
            </video>
          ) : (
            <video
              src="/assets/images/add_to_home_screen_android.webm"
              height="480"
              width="270"
              preload="auto"
              controls
              playsInline
              muted
              loop
            >
              {pageStatics.data.installPWA.first}
            </video>
          )
        }
        
        {
          // <img
          //   src={isSafari || iOS ? '/assets/images/add_to_home_screen_ios.jpg' : '/assets/images/add_to_home_screen_android.jpg'}
          //   alt={pageStatics.data.installPWA.first}
          // />
        }
      </Box>
    </NotificationDialog>
  )
}

AddToHomaScreenDialog.defaultProps = {
  open: false,
}

AddToHomaScreenDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default AddToHomaScreenDialog
