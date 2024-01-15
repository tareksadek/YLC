import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'

import CheckIcon from '@material-ui/icons/Check'

import { SketchPicker } from 'react-color'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import PageTitle from '../../layout/PageTitle'

import { customIcons } from '../../utilities/utils'
import {
  SocialLayoutIcon, BusinessLayoutIcon, BasicLayoutIcon,
} from '../../layout/CustomIcons'

import { themeColors } from '../../utilities/appVars'

import {
  getCardById, setCardSettings,
} from '../../API/cards'
import { setUserSettings } from '../../API/users'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles, formStyles } from '../../theme/layout'
import { themeStyles } from '../../containers/Settings/styles'

const EditDesign = ({
  closeDialog, dialogOpen, onSetNotification, userId,
}) => {
  const color = useColor()
  const classes = themeStyles()
  const layoutClasses = layoutStyles()
  const formClasses = formStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings

  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingSettings)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [pickerColor, setPickerColor] = useState('#000')
  const [defaultLinksChanged, setDefaultLinksChanged] = useState(false)
  const [theme, setTheme] = useState(null)
  const [layout, setLayout] = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const [defaultLinksToTheme, setDefaultLinksToTheme] = useState(false)
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    let mounted = true

    if (mounted && userId) {
      (async () => {
        try {
          setLoading(true)
          const data = await getCardById(userId)
          setUserInfo(data)
          setTheme(data.settings.theme)
          setLayout(data.settings.layout)
          setSelectedColor(data.settings.selectedColor)
          setDefaultLinksToTheme(data.defaultLinksToTheme)
          setLoading(false)
        } catch (err) {
          throw new Error(err)
        }
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const cleanClose = () => {
    closeDialog()
  }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoading(true)

    try {
      setLoadingMessage(pageStatics.messages.loading.savingSettings)
      await setUserSettings(userId, {
        theme,
        selectedColor,
        layout,
      })

      await setCardSettings(userId, {
        theme,
        selectedColor,
        layout,
      }, defaultLinksToTheme)
      setLoading(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileInfoUpdateSuccess,
        type: 'success',
      })

      cleanClose()
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.profileInfoUpdateError,
        type: 'error',
      })
    }
  }

  const changeThemeHandler = () => {
    setTheme(prevState => (prevState === 'light' ? 'dark' : 'light'))
    setSettingsSaved(false)
  }

  const changeColorHandler = colorObj => {
    setSelectedColor(colorObj)
    setSettingsSaved(false)
  }

  const colorPickerHandler = colorCode => {
    setPickerColor(colorCode)
    const colorObj = {
      name: 'picker',
      code: colorCode,
    }
    setSelectedColor(colorObj)
    setSettingsSaved(false)
  }

  const setColorAsDefault = () => {
    setDefaultLinksToTheme(prevState => !prevState)
    setSettingsSaved(false)
    setDefaultLinksChanged(true)
  }

  const changeLayoutHandler = layoutMode => {
    setLayout(layoutMode)
    setSettingsSaved(false)
  }

  const settingsLayout = userInfo && userInfo.settings && userInfo.settings.layout ? userInfo.settings.layout : 'social'
  const disabledButton = userInfo && userInfo.settings && (userInfo.settings.selectedColor.code === color.color.code) && (userInfo.settings.theme === theme) && (settingsLayout === layout) && !defaultLinksChanged
  const buttonDisabled = (userInfo && !userInfo.settings) || disabledButton || settingsSaved || loading

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={cleanClose}
      title={`${userInfo && userInfo.firstName ? userInfo.firstName : ''} ${userInfo && userInfo.lastName ? userInfo.lastName : ''} Design`}
      loading={false}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => updateInfoHandler(e)}
          disabled={buttonDisabled}
          className={buttonClasses.defaultButton}
          style={{
            backgroundColor: !buttonDisabled && color,
          }}
        >
          {pageStatics.buttons.saveTheme}
        </Button>
      )}
    >
      <Box>
        {loading ? (
          <LoadingBackdrop loadingText={loadingMessage} />
        ) : (
          <Box>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle title={pageStatics.data.titles.profileLayout} />
              <Box className={classes.layoutButtonsContainer}>
                <Button onClick={() => changeLayoutHandler('social')} className={layout === 'social' ? classes.selectedLayout : ''} disabled={loading}>
                  <SocialLayoutIcon
                    fill="#bbb"
                    background={theme === 'dark' ? '#272727' : '#fff'}
                    backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                    selectedcolor={selectedColor && selectedColor.code && (layout === 'social') ? selectedColor.code : '#bbb'}
                  />
                  <span className={classes.buttonText}>
                    {pageStatics.buttons.socialStyleTheme}
                  </span>
                </Button>
                <Button onClick={() => changeLayoutHandler('basic')} className={layout === 'basic' ? classes.selectedLayout : ''} disabled={loading}>
                  <BasicLayoutIcon
                    fill="#bbb"
                    background={theme === 'dark' ? '#272727' : '#fff'}
                    backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                    selectedcolor={selectedColor && selectedColor.code && layout === 'basic' ? selectedColor.code : '#bbb'}
                  />
                  <span className={classes.buttonText}>
                    {pageStatics.buttons.basicStyleTheme}
                  </span>
                </Button>
                <Button onClick={() => changeLayoutHandler('business')} className={layout === 'business' ? classes.selectedLayout : ''} disabled={loading}>
                  <BusinessLayoutIcon
                    fill="#bbb"
                    background={theme === 'dark' ? '#272727' : '#fff'}
                    backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                    selectedcolor={selectedColor && selectedColor.code && layout === 'business' ? selectedColor.code : '#bbb'}
                  />
                  <span className={classes.buttonText}>
                    {pageStatics.buttons.businessStyleTheme}
                  </span>
                </Button>
              </Box>
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle title={pageStatics.data.titles.defaultTheme} />
              <Box className={classes.themeButtonsContainer}>
                <Button
                  className={`${classes.themeButton} ${classes.lightThemeButton} ${theme === 'light' ? classes.selectedTheme : ''}`}
                  onClick={() => changeThemeHandler()}
                  disabled={loading}
                >
                  <CheckIcon />
                </Button>
                <Button
                  className={`${classes.themeButton} ${classes.darkThemeButton} ${theme === 'dark' ? classes.selectedTheme : ''}`}
                  onClick={() => changeThemeHandler()}
                  disabled={loading}
                >
                  <CheckIcon />
                </Button>
              </Box>
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle title={pageStatics.data.titles.defaultColor} info={pageStatics.data.titles.defaultColorSubtitle} />
              <Box className={classes.colorButtonsContainer}>
                {themeColors.map(colorObj => (
                  <Button
                    key={colorObj.name}
                    className={classes.colorButton}
                    onClick={() => changeColorHandler(colorObj)}
                    style={{ backgroundColor: colorObj.code, border: colorObj.name === 'black' ? '1px solid #fff' : 'none' }}
                    disabled={loading}
                  >
                    {selectedColor && selectedColor.name === colorObj.name && (
                      <CheckIcon />
                    )}
                  </Button>
                ))}
              </Box>
              <Box className={`${classes.colorPicker} ${loading ? classes.colorPickerDisabled : ''}`}>
                <PageTitle title="" info={pageStatics.data.titles.defaultColorSubtitleTwo} />
                <SketchPicker
                  color={color.color.code || pickerColor}
                  presetColors={themeColors.map(colorObj => colorObj.code)}
                  disableAlpha
                  width="100%"
                  onChange={colorCode => colorPickerHandler(colorCode.hex)}
                />
              </Box>
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle title={pageStatics.data.titles.iconsColor} />
              <Box className={formClasses.switchContainer}>
                <Typography variant="body1" component="p" className={formClasses.switchLabel}>
                  {pageStatics.forms.socialLinks.defaultLinksToTheme}
                </Typography>
                <Box className={formClasses.formSwitch}>
                  <Switch
                    checked={userInfo && userInfo.defaultLinksToTheme ? userInfo.defaultLinksToTheme : false}
                    onChange={() => setColorAsDefault()}
                    name="defaultColor"
                    disabled={loading}
                  />
                </Box>
              </Box>
              <Box className={classes.socialIconsContainer}>
                <Box className={classes.socialIconItem} style={{ background: userInfo && userInfo.defaultLinksToTheme ? color.color.code : '#3b5998' }}>
                  {customIcons('facebook', 'primary', 'small', null, {
                    color: '#ffffff',
                    fontSize: 20,
                    stroke: 'none',
                  })}
                </Box>
                <Box
                  className={classes.socialIconItem}
                  style={{ background: userInfo && userInfo.defaultLinksToTheme ? color.color.code : 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' }}
                >
                  {customIcons('instagram', 'primary', 'small', null, {
                    color: '#ffffff',
                    fontSize: 20,
                    stroke: 'none',
                  })}
                </Box>
                <Box className={classes.socialIconItem} style={{ background: userInfo && userInfo.defaultLinksToTheme ? color.color.code : '#00acee' }}>
                  {customIcons('twitter', 'primary', 'small', null, {
                    color: '#ffffff',
                    fontSize: 20,
                    stroke: 'none',
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

EditDesign.defaultProps = {
  dialogOpen: false,
  userId: null,
}

EditDesign.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

export default EditDesign
