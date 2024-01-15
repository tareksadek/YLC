import React from 'react'

import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

import AssessmentIcon from '@material-ui/icons/Assessment'
import RoomIcon from '@material-ui/icons/Room'
import CallMadeIcon from '@material-ui/icons/CallMade'
import RecentActorsIcon from '@material-ui/icons/RecentActors'
import LockIcon from '@material-ui/icons/Lock'
import ListAltIcon from '@material-ui/icons/ListAlt'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import StarIcon from '@material-ui/icons/Star'
import { QrIcon } from '../../layout/CustomIcons'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { buttonStyles } from '../../theme/buttons'
import { proBoxStyles } from './styles'

import * as vars from '../../utilities/appVars'

const ProBox = ({ onlyFeatures, noButton, noTitles }) => {
  const buttonClasses = buttonStyles()
  const classes = proBoxStyles()
  const color = useColor()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.becomePro

  const goToSubscribe = () => {
    history.push(vars.SUBSCRIBE_PAGE)
  }

  return (
    <Box className={classes.proBoxContainer}>
      <Box className={classes.proBox}>
        {!onlyFeatures && (
          <Box className={classes.proBoxHeader}>
            {/* <img src="/assets/images/becomePro.jpg" alt={pageStatics.data.titles.page} />
            <Box className={classes.proBoxHeaderData}>
              <Typography variant="body1" align="left" component="p" className={classes.proBoxHeaderTitle}>
                {pageStatics.data.titles.page}
              </Typography>
              <Typography variant="body1" align="left" component="p" className={classes.proBoxHeaderDescription}>
                {pageStatics.data.description.page}
              </Typography>
              <Button
                className={`${buttonClasses.defaultButton} ${classes.proBoxHeaderButton}`}
                onClick={() => goToSubscribe()}
                style={{
                  backgroundColor: color.color.code,
                }}
              >
                {pageStatics.buttons.becomePro}
              </Button>
            </Box> */}
            <Box className={classes.landingTextContainer}>
              <Typography variant="body1" component="p" align="center" className={classes.landingTextOne}>
                {pageStatics.data.titles.proBox.first}
                <span>{pageStatics.data.titles.proBox.second}</span>
              </Typography>
              <Typography variant="body1" component="p" align="center" className={classes.landingTextOne}>
                <span>{pageStatics.data.titles.proBox.third}</span>
              </Typography>
              {/* <Typography variant="body1" component="p" align="center" className={classes.landingTextThree}>
                to
                <span>Connect</span>
              </Typography>
              <Typography variant="body1" component="p" align="center" className={classes.landingTextFour}>
                {pageStatics.data.titles.subtitle}
              </Typography> */}
            </Box>
            {!noButton && (
              <Button
                className={`${buttonClasses.defaultButton} ${classes.proBoxHeaderButton}`}
                onClick={() => goToSubscribe()}
                style={{
                  backgroundColor: color.color.code,
                }}
              >
                {pageStatics.buttons.becomePro}
                <span className={buttonClasses.defaultButtonDescription}>
                  {pageStatics.buttons.becomeProOffer}
                  <i>{pageStatics.buttons.becomeProCancel}</i>
                </span>
              </Button>
            )}
          </Box>
        )}

        <Box className={classes.proBoxContent}>
          {!noTitles && (
            <Box className={classes.proBoxContentHeader}>
              <Typography variant="body1" align="left" component="p" className={classes.proBoxContentSubTitle}>
                {pageStatics.data.titles.contentSubtitle}
              </Typography>
              <Typography variant="body1" align="left" component="p" className={classes.proBoxContentTitle}>
                {pageStatics.data.titles.contentTitle}
              </Typography>
            </Box>
          )}
          <Box className={classes.proBoxContentGridContainer}>
            <Grid container className={classes.proBoxContentGrid}>
              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <RecentActorsIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.main.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.main.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <ListAltIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.eighth.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.eighth.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <CloudDownloadIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.ninth.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.ninth.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <AssessmentIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.second.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.second.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <AssignmentIndIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.sixth.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.sixth.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <QrIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.first.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.first.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <RoomIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.third.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.third.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <CallMadeIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.fifth.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.fifth.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <LockIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.seventh.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.seventh.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} className={classes.proBoxContentGridItem}>
                <Box className={classes.proBoxFeature}>
                  <Box className={classes.proBoxFeatureIconContainer}>
                    <StarIcon />
                  </Box>
                  <Box className={classes.proBoxFeatureData}>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureTitle}>
                      {pageStatics.data.description.features.tenth.title}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.proBoxFeatureDescription}>
                      {pageStatics.data.description.features.tenth.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

ProBox.defaultProps = {
  onlyFeatures: false,
  noButton: false,
  noTitles: false,
}

ProBox.propTypes = {
  onlyFeatures: PropTypes.bool,
  noButton: PropTypes.bool,
  noTitles: PropTypes.bool,
}

export default ProBox
