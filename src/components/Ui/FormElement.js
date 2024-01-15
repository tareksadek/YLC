import React, { useState } from 'react'

import PropTypes from 'prop-types'

import ImageUploader from 'react-images-upload'

import MuiPhoneNumber from 'mui-phone-input-ssr'

import ReactPlayer from 'react-player'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormHelperText from '@material-ui/core/FormHelperText'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Slider from '@material-ui/core/Slider'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import Autocomplete from '@material-ui/lab/Autocomplete'
import ChipInput from 'material-ui-chip-input'

import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import { DatePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsAdapter from '@date-io/date-fns'
import { isValid } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

const FormElement = ({
  valid,
  shouldValidate,
  touched,
  errorMessage,
  value,
  changed,
  blured,
  elementSetup,
  label,
  elementOptions,
  elementType,
  grid,
  disabled,
  formElementSpacing,
}) => {
  const color = useColor()

  const [showPassword, setShowPassword] = useState(false)
  const formStyles = makeStyles(theme => ({
    input: {
      width: '100%',
      boxSizing: 'border-box',
      padding: theme.spacing(1),
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '8px',
      display: 'block',
    },
    formElementContainer: {
      marginBottom: theme.spacing(1),
    },
    inputEl: {
      outline: 'none',
      display: 'block',
      width: '100%',
      boxSizing: 'border-box',
      color: theme.palette.background.lighter,
      fontSize: '16px',
      '&:placeholder': {
        fontSize: '0.9rem',
      },
      '& textarea': {
        color: theme.palette.background.reverse,
        fontSize: '16px',
      },
      '&.Mui-focused': {
        color: color.color.code,
      },
      '&.Invalid': {
        borderColor: '#dd0000',
      },
      '&:focus': {
        outline: 'none',
        backgroundColor: '#ccc',
        fontSize: '16px',
      },
      '& label': {
        color: theme.palette.background.lighter,
        fontSize: '0.9rem',
        '&.Mui-focused': {
          color: color.color.code,
        },
      },
      '& .MuiInput-underline': {
        '&.Mui-error': {
          '&:after': {
            borderBottomColor: '#f44336',
          },
        },
        '&:after': {
          borderBottom: `1px solid ${color.color.code}`,
        },
        '&:before': {
          borderBottom: `1px solid ${theme.palette.background.darker}`,
        },
        '&:hover': {
          '&:not(.Mui-disabled)': {
            '&:before': {
              borderBottom: `1px solid ${color.color.code}`,
            },
          },
        },
        '&.Mui-disabled': {
          '&:before': {
            borderBottom: `1px dotted ${theme.palette.background.darker}`,
          },
        },
      },
      '& input': {
        color: theme.palette.background.reverse,
        fontSize: '16px',
        '&.Mui-disabled': {
          opacity: 0.5,
        },
      },
      '& .MuiInputBase-root': {
        width: '100%',
      },
      '& .MuiPhoneNumber-flag': {
        '&.undefined': {
          backgroundImage: 'url(/assets/images/flag.png) !important',
          backgroundPosition: 'center center',
          width: '16px',
          height: '16px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        },
      },
      '& .MuiChip-root': {
        backgroundColor: theme.palette.background.reverse,
        color: theme.palette.background.default,
        '& .MuiChip-deleteIcon': {
          color: '#d04343',
        },
      },
      '& .MuiInputAdornment-root': {
        '&.MuiInputAdornment-positionEnd': {
          position: 'absolute',
          right: 0,
        },
        '& p': {
          color: theme.palette.background.reverse,
          opacity: 0.6,
          fontSize: '0.9rem',
        },
      },
    },
    chipInputEl: {
      '& > div': {
        '&.Mui-error': {
          '&:after': {
            borderBottomColor: '#f44336',
          },
        },
        '&:after': {
          borderBottom: `1px solid ${color.color.code}`,
        },
        '&:before': {
          borderBottom: `1px solid ${theme.palette.background.darker}`,
        },
        '&:hover': {
          '&:not(.Mui-disabled)': {
            '&:before': {
              borderBottom: `1px solid ${color.color.code}`,
            },
          },
        },
        '&.Mui-disabled': {
          '&:before': {
            borderBottom: `1px dotted ${theme.palette.background.darker}`,
          },
        },
      },
    },
    hiddenInput: {
      display: 'block',
    },
    select: {
      color: theme.palette.background.reverse,
      fontSize: '0.9rem',
      '&.MuiInput-underline': {
        '&.Mui-error': {
          '&:after': {
            borderBottomColor: '#f44336',
          },
        },
        '&:after': {
          borderBottom: `1px solid ${color.color.code}`,
        },
        '&:before': {
          borderBottom: `1px solid ${theme.palette.background.darker}`,
        },
        '&:hover': {
          '&:not(.Mui-disabled)': {
            '&:before': {
              borderBottom: `1px solid ${color.color.code}`,
            },
          },
        },
        '&.Mui-focused': {
          '& .MuiSelect-icon': {
            color: color.color.code,
          },
        },
      },
      '& option': {
        color: '#272727',
        textTransform: 'capitalize',
      },
      '& ul': {
        backgroundColor: '#dd0000',
      },
      '& li': {
        fontSize: 12,
      },
      '& .MuiSelect-icon': {
        color: theme.palette.background.lighter,
      },
    },
    date: {
      color: theme.palette.background.reverse,
      '& input': {
        color: theme.palette.background.reverse,
        fontSize: '0.8rem',
      },
      '& label': {
        color: theme.palette.background.lighter,
        fontSize: '0.9rem',
        '&.Mui-focused': {
          color: color.color.code,
        },
      },
      '& .MuiInput-underline': {
        '&.Mui-error': {
          '&:after': {
            borderBottomColor: '#f44336',
          },
        },
        '&:before': {
          borderBottom: `1px solid ${theme.palette.background.darker}`,
        },
        '&:after': {
          borderBottom: `1px solid ${color.color.code}`,
        },
        '&:hover': {
          '&:not(.Mui-disabled)': {
            '&:before': {
              borderBottom: `1px solid ${color.color.code}`,
            },
          },
        },
      },
    },
    datePickerDialog: {
      color: theme.palette.background.reverse,
      '& .MuiPickersClock-clock': {
        backgroundColor: theme.palette.background.reverse,
        '& .MuiPickersClock-pin': {
          backgroundColor: theme.palette.background.default,
        },
        '& .MuiPickersClockPointer-pointer': {
          backgroundColor: theme.palette.background.default,
        },
        '& .MuiPickersClockNumber-clockNumber': {
          color: theme.palette.background.default,
          '&.MuiPickersClockNumber-clockNumberSelected': {
            fontWeight: 800,
          },
        },
      },
      '& .MuiPickersYear-root': {
        '&:focus': {
          color: '#272727',
        },
      },
      '& .MuiPickersDay-dayDisabled': {
        opacity: 0.5,
      },
      '& .MuiPickersYear-yearSelected': {
        color: color.color.code,
      },
      '& .MuiPickersMonth-monthSelected': {
        color: color.color.code,
      },
      '& .MuiPickersDay-day': {
        color: '#272727',
        '&.MuiPickersDay-daySelected': {
          color: '#272727',
          '& .MuiTypography-root': {
            fontWeight: 'bold',
            color: theme.palette.background.default,
          },
        },
      },
      '& .MuiPickersDay-daySelected': {
        color: color.color.code,
      },
      '& .MuiPickersModal-withAdditionalAction': {
        '& button': {
          color: color.color.code,
        },
      },
    },
    imageUploadLabel: {
      fontSize: '0.8rem',
      color: theme.palette.background.lighter,
    },
    imageUploadContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    },
    compactImageUploadContainer: {
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: '#272727',
      borderRadius: theme.spacing(1),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      textAlign: 'center',
    },
    imageUploadBoxEmpty: {},
    imageUploadBoxCrop: {},
    imageUploadBoxLight: {},
    imageUploadBoxDark: {},
    imageUploadBox: {
      flex: 1,
      minWidth: 200,
      color: theme.palette.background.reverse,
      marginTop: theme.spacing(2),
      '& .fileContainer': {
        backgroundColor: theme.palette.background.default,
        boxShadow: '0 0 0 transparent',
        alignItems: 'center',
        padding: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 0,
        '& .chooseFileButton': {
          color: `${theme.palette.background.reverse} !important`,
          backgroundColor: 'transparent !important',
          border: `1px solid ${theme.palette.background.reverse}`,
          textDecoration: 'none',
          textAlign: 'center',
          maxWidth: 'initial',
          width: 'auto',
          fontWeight: 600,
          marginBottom: 0,
          fontSize: '0.8rem !important',
          paddingLeft: theme.spacing(4),
          paddingRight: theme.spacing(4),
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        '& .uploadPicturesWrapper': {
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 100,
        },
        '& .uploadPictureContainer': {
          width: 100,
          borderRadius: '50%',
          margin: 0,
          border: 'none',
          boxShadow: '0 0 0 transparent',
          background: 'transparent',
          height: 100,
          display: 'flex',
          overflow: 'hidden',
          position: 'relative',
          fontSize: '1.25rem',
          alignItems: 'center',
          flexShrink: 0,
          lineHeight: 1,
          userSelect: 'none',
          justifyContent: 'center',
          '& img': {
            '&.uploadPicture': {
              width: 100,
              objectFit: 'cover',
            },
          },
        },
        '& .deleteImage': {
          top: 'auto',
          bottom: 5,
          left: 0,
          right: 0,
          margin: 'auto',
          width: 25,
          height: 25,
          fontSize: '15px',
          lineHeight: '25px',
        },
        ['@media (max-width:380px)']: { // eslint-disable-line no-useless-computed-key
          justifyContent: 'center',
        },
      },
      '&$imageUploadBoxEmpty': {
        '& .fileContainer': {
          justifyContent: 'center',
          '& .chooseFileButton': {
            maxWidth: 220,
            margin: 0,
          },
        },
      },
      '&$imageUploadBoxCrop': {
        '& .fileContainer': {
          justifyContent: 'center',
          '& .chooseFileButton': {
            maxWidth: 220,
            margin: 0,
          },
        },
      },
      '&$imageUploadBoxLight': {
        '& .fileContainer': {
          backgroundColor: 'transparent',
          '& .chooseFileButton': {
            color: `${theme.palette.background.reverse} !important`,
            backgroundColor: 'transparent !important',
            border: `1px solid ${theme.palette.background.reverse} !important`,
          },
        },
      },
      '&$imageUploadBoxDark': {
        '& .fileContainer': {
          backgroundColor: '#272727',
          '& .chooseFileButton': {
            color: '#fff !important',
            backgroundColor: 'transparent !important',
            border: '1px solid #fff',
          },
        },
      },
    },
    imageUploadAvatar: {
      width: 100,
      height: 100,
      cursor: 'pointer',
    },
    rtlInput: {
      textAlign: 'right',
      paddingRight: 0,
      '& .MuiInputLabel-shrink': {
        transformOrigin: 'top right',
        fontFamily: theme.fonts.arabic,
      },
      '&.MuiInputLabel-shrink': {
        transformOrigin: 'top right',
        fontFamily: 'Cairo',
      },
      '& .MuiInputLabel-formControl': {
        left: 'auto',
        right: 0,
        fontFamily: 'Cairo',
      },
      '& .MuiFormHelperText-root': {
        textAlign: 'right',
        fontFamily: theme.fonts.arabic,
      },
      '& .MuiSelect-select': {
        paddingRight: 0,
      },
      '& .MuiSelect-icon': {
        right: 'auto',
        left: 0,
      },
    },
    rtlLabel: {
      textAlign: 'right',
      fontFamily: 'Cairo',
    },
    formLabel: {
      marginRight: 0,
      '& .MuiTypography-body1': {
        fontSize: '0.8rem',
        lineHeight: '1.3rem',
      },
      '& svg': {
        stroke: theme.palette.background.reverse,
      },
    },
    sliderRoot: {
      backgroundColor: theme.palette.background.reverse,
    },
    sliderTrack: {
      backgroundColor: color.color.code,
    },
    sliderRail: {
      backgroundColor: theme.palette.background.default,
    },
    sliderThumb: {
      backgroundColor: color.color.code,
    },
    sliderMark: {
      backgroundColor: color.color.code,
    },
    valueLabel: {
      '& .PrivateValueLabel-circle-179': {
        backgroundColor: color.color.code,
        '& .PrivateValueLabel-label-180': {
          color: theme.palette.background.reverse,
        },
      },
    },
    markLabel: {
      backgroundColor: color.color.code,
    },
    arabicFont: {
      fontFamily: theme.fonts.arabic,
    },
    togglePasswordVisibility: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 'auto',
      color: color.color.code,
      '& svg': {
        fontSize: 20,
      },
    },
    disabledInput: {
      '& .Mui-disabled': {
        color: '#888',
      },
    },
    disabledIcon: {
      color: '#888',
      cursor: 'default',
      backgroundColor: 'transparent !important',
      '& .MuiTouchRipple-root': {
        display: 'none',
      },
    },
    phoneInput: {
      '& .MuiFormLabel-root.Mui-error': {
        color: theme.palette.background.lighter,
      },
      '& .MuiInput-underline': {
        '&.Mui-error': {
          '&:after': {
            borderBottomColor: color.color.code,
          },
        },
      },
    },
    videoContainer: {
      width: '100%',
      height: 300,
      marginTop: theme.spacing(3),
      backgroundColor: theme.palette.background.lighter,
      borderRadius: theme.spacing(2),
      position: 'relative',
      overflow: 'hidden',
      '& p': {
        color: theme.palette.background.default,
        opacity: 0.6,
        position: 'absolute',
        width: 210,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        margin: 'auto',
        textAlign: 'center',
        height: 50,
        '& b': {
          display: 'block',
        },
      },
      '& div': {
        position: 'relative',
        zIndex: 2,
      },
    },
    videoSupport: {
      fontSize: '0.7rem',
      opacity: 0.5,
      color: theme.palette.background.reverse,
    },
    radioGroupContainer: {
      opacity: 0.6,
      '& label': {
        '& .MuiRadio-root': {
          color: theme.palette.background.reverse,
          fontSize: '0.8rem',
        },
        '& .MuiTypography-root': {
          fontSize: '0.8rem',
        },
      },
    },
    radioGroupLabel: {
      color: theme.palette.background.reverse,
      fontSize: '0.8rem',
      fontWeight: 600,
      marginTop: theme.spacing(2),
    },
    help: {
      color: theme.palette.background.helpColor,
      fontSize: '0.7rem',
      opacity: 0.6,
      backgroundColor: theme.palette.background.helpBackground,
      padding: theme.spacing(0.5),
      borderRadius: theme.spacing(0.5),
      marginTop: theme.spacing(0.5),
      display: 'flex',
      alignItems: 'flex-start',
      lineHeight: '1.2rem',
      '& svg': {
        color: theme.palette.background.helpColor,
        marginRight: theme.spacing(0.5),
        marginLeft: theme.spacing(0.5),
        marginTop: theme.spacing(0.5),
        fontSize: '0.8rem',
      },
    },
    checkboxGroupLabel: {
      color: theme.palette.background.lighter,
      fontSize: '0.8rem',
    },
  }))
  const classes = formStyles()
  const language = useLanguage()
  const createSelectOptions = opts => opts
    .map((opt, i) => <option key={opt + i} value={opt.value} className={language.direction === 'rtl' ? classes.arabicFont : ''}>{opt.display}</option>)

  const createSelectOptionsSorted = opts => opts
    .sort((a, b) => {
      if (a.value > b.value) {
        return 1
      }
      if (b.value > a.value) {
        return -1
      }
      return 0
    }).map((opt, i) => <option key={opt + i} value={opt.value} className={language.direction === 'rtl' ? classes.arabicFont : ''}>{opt.display}</option>)

  let inputEl = null
  let chipsArray = []
  const inputClasses = !valid && shouldValidate && touched ? `${classes.inputEl} ${classes.Invalid}` : classes.inputEl
  const rtlClass = language.direction === 'rtl' ? classes.rtlInput : ''

  const dateFns = new DateFnsAdapter()
  let dateValue = null

  const togglePasswordVisiblityHandler = isDisabled => {
    if (!isDisabled) {
      setShowPassword(prevState => !prevState)
    }
  }

  const clickUpload = () => {
    const el = document.getElementsByClassName('chooseFileButton')
    el[0].click()
  }

  const imageUploadValue = value === 'data:null;base64,null' ? null : value

  const createCheckboxGroupOptions = (opts, val) => {
    let checkedValues = null
    if (val && val !== '' && val.length > 0) {
      checkedValues = val
    }
    return opts.map((opt, i) => (
      <FormControlLabel
        key={opt + i}
        value={opt.value}
        control={(
          <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<CheckCircleIcon />}
            checked={checkedValues ? checkedValues.includes(opt.value) : false}
          />
        )}
        label={opt.display}
        style={{
          ...(opt.color && { backgroundColor: opt.color }),
        }}
      />
    ))
  }

  const createRadioOptions = (opts, val) => {
    let checkedValues = null
    if (val && val !== '' && val.length > 0) {
      checkedValues = val
    }
    return opts.map((opt, i) => (
      <FormControlLabel
        key={opt + i}
        value={opt.value}
        control={(
          <Radio checked={checkedValues ? checkedValues.includes(opt.value) : false} />
        )}
        label={opt.display}
      />
    ))
  }

  switch (elementType) {
    case ('textarea'):
      inputEl = (
        <>
          <TextField
            className={`${inputClasses} ${rtlClass}`}
            label={label}
            multiline
            maxRows={4}
            value={value}
            onChange={changed}
            error={touched && !valid}
            helperText={errorMessage && errorMessage.var}
            disabled={disabled}
            fullWidth={grid.fullWidth}
            {...elementSetup}
          />
          {elementSetup.help && (
            <Typography
              className={classes.help}
              style={{
                ...elementSetup.helpbackground ? { backgroundColor: elementSetup.helpbackground } : {},
                ...elementSetup.helpcolor ? { color: elementSetup.helpcolor } : {},
              }}
            >
              <HelpOutlineIcon
                style={{
                  ...elementSetup.helpcolor ? { color: elementSetup.helpcolor } : {},
                }}
              />
              {elementSetup.help}
            </Typography>
          )}
        </>
      )
      break
    case ('textarea-auto-size'):
      inputEl = (
        <TextareaAutosize
          className={`${inputClasses} ${rtlClass}`}
          label={label}
          multiline
          rowsMin={4}
          value={value}
          onChange={changed}
          error={!valid}
          helperText={errorMessage}
          disabled={disabled}
          fullWidth={grid.fullWidth}
          {...elementSetup}
        />
      )
      break
    case ('checkbox'):
      inputEl = (
        <FormGroup row>
          <FormControlLabel
            control={(
              <Checkbox
                checked={value}
                color="primary"
                onChange={changed}
                {...elementSetup}
              />
            )}
            label={label}
            className={`${classes.formLabel} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
            dir={language.direction}
          />
          {touched && !valid && (
            <FormHelperText className="Mui-error">{errorMessage && errorMessage.var}</FormHelperText>
          )}
        </FormGroup>
      )
      break
    case ('checkboxGroup'):
      inputEl = (
        <Box>
          <Typography className={classes.checkboxGroupLabel}>
            {label}
          </Typography>
          <FormGroup row className={classes.checkboxGroupContainer} onChange={changed}>
            {createCheckboxGroupOptions(elementOptions, value)}
          </FormGroup>
        </Box>
      )
      break
    case ('radio'):
      inputEl = (
        <FormControl component="fieldset">
          <Typography className={classes.radioGroupLabel}>
            {label}
          </Typography>
          <RadioGroup row className={classes.radioGroupContainer} aria-label={elementSetup.name} name={elementSetup.name} value={value} onChange={changed}>
            {createRadioOptions(elementOptions, value)}
          </RadioGroup>
        </FormControl>
      )
      break
    case ('select'):
      inputEl = (
        <>
          <InputLabel htmlFor={elementSetup.name} className={`${inputClasses} ${rtlClass}`}>{label}</InputLabel>
          <Select
            native
            error={touched && !valid}
            value={value}
            onChange={changed}
            fullWidth={grid.fullWidth}
            disabled={elementSetup.disabled}
            className={`${classes.select} ${rtlClass} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}
            MenuProps={{ classes: { paper: classes.select, list: classes.select } }}
            inputProps={{
              name: elementSetup.name,
              id: elementSetup.name,
            }}
          >
            {!elementSetup.noemptyopts && (
              <option aria-label="None" value="" />
            )}
            {elementSetup.sort ? createSelectOptionsSorted(elementOptions) : createSelectOptions(elementOptions)}
          </Select>
          <FormHelperText className={`Mui-error ${classes.rtlLabel}`}>{errorMessage && errorMessage.var}</FormHelperText>
        </>
      )
      break
    case ('autoComplete'):
      inputEl = (
        <Autocomplete
          multiple
          id="tags-standard"
          options={elementOptions}
          getOptionLabel={tag => tag.title}
          defaultValue={value}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              label="Multiple values"
              placeholder="Favorites"
              fullWidth={grid.fullWidth}
              disabled={disabled}
            />
          )}
        />
      )
      break
    case ('tags'):
      chipsArray = []
      if (typeof value === 'string' && value !== '') {
        chipsArray = value.split(',')
      }
      inputEl = (
        <>
          <ChipInput
            defaultValue={chipsArray}
            label={label}
            onChange={changed}
            error={!valid}
            className={`${inputClasses} ${classes.chipInputEl} ${rtlClass} ${elementSetup.disabled && classes.disabledInput}`}
          />
          <FormHelperText>{errorMessage}</FormHelperText>
        </>
      )
      break
    case ('imageUpload'):
      inputEl = (
        <>
          {/* eslint-disable */}
          {elementSetup.showLabel && (
            <label className={classes.imageUploadLabel}>Profile image</label>
          )}
          {/* eslint-disable */}
          <Box className={`${classes.imageUploadContainer} ${elementSetup.compact ? classes.compactImageUploadContainer : ''}`}>
            <ImageUploader
              {...elementSetup}
              withIcon={false}
              withPreview={false}
              singleImage
              onChange={changed}
              imgExtension={['.jpg', '.png', '.jpeg']}
              label={elementSetup.label}
              buttonText={imageUploadValue || elementSetup.stateClass === 'cropActive' ? elementSetup.changeButtonText : elementSetup.selectButtonText}
              className={`
                ${classes.imageUploadBox}
                ${!imageUploadValue ? classes.imageUploadBoxEmpty : ''}
                ${elementSetup.stateClass === 'cropActive' ? classes.imageUploadBoxCrop : ''}
                ${elementSetup.styleClass === 'light' ? classes.imageUploadBoxLight : ''}
              `}
              maxFileSize={31457280}
            />
            {elementSetup.withView && (
              <Avatar alt="Avatar" src={value} className={classes.imageUploadAvatar} onClick={() => clickUpload()} />
            )}
          </Box>
        </>
      )
      break
    case ('slider'):
      inputEl = (
        <>
          <Typography id="discrete-slider" gutterBottom>
            {label}
          </Typography>
          <Slider
            value={parseInt(value, 10) || 0}
            aria-valuetext={value.toString()}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            step={10}
            onChange={(e, sliderValue) => changed(sliderValue)}
            marks
            min={0}
            max={100}
            classes={{
              root: classes.sliderRoot,
              track: classes.sliderTrack,
              rail: classes.sliderRail,
              thumb: classes.sliderThumb,
              mark: classes.sliderMark,
              valueLabel: classes.valueLabel,
              markLabel: classes.markLabel,
            }}
          />
        </>
      )
      break
    case ('date'):
      if (value) {
        if (isValid(value)) {
          dateValue = dateFns.date(value)
        } else {
          dateValue = dateFns.date(value.toDate())
        }
      }
      inputEl = (
        <>
          <MuiPickersUtilsProvider utils={DateFnsAdapter}>
            <DatePicker
              disableFuture={elementSetup.disableFuture || false}
              disablePast={elementSetup.disablePast || false}
              maxDate={elementSetup.maxDate || null}
              label={label}
              className={`${classes.date} ${rtlClass}`}
              DialogProps={{
                PaperProps: {
                  classes: {
                    root: classes.datePickerDialog,
                  },
                },
              }}
              value={value ? dateValue : null}
              onChange={changed}
              openTo="year"
              format="dd - MM - yyyy"
              views={['year', 'month', 'date']}
              clearable
            />
          </MuiPickersUtilsProvider>
        </>
      )
      break
    case ('dateTime'):
      if (value) {
        if (isValid(value)) {
          dateValue = dateFns.date(value)
        } else {
          dateValue = dateFns.date(value.toDate())
        }
      }
      inputEl = (
        <>
          <MuiPickersUtilsProvider utils={DateFnsAdapter}>
            <DateTimePicker
              disableFuture={elementSetup.disableFuture || false}
              disablePast={elementSetup.disablePast || false}
              maxDate={elementSetup.maxDate || new Date('2100-01-01')}
              minDateMessage="Date reached"
              label={label}
              showTodayButton
              className={`${classes.date} ${rtlClass}`}
              DialogProps={{
                PaperProps: {
                  classes: {
                    root: classes.datePickerDialog,
                  },
                },
              }}
              value={value ? dateValue : null}
              onChange={changed}
              format="dd - MM - yyyy (h:mm aa)"
              clearable
            />
          </MuiPickersUtilsProvider>
        </>
      )
      break
    case ('phone'):
      inputEl = (
        <>
          <MuiPhoneNumber
            className={`${inputClasses} ${rtlClass} ${classes.phoneInput}`}
            value={value}
            onChange={changed}
            label={label}
            disabled={disabled}
            error={touched && !valid}
            autoFormat={false}
            disableAreaCodes={false}
            disableCountryCode={false}
            disableDropdown={true}
            regions={['north-america', 'europe']}
            helperText={errorMessage && errorMessage.var}
            {...elementSetup}
          />
        </>
      )
      break
    case ('video'):
      inputEl = (
        <>
          <TextField
            dir={language.direction}
            className={`${inputClasses} ${rtlClass} ${elementSetup.disabled && classes.disabledInput}`}
            label={label}
            value={value}
            onChange={changed}
            onBlur={blured}
            error={touched && !valid}
            helperText={errorMessage && errorMessage.var}
            fullWidth={grid.fullWidth}
            disabled={disabled}
            {...elementSetup}
          />
          <p className={classes.videoSupport}>Supports: YouTube, SoundCloud, Facebook, Vimeo	, Twitch, Streamable, Wistia, DailyMotion, Mixcloud, Vidyard</p>
          <Box className={classes.videoContainer}>
            <ReactPlayer controls url={value} width="100%" height="100%" />
            <p><b>Video Preview</b>Add video URL above to display</p>
          </Box>
        </>
      )
      break
    default:
      inputEl = (
        <>
          <TextField
            dir={language.direction}
            className={`${inputClasses} ${rtlClass} ${elementSetup.disabled && classes.disabledInput}`}
            label={label}
            value={value}
            onChange={changed}
            onBlur={blured}
            error={touched && !valid}
            helperText={errorMessage && errorMessage.var}
            fullWidth={grid.fullWidth}
            disabled={disabled}
            InputProps={{
              startAdornment: elementSetup.adornment ? <InputAdornment position={elementSetup.adornmentposition || 'start'}>{elementSetup.adornment}</InputAdornment> : null,
            }}
            {...elementSetup}
            type={elementSetup.type === 'password' && showPassword ? 'text' : elementSetup.type}
          />
        {elementSetup.help && (
          <Typography
            className={classes.help}
            style={{
              ...elementSetup.helpbackground ? { backgroundColor: elementSetup.helpbackground } : {},
              ...elementSetup.helpcolor ? { color: elementSetup.helpcolor } : {},
            }}
          >
            <HelpOutlineIcon
              style={{
                ...elementSetup.helpcolor ? { color: elementSetup.helpcolor } : {},
              }}
            />
            {elementSetup.help}
          </Typography>
        )}
        {elementSetup.type === 'password' && value !== '' && (
          <IconButton
            aria-label="toggle"
            color="primary"
            disabled={disabled}
            onClick={() => togglePasswordVisiblityHandler(elementSetup.disabled)}
            className={`${classes.togglePasswordVisibility} ${elementSetup.disabled && classes.disabledIcon}`}
          >
          {showPassword ? (
            <VisibilityIcon />
          ) : (
            <VisibilityOffIcon />
          )}
          </IconButton>
        )}
        </>
      )
      break
  }

  return (
    <Grid item xs={grid.xs} sm={grid.sm} md={grid.md} lg={grid.lg} xl={grid.xl}>
      <Box className={classes.formElementContainer} mb={formElementSpacing || 0}>
        <FormControl fullWidth={grid.fullWidth} dir={language.direction}>
          {inputEl}
        </FormControl>
      </Box>
    </Grid>
  )
}

FormElement.defaultProps = {
  valid: false,
  shouldValidate: null,
  touched: false,
  errorMessage: null,
  value: null,
  elementSetup: null,
  label: null,
  elementOptions: null,
  elementType: null,
  grid: null,
  disabled: false,
  blured: null,
  formElementSpacing: 0,
}

FormElement.propTypes = {
  valid: PropTypes.bool,
  shouldValidate: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  touched: PropTypes.bool,
  errorMessage: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ])),
  ]),
  changed: PropTypes.func.isRequired,
  blured: PropTypes.func,
  elementSetup: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])),
  label: PropTypes.string,
  elementOptions: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  elementType: PropTypes.string,
  grid: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ])),
  disabled: PropTypes.bool,
  formElementSpacing: PropTypes.number,
}

export default FormElement
