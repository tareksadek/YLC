import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Header from '../../layout/Header'
import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/useDarkMode'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
import { connectTapplStyles } from './styles'

import * as actions from '../../store/actions'

const ConnectTappl = ({ onSetNotification, urlSuffix, onLoadCard }) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = connectTapplStyles()
  const auth = useAuth()
  const history = useHistory()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connectTappl

  const pageUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/profile/' : language.languageVars.appProfileURL
  const profileUrl = `${pageUrl}${urlSuffix}`

  useEffect(() => {
    let mounted = true

    if (mounted && !urlSuffix) {
      (async () => {
        await onLoadCard(auth.user.uid)
      })()
    }

    return () => { mounted = false }
  }, [onLoadCard, auth.user.uid, urlSuffix])

  const copyUrl = () => {
    onSetNotification({
      message: pageStatics.messages.notifications.urlCopiedSuccess,
      type: 'success',
    })
  }

  const goToAuth = () => {
    history.push('/auth')
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <PageTitle title={pageStatics.data.titles.subTitle} />
          <Box className={classes.stepsContainer}>
            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>1</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.first.title}
              </Typography>
              {auth.user ? (
                <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                  {pageStatics.data.steps.first.descriptionLoggedIn}
                </Typography>
              ) : (
                <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                  {pageStatics.data.steps.first.descriptionLoggedOut}
                </Typography>
              )}
              {auth.user ? (
                <Box className={classes.profileUrlSection}>
                  <Box className={classes.copyUrlContainer} mt={3}>
                    <CopyToClipboard
                      text={profileUrl}
                      onCopy={() => copyUrl()}
                      className={`${buttonClasses.defaultButton} ${classes.copyUrlButton}`}
                      style={{
                        backgroundColor: color.color.code,
                      }}
                    >
                      <Typography variant="body1" component="p" className={classes.profileLinkButtonText}>
                        {pageStatics.buttons.copyUrl}
                      </Typography>
                    </CopyToClipboard>
                  </Box>
                </Box>
              ) : (
                <Box className={classes.loginSection}>
                  <Button
                    disableRipple
                    className={buttonClasses.defaultButton}
                    onClick={() => goToAuth()}
                    style={{
                      backgroundColor: color.color.code,
                      minWidth: 'auto',
                      aidth: 'auto',
                    }}
                  >
                    {pageStatics.buttons.login}
                  </Button>
                </Box>
              )}
            </Box>

            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>2</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.second.title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                {pageStatics.data.steps.second.description}
              </Typography>
              <Box className={classes.storeSection}>
                <a
                  className={buttonClasses.defaultButton}
                  href="https://apps.apple.com/us/app/nfc-tools/id1252962749"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/assets/images/dios.svg" alt="Download IOS Version" />
                </a>
                <a
                  className={buttonClasses.defaultButton}
                  href="https://play.google.com/store/apps/details?id=com.wakdev.wdnfc&hl=en&gl=US"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src="/assets/images/dand.svg" alt="Download Android Version" />
                </a>
              </Box>
            </Box>

            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>3</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.third.title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                {pageStatics.data.steps.third.description}
              </Typography>
            </Box>

            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>4</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.fourth.title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                {pageStatics.data.steps.fourth.description}
              </Typography>
            </Box>

            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>5</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.fifth.title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                {pageStatics.data.steps.fifth.description}
              </Typography>
            </Box>

            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>6</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.sixth.title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                {pageStatics.data.steps.sixth.description}
              </Typography>
            </Box>

            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>7</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.seventh.title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                {pageStatics.data.steps.seventh.description}
              </Typography>
            </Box>

            <Box className={classes.connectStep}>
              <span className={classes.stepNumber}>8</span>
              <Typography variant="body1" component="p" className={classes.connectStepTitle}>
                {pageStatics.data.steps.eighth.title}
              </Typography>
              <Typography variant="body1" component="p" className={classes.connectStepDescription}>
                {pageStatics.data.steps.eighth.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

ConnectTappl.defaultProps = {
  urlSuffix: null,
}

ConnectTappl.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  urlSuffix: PropTypes.string,
}

const mapStateToProps = state => ({
  urlSuffix: state.cards.urlSuffix,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectTappl)
