import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Typography from '@material-ui/core/Typography'

import CheckIcon from '@material-ui/icons/Check'
import ColorPicker from 'material-ui-color-picker'

import PageTitle from '../../layout/PageTitle'
import InfoBox from '../Ui/InfoBox'

import { useLanguage } from '../../hooks/useLang'

import { themeStyles } from './styles'

const Theme = ({
  theme, layout, themeColors, changeTheme, changeLayout, changeColor, color, pickerColor, pickColor,
}) => {
  const classes = themeStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings

  return (
    <Box className={classes.themeContainer}>
      <PageTitle title={pageStatics.data.titles.themeTab} />
      <Box mb={3}>
        <InfoBox infoList={[pageStatics.messages.info.theme.first]} />
      </Box>
      <Grid container spacing={3}>
        <Box className={classes.layoutSwitchContainer}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Typography variant="body1" component="p" className={classes.settingsTitle}>
                {pageStatics.data.titles.profileLayout}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <ButtonGroup disableElevation variant="contained" color="primary" className={classes.toggleThemeButtonGroup}>
                <Button disabled={layout === 'business'} onClick={() => changeLayout()}>{pageStatics.buttons.businessStyleTheme}</Button>
                <Button disabled={layout === 'social'} onClick={() => changeLayout()}>{pageStatics.buttons.socialStyleTheme}</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.themeSwitchContainer}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Typography variant="body1" component="p" className={classes.settingsTitle}>
                {pageStatics.data.titles.defaultTheme}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              <ButtonGroup disableElevation variant="contained" color="primary" className={classes.toggleThemeButtonGroup}>
                <Button disabled={theme === 'light'} onClick={() => changeTheme()}>{pageStatics.buttons.lightTheme}</Button>
                <Button disabled={theme === 'dark'} onClick={() => changeTheme()}>{pageStatics.buttons.darkTheme}</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>

        <Box className={classes.colorSwitchContainer}>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Typography variant="body1" component="p" className={classes.settingsTitle}>
                {pageStatics.data.titles.defaultColor}
              </Typography>
            </Grid>
            <Grid item md={6} xs={12}>
              {themeColors.map(colorObj => (
                <Button
                  key={colorObj.name}
                  className={classes.colorButton}
                  onClick={() => changeColor(colorObj)}
                  style={{ backgroundColor: colorObj.code }}
                >
                  {colorObj.name === color.color.name && (
                    <CheckIcon />
                  )}
                </Button>
              ))}
              <Box
                className={classes.colorPickerContainer}
                style={{
                  backgroundColor: color.color.name === 'picker' && color.color.code,
                }}
              >
                <ColorPicker
                  name="color"
                  defaultValue={pageStatics.buttons.colorPicker}
                  value={pickerColor}
                  disabled
                  onChange={colorCode => pickColor(colorCode)}
                />
                {color.color.name === 'picker' && (
                  <Box className={classes.pickerIcon}>
                    <CheckIcon />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  )
}

Theme.defaultProps = {
  theme: null,
  layout: null,
  themeColors: null,
  color: null,
  pickerColor: null,
}

Theme.propTypes = {
  theme: PropTypes.string,
  layout: PropTypes.string,
  themeColors: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  changeTheme: PropTypes.func.isRequired,
  changeLayout: PropTypes.func.isRequired,
  changeColor: PropTypes.func.isRequired,
  pickColor: PropTypes.func.isRequired,
  color: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  pickerColor: PropTypes.string,
}

export default Theme
