import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import InfoBox from '../../components/Ui/InfoBox'
import FormElement from '../../components/Ui/FormElement'
import ProfileLink from '../../components/ShareProfile/ProfileLink'
import PageTitle from '../../layout/PageTitle'
import SkeletonContainer from '../../layout/SkeletonContainer'

import { createFormElementObj, adjustFormValues } from '../../utilities/form'
import { capitalizeFirst } from '../../utilities/utils'

import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'
import { shareStyles } from './styles'

import * as actions from '../../store/actions'

const ShareProfile = ({
  cardData,
}) => {
  const layoutClasses = layoutStyles()
  const classes = shareStyles()

  const color = useColor()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.shareProfile

  const defaultMessage = pageStatics.messages.info.defaultShareMessageBody
  const defaultTitle = pageStatics.messages.info.defaultShareMessageTitle
  const pageUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : language.languageVars.appShortLink
  const firstName = cardData && cardData.userId && cardData.firstName ? cardData.firstName.toLowerCase().replaceAll(' ', '_').replace(/[^\w ]/g, '') : ''
  const lastName = cardData && cardData.userId && cardData.lastName ? capitalizeFirst(cardData.lastName.toLowerCase().replaceAll(' ', '_').replace(/[^\w ]/g, '')) : ''
  const fullName = cardData && cardData.userId && parse(`${firstName}${lastName}`)
  let profileUrl = cardData && cardData.userId && `${pageUrl}/${fullName.replace(/[^a-zA-Z0-9]/g, '')}_${cardData.accountSecret}`
  profileUrl = cardData && cardData.userId && `${pageUrl}/${auth.userUrlSuffix}`
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  // const [loadingDone, setLoadingDone] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [shareForm, setShareForm] = useState({
    shareMessage: createFormElementObj('textarea', pageStatics.forms.shareMessage,
      { type: 'text', name: 'message', placeholder: pageStatics.forms.shareMessage }, defaultMessage, null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  // useEffect(() => {
  //   let mounted = true

  //   if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadCard(auth.user.uid)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [onLoadCard, auth.user.uid, cardData.userId, isTheLoggedinUser])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(shareForm, changeEvent, key)
    setShareForm(adjustedForm.adjustedForm)
  }

  const loadShareForm = () => {
    const form = Object.keys(shareForm).map((formEl, i) => (
      <FormElement
        elementType={shareForm[formEl].elementType}
        label={shareForm[formEl].elementLabel}
        value={shareForm[formEl].value}
        elementOptions={shareForm[formEl].elementOptions}
        touched={shareForm[formEl].touched}
        valid={shareForm[formEl].isValid}
        shouldValidate={shareForm[formEl].validtationRules}
        elementSetup={shareForm[formEl].elementSetup}
        changed={e => inputChangeHandler(e, formEl)}
        grid={shareForm[formEl].grid}
        disabled={false}
        key={formEl + i}
      />
    ))

    return form
  }

  if (cardData.loading || !cardData.userId || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.page}>
          <Box>
            <InfoBox infoList={[pageStatics.messages.info.share.first]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', width: 100, height: 50 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 100 },
                { variant: 'rect', width: 150, height: 50 },
                { variant: 'rect', width: 150, height: 50 },
                { variant: 'rect', width: 150, height: 50 },
                { variant: 'rect', width: 150, height: 50 },
                { variant: 'rect', width: 150, height: 50 },
                { variant: 'rect', width: 150, height: 50 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={!auth.loadingAuth} loadingText={pageStatics.messages.loading.loadingShareOptions} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {/* {loading && <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingShareOptions} />} */}
      <Header title={pageStatics.data.titles.page}>
        <Box>
          <InfoBox infoList={[pageStatics.messages.info.share.first]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle
              title={pageStatics.data.titles.profileLink}
            />
            <ProfileLink profileUrl={profileUrl} color={color.color.code} />
          </Box>
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle
              title={pageStatics.data.titles.shareProfile}
            />
            <Box mb={2}>
              <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                {pageStatics.messages.info.general.first}
              </Typography>
            </Box>
            <Box className={classes.shareFormContainer}>
              <Grid container spacing={3}>
                {loadShareForm()}
              </Grid>
            </Box>
            <Box className={classes.shareButtonsContainer}>
              <EmailShareButton subject={defaultTitle} body={`${shareForm.shareMessage.value}: ${profileUrl}`} separator=" ">
                <EmailIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
                <Typography className={classes.shareButtonText} component="p" variant="body1">
                  E-mail
                </Typography>
              </EmailShareButton>
              <FacebookShareButton url={profileUrl} quote={shareForm.shareMessage.value}>
                <FacebookIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
                <Typography className={classes.shareButtonText} component="p" variant="body1">
                  Facebook
                </Typography>
              </FacebookShareButton>
              <TwitterShareButton url={profileUrl} title={shareForm.shareMessage.value}>
                <TwitterIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
                <Typography className={classes.shareButtonText} component="p" variant="body1">
                  Twitter
                </Typography>
              </TwitterShareButton>
              <LinkedinShareButton url={profileUrl} title={defaultTitle} summary={shareForm.shareMessage.value} source="ONE Cards">
                <LinkedInIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
                <Typography className={classes.shareButtonText} component="p" variant="body1">
                  Linked-In
                </Typography>
              </LinkedinShareButton>
              <WhatsappShareButton url={profileUrl} title={defaultTitle} separator=" ">
                <WhatsAppIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
                <Typography className={classes.shareButtonText} component="p" variant="body1">
                  WhatsApp
                </Typography>
              </WhatsappShareButton>
              <TelegramShareButton url={profileUrl}>
                <TelegramIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
                <Typography className={classes.shareButtonText} component="p" variant="body1">
                  Telegram
                </Typography>
              </TelegramShareButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
})

const mapDispatchToProps = dispatch => ({
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
})

ShareProfile.defaultProps = {
  cardData: null,
}

ShareProfile.propTypes = {
  // onLoadCard: PropTypes.func.isRequired,
  // switchTheme: PropTypes.func.isRequired,
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default connect(mapStateToProps, mapDispatchToProps)(ShareProfile)
