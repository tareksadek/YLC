import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import PageTitle from '../../layout/PageTitle'
import SocialLinksList from '../Cards/EditCard/SocialLinksList'
import CustomLinksList from '../Cards/EditCard/CustomLinksList'

import AddCustomLinkDialog from '../Cards/EditCard/AddCustomLinkDialog'
import Alert from '../../layout/Alert'

import {
  createFormElementObj, adjustFormValues, createFormValuesObj, validityCheck,
} from '../../utilities/form'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { socialLinksStyles } from '../Cards/styles'

import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

import { socialPlatforms } from '../../utilities/appVars'

const ProfileLinks = ({
  links, setLinks, loading, error, setUserInfo, onDeleteCustomLink, onSetNotification, socialLinksOrder,
  onSort, onCustomSort, redirect, setRedirect, defaultLinksToTheme, socialLinksSorted,
  customLinksSorted, onUpdateSocialLinks, onSortSocialLinks, onSortCustomLinks, onAddCustomLink, profileLinks, disableActions,
}) => {
  const classes = socialLinksStyles()
  const buttonClasses = buttonStyles()
  const layoutClasses = layoutStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [addCustomLinkDialogOpen, setAddCustomLinkDialogOpen] = useState(window.location.hash === '#clink')
  const [linkClosed, setLinkClosed] = useState(false)
  const [addCustomLinkForm, setAddCustomLinkForm] = useState({
    linkTitle: createFormElementObj('input', `${pageStatics.forms.customLinks.linkTitle}*`, { type: 'text', name: 'linkTitle', placeholder: `${pageStatics.forms.customLinks.linkTitle}*` }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    link: createFormElementObj('input', `${pageStatics.forms.customLinks.link}*`, { type: 'text', name: 'link', placeholder: `${pageStatics.forms.customLinks.link}*` }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  useEffect(() => {
    const onHashChange = () => {
      setAddCustomLinkDialogOpen(window.location.hash === '#clink')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedForm = adjustFormValues(addCustomLinkForm, changeEvent, key)
    setAddCustomLinkForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
  }

  const inputBlurHandler = (e, key) => {
    if (key === 'link') {
      const inputValue = e.target.value
      const isValid = inputValue.substring(0, 8) === 'https://' || inputValue.substring(0, 7) === 'http://'
      if (!isValid) {
        e.target.value = `http://${inputValue}`
      }

      const adjustedForm = adjustFormValues(addCustomLinkForm, e, key)
      setAddCustomLinkForm(adjustedForm.adjustedForm)
      setFormValid(adjustedForm.formValid)
      setFormTouched(true)
    }
  }

  const cleanUrl = url => url.replace(/ /g, '')

  const cleanSpecialChars = str => str.replace(/[#^+()$~'":*<>{}!@]/g, '')

  const isURL = str => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  const getPlatformDomain = platform => {
    const socialLinkIndex = socialPlatforms.findIndex(socialPlatfrom => socialPlatfrom.platform === platform)
    const socialLinkDomain = socialPlatforms[socialLinkIndex].domain || null

    return socialLinkDomain
  }

  const domainExits = (platform, url) => {
    const domain = getPlatformDomain(platform)
    if (domain) {
      const domainPart = domain.substring(0, domain.indexOf('.'))
      return url.includes(domainPart)
    }
    return false
  }

  const validPlatformUrl = (url, platform) => {
    // console.log(url);
    // console.log(platform);
    const isValidURL = isURL(url)
    const platformDomainExists = domainExits(platform, url)
    const linkProtocolExists = url.substring(0, 8) === 'https://' || url.substring(0, 7) === 'http://'

    return {
      isValidURL,
      platformDomainExists,
      linkProtocolExists,
    }
  }

  const updateLink = (platform, link, validationRules) => {
    const currenLinks = {
      ...links,
      social: [...links.social],
    }
    const linkValid = validityCheck(link, validationRules)
    const updatedLinks = currenLinks.social.map(currentLink => {
      const returnValue = { ...currentLink }
      if (currentLink.platform === platform) {
        returnValue.link = link
        returnValue.touched = true
        returnValue.valid = linkValid.isValid
        returnValue.errorMessage = linkValid.errorMessage
      }
      return returnValue
    })

    setLinks(prevState => ({
      ...prevState,
      custom: links.custom ? [...links.custom] : [],
      social: updatedLinks,
    }))
  }

  const linkChangeHandler = (e, platform, validationRules) => {
    const linkValue = cleanUrl(e.target.value)
    if (linkValue !== '' || linkValue !== 'http://' || linkValue !== 'https://') {
      updateLink(platform, linkValue, validationRules)
    }
  }

  const linkBlurHandler = (e, platform, validationRules) => {
    let inputValue = cleanUrl(e.target.value)
    const urlProps = validPlatformUrl(inputValue, platform)

    if (urlProps.isValidURL && urlProps.platformDomainExists && !urlProps.linkProtocolExists) {
      inputValue = `https://${inputValue}`
    } else if (inputValue !== '' && !urlProps.platformDomainExists && !urlProps.linkProtocolExists) {
      const domain = getPlatformDomain(platform)
      const cleanValue = cleanSpecialChars(inputValue)
      inputValue = domain ? `https://${domain}/${cleanValue}` : `https://${cleanValue}`
    }

    updateLink(platform, inputValue, validationRules)
  }

  const addLink = link => {
    let customLinks
    let socialLinks
    if (links && links.custom) {
      customLinks = link.platform === 'custom' ? [...links.custom, link] : [...links.custom]
    } else {
      customLinks = link.platform === 'custom' ? [link] : []
    }
    if (links && links.social) {
      socialLinks = link.platform !== 'custom' && link.platform !== 'menu' ? [...links.social, link] : [...links.social]
    } else {
      socialLinks = link.platform !== 'custom' && link.platform !== 'menu' ? [link] : []
    }
    setLinks(prevState => ({
      ...prevState,
      custom: customLinks,
      social: socialLinks,
    }))
  }

  const toggleLink = platform => {
    const toggledLinkIndex = [...links.social].findIndex(link => link.platform === platform)
    const socialLinks = [...links.social]
    const toggledLink = socialLinks[toggledLinkIndex]
    socialLinks[toggledLinkIndex].active = !toggledLink.active

    setLinks(prevState => ({
      ...prevState,
      social: socialLinks,
    }))
  }

  const deactivateLink = platform => {
    const toggledLinkIndex = [...links.social].findIndex(link => link.platform === platform)
    const socialLinks = [...links.social]
    if (toggledLinkIndex > -1) {
      socialLinks[toggledLinkIndex].active = false
    }

    setLinks(prevState => ({
      ...prevState,
      social: socialLinks,
    }))
  }

  const handleToggle = (key, platform, deactivate) => () => {
    const allLinks = links && links.social ? links.social : socialLinksOrder
    const linkPlatformExists = allLinks.filter(link => link.platform === platform).length > 0
    if (deactivate) {
      deactivateLink(platform)
      setLinkClosed(true)
      return
    }
    if (!links || !links.social || !linkPlatformExists) {
      const link = {
        active: true,
        touched: false,
        valid: false,
        saved: true,
        link: '',
        key: socialPlatforms.filter(sp => sp.platform === platform)[0].key,
        platform,
      }
      addLink(link)
    } else {
      toggleLink(platform)
    }
  }

  const redirectLink = link => {
    setRedirect(link)
  }

  const handleRedirect = (e, link) => {
    redirectLink(e.target.checked ? link : null)
    setUserInfo(prevState => ({
      ...prevState,
      redirect: link,
    }))
  }

  const openCustomLinkDialogHandler = () => {
    window.location.hash = '#clink'
  }

  const closeCustomLinkDialogHandler = () => {
    setAddCustomLinkForm(prevForm => ({
      ...prevForm,
      link: {
        ...prevForm.link,
        value: '',
        isValid: false,
        touched: false,
      },
      linkTitle: {
        ...prevForm.linkTitle,
        isValid: false,
        touched: false,
        value: '',
      },
    }))
    window.history.back()
  }

  const addCustomLinkHandler = async e => {
    e.preventDefault()
    const formDetails = createFormValuesObj(addCustomLinkForm)
    formDetails.active = true
    formDetails.touched = true
    formDetails.valid = true
    formDetails.key = links && links.custom && links.custom.length > 0 ? Math.max(...links.custom.map(link => link.key)) + 1 : 1
    formDetails.platform = 'custom'
    setAddCustomLinkForm(prevForm => ({
      ...prevForm,
      link: {
        ...prevForm.link,
        value: '',
        isValid: false,
        touched: false,
      },
      linkTitle: {
        ...prevForm.linkTitle,
        isValid: false,
        touched: false,
        value: '',
      },
    }))
    setFormTouched(false)
    setFormValid(false)
    addLink(formDetails)
    onAddCustomLink(e, formDetails)
    window.history.back()
    if (error) {
      onSetNotification({
        message: pageStatics.messages.notifications.profileLinksUpdateError,
        type: 'error',
      })
    }
  }

  const socialSortHandler = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      onSort(oldIndex, newIndex)
    }
  }

  const customSortHandler = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      onCustomSort(oldIndex, newIndex)
    }
  }

  return (
    <>
      {(socialLinksSorted || customLinksSorted) && (
        <Alert
          title={pageStatics.messages.notifications.linkOrderChanged.title}
          description={pageStatics.messages.notifications.linkOrderChanged.description}
          type="warning"
        />
      )}
      <Box className={layoutClasses.panel}>
        <PageTitle title={pageStatics.data.titles.customLinks} />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.customLinksPanel}
          </Typography>
        </Box>
        {(links && links.custom && links.custom.length > 0) && (
          <Box mt={2}>
            <CustomLinksList
              onLinkDelete={onDeleteCustomLink}
              links={links}
              redirect={redirect}
              onSortEnd={customSortHandler}
              onLinkRedirect={handleRedirect}
              disableActions={disableActions}
              useDragHandle
            />
          </Box>
        )}
        <Button
          className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
          onClick={() => openCustomLinkDialogHandler()}
          style={{
            backgroundColor: color.color.code,
          }}
          disabled={disableActions}
        >
          {pageStatics.buttons.addCustomLink}
        </Button>
        {customLinksSorted && (
          <Box className={layoutClasses.stickyPanelButton}>
            <Button
              className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
              onClick={e => onSortCustomLinks(e)}
              style={{
                backgroundColor: color.color.code,
              }}
              disabled={!customLinksSorted || disableActions}
            >
              {pageStatics.buttons.updateLinksOrder}
            </Button>
          </Box>
        )}
        <AddCustomLinkDialog
          open={addCustomLinkDialogOpen}
          onClose={closeCustomLinkDialogHandler}
          formElements={addCustomLinkForm}
          onChange={inputChangeHandler}
          onBlur={inputBlurHandler}
          onAddCustomLink={addCustomLinkHandler}
          formValid={formValid}
          formTouched={formTouched}
          color={color.color.code}
          disableActions={disableActions}
        />
      </Box>
      <Box className={`${layoutClasses.panel}`}>
        <PageTitle title={pageStatics.data.titles.basicLinks} />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.socialLinksPanel}
          </Typography>
        </Box>
        <Box className={classes.linksContainer}>
          {loading && <LoadingBackdrop loadingText={pageStatics.messages.loading.loadingLinks} />}
          <SocialLinksList
            socialLinks={socialLinksOrder}
            links={links && links.social ? links.social : socialLinksOrder}
            profileLinks={profileLinks ? profileLinks.filter(link => link.platform !== 'custom') : null}
            redirect={redirect}
            defaultLinksToTheme={defaultLinksToTheme}
            onToggleDefaultLinksToTheme={() => true}
            loading={loading}
            onLinkChange={linkChangeHandler}
            onLinkBlur={linkBlurHandler}
            onLinkToggle={handleToggle}
            onLinkRedirect={handleRedirect}
            onSortEnd={socialSortHandler}
            axis="xy"
            pressDelay={100}
            onUpdateSocialLinks={onUpdateSocialLinks}
            linkClosed={linkClosed}
            disableActions={disableActions}
          />
        </Box>
        {socialLinksSorted && (
          <Box className={layoutClasses.stickyPanelButton}>
            <Button
              className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
              onClick={e => onSortSocialLinks(e)}
              style={{
                backgroundColor: color.color.code,
              }}
              disabled={!socialLinksSorted || disableActions}
            >
              {pageStatics.buttons.updateLinksOrder}
            </Button>
          </Box>
        )}
      </Box>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onToggleDefaultLinksToTheme: () => dispatch(actions.defaultLinks()),
})

ProfileLinks.defaultProps = {
  links: null,
  profileLinks: null,
  redirect: null,
  socialLinksOrder: null,
  loading: false,
  error: false,
  defaultLinksToTheme: false,
  socialLinksSorted: false,
  customLinksSorted: false,
  disableActions: false,
}

ProfileLinks.propTypes = {
  links: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])))),
  redirect: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onDeleteCustomLink: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onCustomSort: PropTypes.func.isRequired,
  socialLinksOrder: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  defaultLinksToTheme: PropTypes.bool,
  onUpdateSocialLinks: PropTypes.func.isRequired,
  onSortSocialLinks: PropTypes.func.isRequired,
  onSortCustomLinks: PropTypes.func.isRequired,
  onAddCustomLink: PropTypes.func.isRequired,
  socialLinksSorted: PropTypes.bool,
  customLinksSorted: PropTypes.bool,
  profileLinks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  disableActions: PropTypes.bool,
  setLinks: PropTypes.func.isRequired,
  setRedirect: PropTypes.func.isRequired,
  setUserInfo: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(ProfileLinks)
