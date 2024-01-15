import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import ReactPlayer from 'react-player'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import ProfilePlaceholder from '../../Ui/ProfilePlaceholder'
import FullScreenDialog from '../../../layout/FullScreenDialog'
// import SocialLinks from './SocialLinks'

import { useLanguage } from '../../../hooks/useLang'
import { useDisplayMode } from '../../../hooks/useDisplayMode'

import InfoData from './InfoData'

import { detailsDialog } from '../styles'
import { buttonStyles } from '../../../theme/buttons'

const InfoDrawer = ({
  closeDialog, dialogOpen, userName, firstName, middleName, lastName, email, colorCode, gender, nickname, career, organization,
  title, workPhone, workFax, homePhone, homeFax, birthday, note, bioVideo, authUser, showHelperButtons, marker, address,
  // links, defaultLinksToTheme, countClicks, socialLinksOrder,
}) => {
  const classes = detailsDialog()
  const buttonClasses = buttonStyles()

  const history = useHistory()
  const mode = useDisplayMode()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.viewProfile

  const goToContacts = () => {
    history.push('/contact')
  }

  const goToVideo = () => {
    history.push('/bio')
  }

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={closeDialog}
      title={`${userName} info`}
      titleBackground={colorCode}
      noSidePadding
      loading={false}
    >
      <Box>
        {bioVideo && (
          <>
            {mode.mode === 'edit' && (
              <Box mt={1} mb={2}>
                <Button
                  color="secondary"
                  onClick={() => goToVideo()}
                  className={buttonClasses.editModeButton}
                >
                  Change video
                </Button>
              </Box>
            )}
            <Box className={classes.videoContainer}>
              <ReactPlayer controls url={bioVideo} width="100%" height="100%" />
            </Box>
          </>
        )}
        {!bioVideo && authUser && showHelperButtons && mode.mode === 'edit' && (
          <Box className={classes.placeholderContainer}>
            <ProfilePlaceholder
              title={pageStatics.data.videoPlaceholder.title}
              description={pageStatics.data.videoPlaceholder.description}
              buttonText={pageStatics.data.videoPlaceholder.button}
              isClickable
              isLarge
              link="/bio"
            />
          </Box>
        )}

        <InfoData
          firstName={firstName}
          email={email}
          middleName={middleName}
          lastName={lastName}
          gender={gender}
          nickname={nickname}
          career={career}
          organization={organization}
          title={title}
          workPhone={workPhone}
          workFax={workFax}
          homePhone={homePhone}
          homeFax={homeFax}
          birthday={birthday}
          note={note}
          address={address}
          marker={marker}
        />

        {mode.mode === 'edit' && (workPhone || email) && (
          <Box mt={5} mb={2}>
            <Button
              color="secondary"
              onClick={() => goToContacts()}
              className={buttonClasses.editModeButton}
            >
              Add / Edit contact info
            </Button>
          </Box>
        )}

        <Box className={classes.poweredByContainer}>
          <a
            href={language.languageVars.appParentDomain}
            target="_blank"
            rel="noreferrer"
            style={{ color: colorCode }}
            className={classes.poweredByLink}
          >
            {`${language.languageVars.appStamp}`}
          </a>
        </Box>
      </Box>
    </FullScreenDialog>
  )
}

InfoDrawer.defaultProps = {
  dialogOpen: false,
  firstName: null,
  lastName: null,
  userName: null,
  middleName: null,
  gender: null,
  nickname: null,
  organization: null,
  title: null,
  workPhone: null,
  homePhone: null,
  workFax: null,
  homeFax: null,
  birthday: null,
  note: null,
  bioVideo: null,
  authUser: null,
  showHelperButtons: false,
  career: null,
  email: null,
  colorCode: null,
  // links: null,
  // socialLinksOrder: null,
  // defaultLinksToTheme: false,
  marker: null,
  address: null,
}

InfoDrawer.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userName: PropTypes.string,
  middleName: PropTypes.string,
  gender: PropTypes.string,
  nickname: PropTypes.string,
  career: PropTypes.string,
  organization: PropTypes.string,
  title: PropTypes.string,
  workPhone: PropTypes.string,
  homePhone: PropTypes.string,
  workFax: PropTypes.string,
  homeFax: PropTypes.string,
  birthday: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  note: PropTypes.string,
  bioVideo: PropTypes.string,
  authUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  showHelperButtons: PropTypes.bool,
  email: PropTypes.string,
  colorCode: PropTypes.string,
  // links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.array,
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]))),
  // socialLinksOrder: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.array,
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]))),
  // defaultLinksToTheme: PropTypes.bool,
  // countClicks: PropTypes.func.isRequired,
  marker: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  address: PropTypes.string,
}

export default InfoDrawer
