import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useWizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination'

import PageTitle from '../../layout/PageTitle'
import TeamInvitationsList from '../MyTeam/TeamInvitationsList'
import Alert from '../../layout/Alert'

import { useLanguage } from '../../hooks/useLang'

import { TEAM_INVITATIONS_PER_PAGE } from '../../utilities/appVars'

import { layoutStyles } from '../../theme/layout'
import { onboardingStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'

const StepZero = ({
  invitations, onSetNotification, isMaster,
}) => {
  const classes = onboardingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const { nextStep } = useWizard()
  const teamMembersInvitations = invitations && invitations.length > 0 ? invitations.filter(inv => !inv.usedBy) : null

  const [currentPage, setCurrentPage] = useState(1)

  const continueProcessHandler = () => {
    nextStep()
  }

  const pageTeamInvitations = pageNumber => {
    let teamInvitationsInPage

    if (teamMembersInvitations) {
      teamInvitationsInPage = teamMembersInvitations.slice(((pageNumber - 1) * (TEAM_INVITATIONS_PER_PAGE)), ((pageNumber) * (TEAM_INVITATIONS_PER_PAGE)))
    }

    return teamInvitationsInPage
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageTeamInvitations(page)
  }

  if (!invitations) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" style={{ minHeight: 300 }}>
        <CircularProgress />
        <Box mt={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.messages.loading.loadingInvitations}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <>
      {isMaster && (
        <Box className={classes.wizardSubtitleContainer} mb={4}>
          <Typography variant="body1" align="left" component="p" className={classes.onboardingHeaderSubtitle}>
            {pageStatics.data.titles.wizardSubtitleCompanyZero}
          </Typography>
        </Box>
      )}
      <Alert
        title={pageStatics.messages.notifications.stepZero.preparingCards.title}
        description={pageStatics.messages.notifications.stepZero.preparingCards.description}
        type="info"
      />
      <Alert
        description={pageStatics.messages.notifications.stepZero.invitationsList.description}
        type="warning"
      />
      <Box className={`${layoutClasses.panel}`}>
        <PageTitle
          title={`${pageStatics.data.titles.stepZero}`}
        />
        <Box>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.stepZero}
          </Typography>
          <TeamInvitationsList
            invitations={pageTeamInvitations(currentPage)}
            onSetNotification={onSetNotification}
          />
          {(teamMembersInvitations && teamMembersInvitations.length > TEAM_INVITATIONS_PER_PAGE) && (
            <Box mt={1} mb={2}><Pagination count={Math.ceil(teamMembersInvitations.length / TEAM_INVITATIONS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>
          )}
        </Box>
      </Box>
      <Box className={`${classes.stepbuttonsContainer} ${classes.stepbuttonsContainerFull}`}>
        <Button
          onClick={() => continueProcessHandler()}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.startOnboarding}
        </Button>
      </Box>
      {
        // <Box mt={3}>
        //   <InfoBox infoList={[pageStatics.messages.info.stepOne.first]} />
        // </Box>
      }
    </>
  )
}

StepZero.defaultProps = {
  invitations: null,
  isMaster: false,
}

StepZero.propTypes = {
  invitations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onSetNotification: PropTypes.func.isRequired,
  isMaster: PropTypes.bool,
}

export default StepZero
