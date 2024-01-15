import React from 'react'

import Box from '@material-ui/core/Box'

import Header from '../../layout/Header'
import InfoBox from '../../components/Ui/InfoBox'

import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'

const Suspended = () => {
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.suspended} />
      <Box className={layoutClasses.contentContainer}>
        <Box mb={3}>
          <InfoBox infoList={[pageStatics.messages.info.profileSuspended.first, pageStatics.messages.info.profileSuspended.second]} />
        </Box>
      </Box>
    </Box>
  )
}

export default Suspended
