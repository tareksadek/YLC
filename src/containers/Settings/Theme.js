import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Prompt } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import CheckIcon from '@material-ui/icons/Check'

import { SketchPicker } from 'react-color'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import PageTitle from '../../layout/PageTitle'
import InfoBox from '../../components/Ui/InfoBox'
import SkeletonContainer from '../../layout/SkeletonContainer'
import Alert from '../../layout/Alert'

import { customIcons } from '../../utilities/utils'
import {
  SocialLayoutIcon, BusinessLayoutIcon, BasicLayoutIcon, DefaultLayoutIcon,
} from '../../layout/CustomIcons'

import { themeColors } from '../../utilities/appVars'

import { setUserSettings } from '../../API/users'
import { setCardSettings } from '../../API/cards'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles, formStyles } from '../../theme/layout'
import { themeStyles } from './styles'

import { useAuth } from '../../hooks/use-auth'
import { useColor, useDarkMode } from '../../hooks/useDarkMode'
import { useLayoutMode } from '../../hooks/useLayoutMode'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const Theme = ({
  cardData, onSetNotification, settings, toggleTheme, onToggleDefaultLinksToTheme, onToggleDrawer, switchLayout,
  onChangeThemeColor, onChangeTheme, onChangeLayout, activeProfileId,
}) => {
  const color = useColor()
  const { theme } = useDarkMode()
  const { layout } = useLayoutMode()
  const classes = themeStyles()
  const layoutClasses = layoutStyles()
  const formClasses = formStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings
  // const isPro = auth.isSubscriber && (auth.subscriberStatus === 'active' || auth.subscriberStatus === 'trialing')
  // const isMaster = auth.accountType === 'master'
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingSettings)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [pickerColor, setPickerColor] = useState('#000')
  const [defaultLinksChanged, setDefaultLinksChanged] = useState(false)
  // const [proDialogOpen, setProDialogOpen] = useState(window.location.hash === '#becomepro')

  // useEffect(() => {
  //   let mounted = true
  //   if ((!settings && mounted) || !isTheLoggedinUser) {
  //     (async () => {
  //       await onLoadCard(auth.user.uid)
  //     })()
  //   }

  //   return () => { mounted = false }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [onLoadCard, auth.user.uid, isTheLoggedinUser])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  // useEffect(() => {
  //   const onHashChange = () => {
  //     setProDialogOpen(window.location.hash === '#becomepro')
  //   }
  //   window.addEventListener('hashchange', onHashChange)
  //   return () => window.removeEventListener('hashchange', onHashChange)
  // }, [])

  // const closeProDialogHandler = () => {
  //   window.history.back()
  // }

  // const openProDialogHandler = () => {
  //   window.location.hash = '#becomepro'
  // }

  // useEffect(() => {
  //   let mounted = true
  //
  //   if (mounted) {
  //     (async () => {
  //       if (auth.accountType === 'master' && invitationCode) {
  //         await onLoadTeamMembers(invitationCode)
  //       }
  //     })()
  //   }
  //
  //   return () => { mounted = false }
  // }, [auth.accountType, onLoadTeamMembers, invitationCode])

  // const timer = ms => new Promise(res => setTimeout(res, ms))

  // const updateTeamData = async dataFromMaster => {
  //   for (let i = 0; i < teamMembers.length; i += 1) {
  //     try {
  //       /* eslint-disable no-await-in-loop */
  //       setLoadingDone(false)
  //       await timer(1000)
  //       setLoadingMessage(`${pageStatics.messages.loading.updatingTeamMember.first} ${i + 1} ${pageStatics.messages.loading.updatingTeamMember.second} ${teamMembers.length}`)
  //
  //       await setUserSettings(teamMembers[i].userId, {
  //         theme: dataFromMaster.theme,
  //         selectedColor: dataFromMaster.selectedColor,
  //         layout: dataFromMaster.layout,
  //       })
  //       await setCardSettings(teamMembers[i].userId, {
  //         theme: dataFromMaster.theme,
  //         selectedColor: dataFromMaster.selectedColor,
  //         layout: dataFromMaster.layout,
  //       }, dataFromMaster.defaultLinksToTheme)
  //       setLoadingDone(true)
  //       await timer(1000)
  //     } catch (err) {
  //       onSetNotification({
  //         message: pageStatics.messages.notifications.settingsSavedError,
  //         type: 'error',
  //       })
  //     }
  //   }
  // }

  const saveSettings = async () => {
    setLoadingMessage(pageStatics.messages.loading.savingSettings)
    setLoadingDone(false)
    setLoading(true)
    try {
      if (activeProfileId === auth.user.uid) {
        await setUserSettings(activeProfileId, {
          theme,
          selectedColor: color.color,
          layout,
          drawerEnabeled: settings.drawerEnabeled || false,
        })
      }
      await setCardSettings(activeProfileId || auth.user.uid, {
        theme,
        selectedColor: color.color,
        layout,
        drawerEnabeled: settings.drawerEnabeled || false,
      }, cardData.defaultLinksToTheme)
      // if (isMaster) {
      //   await setTeamSettings(auth.user.uid, {
      //     theme,
      //     selectedColor: color.color,
      //     layout,
      //   }, defaultLinksToTheme)
      // }
      onChangeThemeColor(color.color.code, color.color.name)
      onChangeTheme(theme)
      onChangeLayout(layout)

      setLoadingDone(true)
      setSettingsSaved(true)
      onSetNotification({
        message: pageStatics.messages.notifications.settingsSavedSuccess,
        type: 'success',
      })
      setTimeout(() => setLoading(false), 1000)
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.settingsSavedError,
        type: 'error',
      })
    }
  }

  const changeThemeHandler = () => {
    toggleTheme()
    setSettingsSaved(false)
  }

  const changeColorHandler = colorObj => {
    color.switchColor(colorObj)
    setSettingsSaved(false)
  }

  const colorPickerHandler = colorCode => {
    setPickerColor(colorCode)
    const colorObj = {
      name: 'picker',
      code: colorCode,
    }
    color.switchColor(colorObj)
    setSettingsSaved(false)
  }

  const setColorAsDefault = () => {
    onToggleDefaultLinksToTheme()
    setSettingsSaved(false)
    setDefaultLinksChanged(true)
  }

  const toggleDrawerHandler = () => {
    onToggleDrawer()
    setSettingsSaved(false)
    setDefaultLinksChanged(true)
  }

  const changeLayoutHandler = layoutMode => {
    switchLayout(layoutMode)
    setSettingsSaved(false)
  }

  const settingsLayout = settings && settings.layout ? settings.layout : 'social'
  const disabledButton = settings && (settings.selectedColor.code === color.color.code) && (settings.theme === theme) && (settingsLayout === layout) && !defaultLinksChanged
  const buttonDisabled = !settings || disabledButton || settingsSaved || loading

  if (!cardData.userId || cardData.loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.teamTheme}>
          <Box>
            <InfoBox infoList={[
              pageStatics.messages.info.teamTheme.first,
              // ...auth.accountType === 'master' ? [pageStatics.messages.info.theme.master] : [],
            ]}
            />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'rect', fullWidth: true, height: 100 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
              ]}
              />
            </Box>
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />}
      <Prompt
        when={!buttonDisabled}
        message={pageStatics.messages.notifications.savePrompt}
      />
      <Header title={pageStatics.data.titles.teamTheme}>
        <Box>
          <InfoBox infoList={[
            pageStatics.messages.info.teamTheme.first,
            // ...auth.accountType === 'master' ? [pageStatics.messages.info.theme.master] : [],
          ]}
          />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle title={pageStatics.data.titles.profileLayout} />
            <Box className={classes.layoutButtonsContainer}>
              <Button onClick={() => changeLayoutHandler('social')} className={layout === 'social' ? classes.selectedLayout : ''} disabled={loading}>
                <DefaultLayoutIcon
                  fill="#bbb"
                  background={theme === 'dark' ? '#272727' : '#fff'}
                  backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                  selectedcolor={color.color.code && (layout === 'social') ? color.color.code : '#bbb'}
                />
                <span className={classes.buttonText}>
                  {pageStatics.buttons.defaultStyleTheme}
                </span>
              </Button>
              <Button onClick={() => changeLayoutHandler('basic')} className={layout === 'basic' ? classes.selectedLayout : ''} disabled={loading}>
                <BasicLayoutIcon
                  fill="#bbb"
                  background={theme === 'dark' ? '#272727' : '#fff'}
                  backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                  selectedcolor={color.color.code && layout === 'basic' ? color.color.code : '#bbb'}
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
                  selectedcolor={color.color.code && layout === 'business' ? color.color.code : '#bbb'}
                />
                <span className={classes.buttonText}>
                  {pageStatics.buttons.businessStyleTheme}
                </span>
              </Button>
              <Button onClick={() => changeLayoutHandler('square')} className={layout === 'square' ? classes.selectedLayout : ''} disabled={loading}>
                <SocialLayoutIcon
                  fill="#bbb"
                  background={theme === 'dark' ? '#272727' : '#fff'}
                  backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                  selectedcolor={color.color.code && layout === 'square' ? color.color.code : '#bbb'}
                />
                <span className={classes.buttonText}>
                  {pageStatics.buttons.socialStyleTheme}
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
                  {colorObj.name === color.color.name && (
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
            <PageTitle title={pageStatics.data.titles.drawer} />
            <Box mt={2}>
              <Alert
                description={pageStatics.messages.notifications.drawer.body}
                type="info"
              />
            </Box>
            <Box className={formClasses.switchContainer}>
              <Typography variant="body1" component="p" className={formClasses.switchLabel}>
                {pageStatics.forms.drawer}
              </Typography>
              <Box className={formClasses.formSwitch}>
                <Switch
                  checked={settings.drawerEnabeled}
                  onChange={() => toggleDrawerHandler()}
                  name="drawer"
                  disabled={loading}
                />
              </Box>
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
                  checked={cardData.defaultLinksToTheme}
                  onChange={() => setColorAsDefault()}
                  name="defaultColor"
                  disabled={loading}
                />
              </Box>
            </Box>
            <Box className={classes.socialIconsContainer}>
              <Box className={classes.socialIconItem} style={{ background: cardData.defaultLinksToTheme ? color.color.code : '#3b5998' }}>
                {customIcons('facebook', 'primary', 'small', null, {
                  color: '#ffffff',
                  fontSize: 20,
                  stroke: 'none',
                })}
              </Box>
              <Box className={classes.socialIconItem} style={{ background: cardData.defaultLinksToTheme ? color.color.code : 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)' }}>
                {customIcons('instagram', 'primary', 'small', null, {
                  color: '#ffffff',
                  fontSize: 20,
                  stroke: 'none',
                })}
              </Box>
              <Box className={classes.socialIconItem} style={{ background: cardData.defaultLinksToTheme ? color.color.code : '#00acee' }}>
                {customIcons('twitter', 'primary', 'small', null, {
                  color: '#ffffff',
                  fontSize: 20,
                  stroke: 'none',
                })}
              </Box>
            </Box>
          </Box>
          <Box className={classes.settingsButtonsContainer}>
            <Button
              className={buttonClasses.defaultButton}
              onClick={() => saveSettings()}
              style={{
                backgroundColor: (settings && (!disabledButton && !settingsSaved)) && color.color.code,
                minWidth: '250px',
              }}
              disabled={buttonDisabled}
            >
              {pageStatics.buttons.updateProfileDesign}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  settings: state.cards.settings,
  cardData: state.cards,
  activeProfileId: state.profiles.activeProfileId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onToggleDefaultLinksToTheme: () => dispatch(actions.defaultLinks()),
  onToggleDrawer: () => dispatch(actions.toggleDrawer()),
  onChangeThemeColor: (code, name) => dispatch(actions.changeThemeColor(code, name)),
  onChangeTheme: theme => dispatch(actions.changeTheme(theme)),
  onChangeLayout: layout => dispatch(actions.changeLayout(layout)),
})

Theme.defaultProps = {
  settings: null,
  cardData: null,
  activeProfileId: null,
}

Theme.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  // onLoadCard: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  onToggleDefaultLinksToTheme: PropTypes.func.isRequired,
  onToggleDrawer: PropTypes.func.isRequired,
  settings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // switchTheme: PropTypes.func.isRequired,
  switchLayout: PropTypes.func.isRequired,
  onChangeThemeColor: PropTypes.func.isRequired,
  onChangeTheme: PropTypes.func.isRequired,
  onChangeLayout: PropTypes.func.isRequired,
  activeProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Theme)
