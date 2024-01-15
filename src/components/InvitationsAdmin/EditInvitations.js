import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'

import { SketchPicker } from 'react-color'

import CheckIcon from '@material-ui/icons/Check'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import PageTitle from '../../layout/PageTitle'

import FormElement from '../Ui/FormElement'

import { editInvitationsDialog } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import {
  SocialLayoutIcon, BusinessLayoutIcon, BasicLayoutIcon,
} from '../../layout/CustomIcons'

import { updatePatch } from '../../API/invitationPatches'
import { updatePatchInvitations } from '../../API/invitations'

import { useLanguage } from '../../hooks/useLang'

import { themeColors } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const EditInvitations = ({
  patch, closeDialog, dialogOpen, onSetNotification, updateInvitationList,
}) => {
  const classes = editInvitationsDialog()
  const buttonClasses = buttonStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.invitations
  const [loading, setLoading] = useState(false)
  const [patchFormValid, setPatchFormValid] = useState(false)
  const [patchForm, setPatchForm] = useState({
    patchTitle: createFormElementObj('input', 'Patch Title',
      { type: 'text', name: 'title', placeholder: 'Patch Title' }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    // package: createFormElementObj('select', 'Package', { name: 'package' }, '', [
    //   { value: 'test', display: 'Test' },
    //   { value: 'virtual', display: 'Virtual' },
    //   { value: 'device', display: 'Regular' },
    //   { value: 'master', display: 'Master' },
    //   { value: 'realtor', display: 'Realtor' },
    // ], { required: true }, false, {
    //   xs: 12,
    //   sm: null,
    //   md: null,
    //   lg: null,
    //   xl: null,
    //   fullWidth: true,
    // }),
    logo: createFormElementObj('textarea', 'Logo',
      {
        type: 'text',
        name: 'logo',
        placeholder: 'Logo',
        parse: 'disabled',
      },
      '',
      null,
      { required: false },
      true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    logoLink: createFormElementObj('input', 'Logo Link',
      { type: 'text', name: 'logoLink', placeholder: 'Logo Link' }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    storeButtonText: createFormElementObj('input', 'Store Button Text',
      { type: 'text', name: 'storeButtonText', placeholder: 'Store Button Text' }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    storeButtonLink: createFormElementObj('input', 'Store Button Link',
      { type: 'text', name: 'storeButtonLink', placeholder: 'Store Button Link' }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })
  const [defaultLayout, setDefaultLayout] = useState('social')
  const [defaultTheme, setDefaultTheme] = useState('light')
  const [defaultColor, setDefaultColor] = useState({ name: 'grey', code: '#888888' })
  const [pickerColor, setPickerColor] = useState('#000')
  const [defaultLinksToTheme, setDefaultLinksToTheme] = useState(false)

  useEffect(() => {
    if (patch && patch.patchId) {
      const patchData = {
        patchTitle: patch.patchTitle,
        logo: patch.store ? patch.store.logo : null,
        logoLink: patch.store ? patch.store.logoLink : null,
        storeButtonText: patch.store ? patch.store.storeButtonText : null,
        storeButtonLink: patch.store ? patch.store.storeButtonLink : null,
      }
      const adjustedInfoForm = adjustFormValues(patchForm, patchData, null)
      setPatchForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
      setPatchFormValid(adjustedInfoForm.formValid)

      setDefaultLayout(patch.theme.layout)
      setDefaultTheme(patch.theme.theme)
      setDefaultColor(patch.theme.selectedColor)
      setDefaultLinksToTheme(patch.theme.defaultLinksToTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patch])

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(patchForm, changeEvent, key)
    setPatchForm(adjustedForm.adjustedForm)
    setPatchFormValid(adjustedForm.formValid)
  }

  const loadPatchForm = () => {
    const form = Object.keys(patchForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={patchForm[formEl].elementType}
            label={patchForm[formEl].elementLabel}
            value={patchForm[formEl].value}
            elementOptions={patchForm[formEl].elementOptions}
            touched={patchForm[formEl].touched}
            valid={patchForm[formEl].isValid}
            shouldValidate={patchForm[formEl].validtationRules}
            elementSetup={patchForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={patchForm[formEl].grid}
            disabled={loading}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const updateInvitationsHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const patchFormDetails = createFormValuesObj(patchForm)
    const patchDetails = {
      ...patch,
      store: {
        ...patch.store,
        logo: patchFormDetails.logo,
        logoLink: patchFormDetails.logoLink,
        storeButtonLink: patchFormDetails.storeButtonLink,
        storeButtonText: patchFormDetails.storeButtonText,
      },
      theme: {
        ...patch.theme,
        layout: defaultLayout,
        selectedColor: defaultColor,
        theme: defaultTheme,
        defaultLinksToTheme,
      },
    }

    const invitationDetails = {
      store: patchDetails.store,
      theme: patchDetails.theme,
    }

    await updatePatch(patch.patchId, patchDetails)
    await updatePatchInvitations(patch.patchId, invitationDetails)

    await updateInvitationList()
    closeDialog()
    onSetNotification({
      message: 'Invitations edited successfully.',
      type: 'success',
    })

    setLoading(false)
  }

  const changeLayoutHandler = layoutMode => {
    setDefaultLayout(layoutMode)
  }

  const changeThemeHandler = themeMode => {
    setDefaultTheme(themeMode)
  }

  const changeColorHandler = colorObj => {
    setDefaultColor(colorObj)
  }

  const colorPickerHandler = colorCode => {
    setPickerColor(colorCode)
    const colorObj = {
      name: 'picker',
      code: colorCode,
    }
    setDefaultColor(colorObj)
  }

  const setColorAsDefault = () => {
    setDefaultLinksToTheme(prevState => !prevState)
  }

  return (
    <FullScreenDialog
      title={`${pageStatics.data.titles.editInvitations} ${patch ? patch.patchTitle : ''}`}
      open={dialogOpen}
      onClose={() => closeDialog()}
      actionButtonOne={(
        <Button
          color="secondary"
          className={buttonClasses.defaultButton}
          onClick={e => updateInvitationsHandler(e)}
          disabled={!patchFormValid || loading}
        >
          {pageStatics.buttons.editInvitations}
        </Button>
      )}
    >
      {loading && <LoadingBackdrop placement="inset" loadingText="Creating patch..." boxed />}
      <Box className={classes.dialogContent}>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title="Main info" />
          <Grid container spacing={3}>
            {loadPatchForm()}
          </Grid>
        </Box>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title="Layout" />
          <Box className={classes.layoutButtonsContainer}>
            <Button onClick={() => changeLayoutHandler('basic')} className={defaultLayout === 'basic' ? classes.selectedLayout : ''}>
              <BasicLayoutIcon
                fill="#bbb"
                background={defaultTheme === 'dark' ? '#272727' : '#fff'}
                backgroundrev={defaultTheme === 'dark' ? '#eee' : '#272727'}
                selectedcolor={defaultColor.code || '#bbb'}
              />
              <span className={classes.buttonText}>
                Basic
              </span>
            </Button>
            <Button onClick={() => changeLayoutHandler('social')} className={defaultLayout === 'social' ? classes.selectedLayout : ''}>
              <SocialLayoutIcon
                fill="#bbb"
                background={defaultTheme === 'dark' ? '#272727' : '#fff'}
                backgroundrev={defaultTheme === 'dark' ? '#eee' : '#272727'}
                selectedcolor={defaultColor.code || '#bbb'}
              />
              <span className={classes.buttonText}>
                Social
              </span>
            </Button>
            <Button onClick={() => changeLayoutHandler('business')} className={defaultLayout === 'business' ? classes.selectedLayout : ''}>
              <BusinessLayoutIcon
                fill="#bbb"
                background={defaultTheme === 'dark' ? '#272727' : '#fff'}
                backgroundrev={defaultTheme === 'dark' ? '#eee' : '#272727'}
                selectedcolor={defaultColor.code || '#bbb'}
              />
              <span className={classes.buttonText}>
                Business
              </span>
            </Button>
          </Box>
        </Box>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title="Theme" mt={3} />
          <Box className={classes.themeButtonsContainer}>
            <Button
              className={`${classes.themeButton} ${classes.lightThemeButton} ${defaultTheme === 'light' ? classes.selectedTheme : ''}`}
              onClick={() => changeThemeHandler('light')}
            >
              <CheckIcon />
            </Button>
            <Button
              className={`${classes.themeButton} ${classes.darkThemeButton} ${defaultTheme === 'dark' ? classes.selectedTheme : ''}`}
              onClick={() => changeThemeHandler('dark')}
            >
              <CheckIcon />
            </Button>
          </Box>
        </Box>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title="Color" mt={3} />
          <Box className={classes.colorButtonsContainer}>
            {
              // color.color.name === 'picker' && (
              //   <Button
              //     className={classes.colorButton}
              //     onClick={() => changeColorHandler({ name: 'picker', code: color.color.code })}
              //     style={{ backgroundColor: color.color.code }}
              //   >
              //     {color.color.name === 'picker' && (
              //       <CheckIcon />
              //     )}
              //   </Button>
              // )
            }
            {themeColors.map(colorObj => (
              <Button
                key={colorObj.name}
                className={classes.colorButton}
                onClick={() => changeColorHandler(colorObj)}
                style={{ backgroundColor: colorObj.code }}
              >
                {colorObj.name === defaultColor.name && (
                  <CheckIcon />
                )}
              </Button>
            ))}
          </Box>
          <Box className={classes.colorPicker}>
            <SketchPicker
              color={defaultColor.code || pickerColor}
              presetColors={themeColors.map(colorObj => colorObj.code)}
              disableAlpha
              width="100%"
              onChange={colorCode => colorPickerHandler(colorCode.hex)}
            />
          </Box>
          <Box className={classes.defaultLinksColorContainer}>
            <Typography className={classes.defaultLinksCheckboxText} component="p" variant="body1">
              Use profile color as background
            </Typography>
            <Switch
              checked={defaultLinksToTheme}
              onChange={() => setColorAsDefault()}
              name="defaultColor"
            />
          </Box>
        </Box>
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

EditInvitations.defaultProps = {
  patch: null,
  dialogOpen: false,
}

EditInvitations.propTypes = {
  patch: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  updateInvitationList: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(EditInvitations)
