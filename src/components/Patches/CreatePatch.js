import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import { SketchPicker } from 'react-color'

import CheckIcon from '@material-ui/icons/Check'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import PageTitle from '../../layout/PageTitle'

import FormElement from '../Ui/FormElement'

import { createUserDialog } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import {
  SocialLayoutIcon, BusinessLayoutIcon, BasicLayoutIcon, DefaultLayoutIcon,
} from '../../layout/CustomIcons'

import { generatePatchCode, addPatchMaster } from '../../API/invitationPatches'
import { generateInvitaionCode } from '../../API/invitations'
// import { getAllPackages } from '../../API/subscriptions'

import { useLanguage } from '../../hooks/useLang'

import { themeColors } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const CreatPatch = ({
  closeDialog, dialogOpen, onSetNotification, reloadPatches, products,
}) => {
  const classes = createUserDialog()
  const buttonClasses = buttonStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.patches
  const [loading, setLoading] = useState(false)
  const [patchFormValid, setPatchFormValid] = useState(false)
  const [patchForm, setpatchForm] = useState({
    title: createFormElementObj('input', 'Batch Title',
      { type: 'text', name: 'title', placeholder: 'Batch Title' }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    invitationsNumber: createFormElementObj('input', 'Number of invitations',
      { type: 'number', name: 'invitationsNumber', placeholder: 'Number of invitations' }, 6, null, { required: true }, true,
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
    invitationType: createFormElementObj('select', 'Package', { name: 'package' }, 'default', [
      { value: 'default', display: 'Default' },
      { value: 'bypass', display: 'Bypass' },
    ], { required: true }, true, {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
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
  // const [products, setProducts] = useState(null)
  const [selectedProductId, setSelectedProductId] = useState(null)

  useEffect(() => {
    setSelectedProductId(products && products.length > 0 ? products[0].id : null)
  }, [products])

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
    setpatchForm(adjustedForm.adjustedForm)
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

  const createPatchHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const themeObj = {
      layout: defaultLayout,
      selectedColor: defaultColor,
      theme: defaultTheme,
      defaultLinksToTheme,
    }
    const patchDetails = createFormValuesObj(patchForm)
    patchDetails.package = 'master'
    // patchDetails.invitationsNumber = 1
    const storeObj = {
      logo: patchDetails.logo && patchDetails.logo !== '' ? patchDetails.logo : null,
      logoLink: patchDetails.logoLink && patchDetails.logoLink !== '' ? patchDetails.logoLink : null,
      storeButtonText: patchDetails.storeButtonText && patchDetails.storeButtonText !== '' ? patchDetails.storeButtonText : null,
      storeButtonLink: patchDetails.storeButtonLink && patchDetails.storeButtonLink !== '' ? patchDetails.storeButtonLink : null,
    }
    const alwaysPro = patchDetails.invitationType === 'bypass'
    const patchObj = await generatePatchCode(patchDetails.title, patchDetails.package, patchDetails.invitationsNumber, selectedProductId, themeObj, storeObj, alwaysPro)
    let invitationCodeObj
    let invitationPackage
    let masterInvitationId = null
    for (let i = 1; i <= patchDetails.invitationsNumber; i += 1) {
      invitationPackage = patchDetails.package === 'master' && i === 1 ? 'master' : 'single'
      try {
        /* eslint-disable no-await-in-loop */
        invitationCodeObj = await generateInvitaionCode(patchDetails.package, patchObj.patchId, invitationPackage, null, masterInvitationId, themeObj, storeObj, selectedProductId, alwaysPro)
        masterInvitationId = (patchDetails.package === 'master' && i === 1) ? invitationCodeObj.code.substring(0, invitationCodeObj.code.indexOf('_')) : masterInvitationId
      } catch (err) {
        closeDialog()
        onSetNotification({
          message: `There was a problem creating new batch. ${err.message}`,
          type: 'error',
        })
      }
    }

    if (masterInvitationId) {
      await addPatchMaster(patchObj.patchId, masterInvitationId)
    }

    await reloadPatches()
    closeDialog()
    onSetNotification({
      message: 'Batch created successfully.',
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

  const selectInvitationProductHandler = prod => {
    setSelectedProductId(prod.id)
    setpatchForm(prevState => ({
      ...prevState,
      invitationsNumber: {
        ...prevState.invitationsNumber,
        value: prod.invitations,
      },
    }))
    setPatchFormValid(true)
  }

  return (
    <FullScreenDialog
      title={`${pageStatics.data.titles.createPatch}`}
      open={dialogOpen}
      onClose={() => closeDialog()}
      actionButtonOne={(
        <Button
          color="secondary"
          className={buttonClasses.defaultButton}
          onClick={e => createPatchHandler(e)}
          disabled={!patchFormValid || loading}
        >
          {pageStatics.buttons.createPatch}
        </Button>
      )}
    >
      {loading && <LoadingBackdrop placement="inset" loadingText="Creating batch..." boxed />}
      <Box className={classes.dialogContent}>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title="Product" />
          <Box>
            <List component="ul" aria-label="products">
              {products && products.length > 0 && products.map(product => (
                <ListItem className={classes.productsList} button key={product.id} onClick={() => selectInvitationProductHandler(product)}>
                  <ListItemIcon>
                    {product.id === selectedProductId ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={product.title} secondary={product.description} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title="Main info" />
          <Grid container spacing={3}>
            {loadPatchForm()}
          </Grid>
        </Box>
        {/* <Box className={`${layoutClasses.panel}`} style={{ display: 'none' }}>
          <PageTitle title="Product" />
          <Box>
            <List component="nav" aria-label="secondary mailbox folders">
              {products && products.length > 0 && products.map(product => (
                <ListItem button key={product.id} onClick={() => selectInvitationProductHandler(product.id)}>
                  <ListItemIcon>
                    {product.id === selectedProductId ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <RadioButtonUncheckedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={product.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box> */}
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title="Layout" />
          <Box className={classes.layoutButtonsContainer}>
            <Button onClick={() => changeLayoutHandler('social')} className={defaultLayout === 'social' ? classes.selectedLayout : ''}>
              <DefaultLayoutIcon
                fill="#bbb"
                background={defaultTheme === 'dark' ? '#272727' : '#fff'}
                backgroundrev={defaultTheme === 'dark' ? '#eee' : '#272727'}
                selectedcolor={defaultColor.code || '#bbb'}
              />
              <span className={classes.buttonText}>
                Default
              </span>
            </Button>
            <Button onClick={() => changeLayoutHandler('basic')} className={defaultLayout === 'basic' ? classes.selectedLayout : ''}>
              <BasicLayoutIcon
                fill="#bbb"
                background={defaultTheme === 'dark' ? '#272727' : '#fff'}
                backgroundrev={defaultTheme === 'dark' ? '#eee' : '#272727'}
                selectedcolor={defaultColor.code || '#bbb'}
              />
              <span className={classes.buttonText}>
                Card
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
            <Button onClick={() => changeLayoutHandler('square')} className={defaultLayout === 'square' ? classes.selectedLayout : ''}>
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
          </Box>
          {/* <Box className={classes.layoutButtonsContainer}>
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
          </Box> */}
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

CreatPatch.defaultProps = {
  dialogOpen: false,
  products: null,
}

CreatPatch.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  reloadPatches: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default connect(null, mapDispatchToProps)(CreatPatch)
