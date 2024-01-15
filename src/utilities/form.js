import parse from 'html-react-parser'
import { updateObj } from './utils'

export const createFormElementObj = (
  type, label, setupObj, value, selectOptions, rules, isValid, uiGrid, disabled,
) => {
  const elObj = {}

  elObj.elementType = type
  elObj.elementLabel = label
  elObj.elementSetup = setupObj
  elObj.value = value
  elObj.disabled = disabled || false
  elObj.elementOptions = selectOptions
  elObj.validtationRules = rules
  elObj.isValid = isValid
  elObj.touched = false
  elObj.errorMessage = null
  elObj.grid = uiGrid

  return elObj
}

const validateEmail = email => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return reg.test(email)
}

// const validateNumbers = str => {
//   const reg = /^(\d+(\.\d+)?)$/
//   return str !== '' && str.length > 0 ? reg.test(str) : true
// }

const validateNumbers = str => {
  const reg = /^$|^[+\d\s.-]{6,14}$/
  return reg.test(str);
}

const validatePhoneNumbers = str => {
  const reg = /^[\d +]+$/
  return reg.test(str)
}

export const validityCheck = (inputValue, rules) => {
  let isValid = true
  let errorMessage = null

  const value = Number.isInteger(inputValue) || typeof inputValue === 'object' || typeof inputValue === 'boolean' ? inputValue : inputValue.trim()

  if (rules.requiredCheck && isValid) {
    isValid = value === true
    errorMessage = !isValid ? { type: 'required', var: 'Please check the agreement box.' } : null
  }

  if (rules.notEmpty && isValid) {
    const trimmedValue = value.length > 1 ? value.trim() : ''
    isValid = trimmedValue !== ''
    errorMessage = !isValid ? { type: 'notEmpty', var: '' } : null
  }

  if (rules.required && isValid) {
    isValid = value !== ''
    errorMessage = !isValid ? { type: 'required', var: 'This field is required.' } : null
  }

  if (rules.maxLength && isValid) {
    isValid = value.length <= rules.maxLength
    errorMessage = !isValid ? { type: 'maxLen', var: `Maximum ${rules.maxLength} characters` } : null
  }

  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength
    errorMessage = !isValid ? { type: 'minLen', var: `Minimum ${rules.minLength} characters` } : null
  }

  if (rules.email && isValid) {
    isValid = validateEmail(value.toLowerCase())
    errorMessage = !isValid ? { type: 'email', var: 'Invalid Email address' } : null
  }

  if (rules.onlyNumber && isValid) {
    isValid = validateNumbers(value)
    errorMessage = !isValid ? { type: 'numbers', var: 'Only numbers are acceptable' } : null
  }

  if (rules.phoneNumber && isValid) {
    isValid = validatePhoneNumbers(value) && value.length > 6
    errorMessage = !isValid ? { type: 'numbers', var: 'Invalid phone number' } : null
  }

  if (rules.matchField && isValid) {
    isValid = value === document.querySelector(`input[name=${rules.matchField}]`).value
    errorMessage = !isValid ? { type: 'match', var: rules.matchField } : null
  }

  if (rules.connected && isValid) {
    isValid = document.querySelector(`[name=${rules.connected}]`).value !== ''
    errorMessage = !isValid ? { type: 'match', var: '' } : null
  }

  if (rules.secureLink && isValid) {
    isValid = value.substring(0, 8) === 'https://'
    errorMessage = !isValid ? { type: 'insecureLink', var: 'Link entered is not secure URL.' } : null
  }

  if (rules.domain && isValid) {
    let testValue
    const testHs = value.substring(0, 8) === 'https://'
    const testH = value.substring(0, 7) === 'http://'
    if (testHs) {
      testValue = value.substring(8, value.length)
    } else if (testH) {
      testValue = value.substring(7, value.length)
    }
    isValid = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(testValue)
    errorMessage = !isValid ? { type: 'domain', var: 'Link entered is not valid.' } : null
  }

  return {
    isValid,
    errorMessage,
  }
}

export const adjustFormValues = (formState, event, key) => {
  const adjustedForm = {
    ...formState,
  }
  let value = event

  if ((event?.type === 'change' || event?.type === 'blur')) {
    if (adjustedForm[key] && adjustedForm[key].elementSetup.parse && adjustedForm[key].elementSetup.parse === 'disabled') {
      value = event.target.value
    } else {
      value = parse(event.target.value)
    }
  }

  if (adjustedForm[key] && adjustedForm[key].elementType === 'checkbox') {
    value = event.target.checked
  }

  if (adjustedForm[key] && adjustedForm[key].elementType === 'checkboxGroup') {
    value = [...adjustedForm[key].value]
    if (event.target.checked) {
      value = [...value, event.target.value]
    } else {
      value = value.filter(opt => opt !== event.target.value)
    }
  }

  if (adjustedForm[key] && adjustedForm[key].elementType === 'select') {
    if (event.target.value.length === 0) {
      value = ''
    }
  }

  if (adjustedForm[key] && (adjustedForm[key].elementSetup.type === 'number' || adjustedForm[key].elementSetup.type === 'text' || adjustedForm[key].elementSetup.type === 'tel')) {
    if (event.target.value.length === 0) {
      value = ''
    }
  }

  if (key && adjustedForm[key]) {
    adjustedForm[key] = updateObj(adjustedForm[key], {
      touched: true,
      value,
      isValid: validityCheck(value, adjustedForm[key].validtationRules).isValid,
      errorMessage: validityCheck(
        value, adjustedForm[key].validtationRules,
      ).errorMessage,
    })
  } else {
    Object.keys(adjustedForm).map(formKey => {
      // const dbValue = value[formKey] || adjustedForm[formKey].value || ''
      const date = !value[formKey]?.seconds ? null : new Date(value[formKey]?.seconds * 1000)
      const dbValue = formKey === 'readerBirthDate' ? date : value[formKey] || adjustedForm[formKey].value || ''
      adjustedForm[formKey] = updateObj(adjustedForm[formKey], {
        value: dbValue,
        isValid: validityCheck(dbValue, adjustedForm[formKey].validtationRules).isValid,
        errorMessage: validityCheck(
          dbValue, adjustedForm[formKey].validtationRules,
        ).errorMessage,
      })
      return true
    })
  }

  const formValidArray = Object.keys(adjustedForm).map(fieldName => adjustedForm[fieldName].isValid)

  const formValid = !formValidArray.includes(false)
  return {
    adjustedForm,
    formValid,
  }
}

export const createFormValuesObj = stateForm => Object.assign({}, ...(
  Object.keys(stateForm).map(fieldName => ({
    [fieldName]: stateForm[fieldName].value,
  }))
))
