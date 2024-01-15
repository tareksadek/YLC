import React from 'react'
import PropTypes from 'prop-types'

import { format } from 'date-fns'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import CardMedia from '@material-ui/core/CardMedia'

import InfoIcon from '@material-ui/icons/Info'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import SocialLinkItem from '../Cards/ViewCard/SocialLinkItem'
import FullScreenDialog from '../../layout/FullScreenDialog'

import { useDarkMode } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { accountInfo } from './styles'

const AccountInfo = ({
  closeDialog, dialogOpen, userInfo,
}) => {
  const classes = accountInfo()
  const language = useLanguage()
  const currentTheme = useDarkMode()
  const photo = (userInfo && userInfo.photo) ? `data:${userInfo.photo.type};base64,${userInfo.photo.code}` : null
  const totalLinks = (userInfo && userInfo.links) ? userInfo.links.length : 0
  const totalActiveLinks = (userInfo && userInfo.links) ? userInfo.links.filter(link => link.active).length : 0
  const socialLinks = (userInfo && userInfo.links) ? userInfo.links.filter(link => link.platform !== 'custom') : null
  const socialLinksTotal = socialLinks ? socialLinks.length : 0
  const activeSocialLinksTotal = (userInfo && userInfo.links) ? userInfo.links.filter(link => link.platform !== 'custom' && link.active).length : 0
  const customLinks = (userInfo && userInfo.links) ? userInfo.links.filter(link => link.platform === 'custom') : null
  const customLinksTotal = customLinks ? customLinks.length : 0
  const activeCustomLinksTotal = (userInfo && userInfo.links) ? userInfo.links.filter(link => link.platform === 'custom' && link.active).length : 0
  const isSubscribed = userInfo && userInfo.subscription && userInfo.subscription.status === 'active'
  const isSubscriptionCanceled = userInfo && userInfo.subscription && userInfo.subscription.canceled_at
  const pageUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : language.languageVars.appDomain
  const profileUrl = userInfo && `${pageUrl}/profile/${userInfo.urlSuffix}`

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={closeDialog}
      title={userInfo && userInfo.userName}
      loading={false}
    >
      <Box>
        {!userInfo ? (
          <LoadingBackdrop loadingText="Loading Data..." />
        ) : (
          <Box>
            <Grid container spacing={2}>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card className={classes.infoCardContainer} variant="outlined">
                  <CardMedia
                    className={classes.infoCardMedia}
                    image={photo || '/assets/images/avatar.svg'}
                    title="Profile info"
                  />
                  <CardContent>
                    <List className={classes.root}>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="First Name"
                          secondary={userInfo && userInfo.firstName ? userInfo.firstName : 'NA'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Last Name"
                          secondary={userInfo && userInfo.lastName ? userInfo.lastName : 'NA'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Profile Email"
                          secondary={userInfo && userInfo.email ? userInfo.email : 'NA'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Phone Number"
                          secondary={userInfo && userInfo.phone ? userInfo.phone : 'NA'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        >
                          <a href={profileUrl} target="_blank" rel="noreferrer" style={{ color: '#00abff' }}>View profile</a>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card className={classes.infoCardContainer} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Account info
                    </Typography>
                    <List className={classes.root}>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="User Name"
                          secondary={userInfo && userInfo.userName}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Login email"
                          secondary={userInfo && userInfo.loginEmail}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                          secondaryTypographyProps={{
                            style: {
                              textTransform: 'lowercase',
                            },
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Signup Method"
                          secondary={userInfo && userInfo.signupMethod}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email verified"
                          secondary={userInfo && userInfo.isEmailVerified ? 'Yes' : 'No'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Created on"
                          secondary={userInfo && format(new Date(userInfo.created.toDate()), 'dd - MM - yyyy')}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Last Login"
                          secondary={userInfo && userInfo.lastLogin && format(new Date(userInfo.lastLogin.toDate()), 'dd - MM - yyyy')}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Invitation patch"
                          secondary={userInfo && userInfo.patchTitle}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        >
                          <a href={`${pageUrl}/invitationsAdmin?patchId=${userInfo.patchId}&&invitationID=${userInfo.invitation}`} rel="noreferrer" style={{ color: '#00abff' }}>View invitation</a>
                        </ListItemText>
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card className={classes.infoCardContainer} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Subscription info
                    </Typography>
                    <List className={classes.root}>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Subscribed"
                          secondary={isSubscribed ? 'Yes' : 'NO'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      {isSubscribed && (
                        <ListItem className={classes.infoCardListItem}>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Subscription ends on"
                            secondary={format(new Date(userInfo.subscription.current_period_end.toDate()), 'dd-MM-yyyy')}
                            classes={{
                              primary: classes.infoListPrimaryText,
                              secondary: classes.infoListSecondryText,
                            }}
                          />
                        </ListItem>
                      )}
                      {isSubscribed && (
                        <ListItem className={classes.infoCardListItem}>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Subscription package"
                            secondary={userInfo.subscription.items[0].plan.interval}
                            classes={{
                              primary: classes.infoListPrimaryText,
                              secondary: classes.infoListSecondryText,
                            }}
                          />
                        </ListItem>
                      )}
                      {isSubscriptionCanceled && (
                        <ListItem className={classes.infoCardListItem}>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Subscription cancel on"
                            secondary={format(new Date(userInfo.subscription.canceled_at.toDate()), 'dd-MM-yyyy')}
                            classes={{
                              primary: classes.infoListPrimaryText,
                              secondary: classes.infoListSecondryText,
                            }}
                          />
                        </ListItem>
                      )}
                      {isSubscribed && (
                        <ListItem className={classes.infoCardListItem}>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText
                            classes={{
                              primary: classes.infoListPrimaryText,
                              secondary: classes.infoListSecondryText,
                            }}
                          >
                            <a href={`https://dashboard.stripe.com/customers/${userInfo.subscription.stripeId}`} target="_blank" rel="noreferrer" style={{ color: '#00abff' }}>View on Stripe</a>
                          </ListItemText>
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card className={classes.infoCardContainer} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Links info
                    </Typography>
                    <List className={classes.root}>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Total Links"
                          secondary={`${totalLinks} Active ${totalActiveLinks}`}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={(
                            <Typography className={classes.primaryTitle} color="textSecondary" gutterBottom>
                              Social links
                            </Typography>
                          )}
                          disableTypography
                          secondary={(
                            <Box>
                              <Typography className={classes.secondaryTitle} color="textSecondary" gutterBottom>
                                {`${socialLinksTotal} active ${activeSocialLinksTotal}`}
                              </Typography>
                              {socialLinksTotal > 0 && (
                                <Box className={classes.linksContainer}>
                                  {
                                    socialLinks.map(link => (
                                      <Box key={link.key} className={`${classes.linkContainer} ${!link.active ? classes.inactiveLinkContainer : ''}`}>
                                        <SocialLinkItem
                                          key={link.key}
                                          link={link.link}
                                          profileType="business"
                                          colorCode={currentTheme.theme === 'dark' ? '#fff' : '#272727'}
                                          color={null}
                                          platform={link.platform}
                                          countClicks={() => true}
                                          defaultLinksToTheme={false}
                                        />
                                        <span>{link.clicked || 0}</span>
                                      </Box>
                                    ))
                                  }
                                </Box>
                              )}
                            </Box>
                          )}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={(
                            <Typography className={classes.primaryTitle} color="textSecondary" gutterBottom>
                              Custom Links
                            </Typography>
                          )}
                          disableTypography
                          secondary={(
                            <Box>
                              <Typography className={classes.secondaryTitle} color="textSecondary" gutterBottom>
                                {`${customLinksTotal} active ${activeCustomLinksTotal}`}
                              </Typography>
                              {customLinksTotal > 0 && (
                                <Box className={classes.linksContainer}>
                                  {
                                    customLinks.map(link => (
                                      <Box key={link.key} className={`${classes.linkContainer} ${!link.active ? classes.inactiveLinkContainer : ''}`}>
                                        <a href={link.link} target="_blank" rel="noreferrer">{link.linkTitle}</a>
                                        <span>{link.clicked || 0}</span>
                                      </Box>
                                    ))
                                  }
                                </Box>
                              )}
                            </Box>
                          )}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          primary={(
                            <Typography className={classes.primaryTitle} color="textSecondary" gutterBottom>
                              Redirect
                            </Typography>
                          )}
                          secondary={userInfo.redirect ? (
                            <a href={userInfo.redirect} target="_blank" rel="noreferrer">{userInfo.redirect}</a>
                          ) : (
                            <Typography className={classes.secondaryTitle} color="textSecondary" gutterBottom>
                              NO
                            </Typography>
                          )}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card className={classes.infoCardContainer} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Theme info
                    </Typography>
                    <List className={classes.root}>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Layout"
                          secondary={(userInfo && userInfo.themeSettings && userInfo.themeSettings.layout) && userInfo.themeSettings.layout}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Theme"
                          secondary={(userInfo && userInfo.themeSettings && userInfo.themeSettings.theme) && userInfo.themeSettings.theme}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Theme color"
                          secondary={userInfo && userInfo.themeSettings && userInfo.themeSettings.selectedColor && userInfo.themeSettings.selectedColor.code ? (
                            <span className={classes.selectedColorContainer} style={{ backgroundColor: userInfo.themeSettings.selectedColor.code }}>&nbsp;</span>
                          ) : 'NA'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card className={classes.infoCardContainer} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Connections info
                    </Typography>
                    <List className={classes.root}>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Visits"
                          secondary={userInfo && userInfo.visits}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Added to contacts"
                          secondary={userInfo && userInfo.addedToContacts}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Connections"
                          secondary={userInfo && userInfo.connectionsCount}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              {((userInfo && userInfo.settings.accountType === 'master') || (userInfo && userInfo.hasMasterAccount)) && (
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <Card className={classes.infoCardContainer} variant="outlined">
                    <CardContent>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Master info
                      </Typography>
                      <List className={classes.root}>
                        {userInfo && userInfo.settings.accountType === 'master' && (
                          <ListItem className={classes.infoCardListItem}>
                            <ListItemIcon>
                              <InfoIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Is Team Master"
                              secondary="Yes"
                              classes={{
                                primary: classes.infoListPrimaryText,
                                secondary: classes.infoListSecondryText,
                              }}
                            />
                          </ListItem>
                        )}
                        {userInfo && userInfo && userInfo.hasMasterAccount && (
                          <ListItem className={classes.infoCardListItem}>
                            <ListItemIcon>
                              <InfoIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary="Has Team Master"
                              secondary="Yes"
                              classes={{
                                primary: classes.infoListPrimaryText,
                                secondary: classes.infoListSecondryText,
                              }}
                            />
                          </ListItem>
                        )}
                        {userInfo && userInfo && userInfo.hasMasterAccount && userInfo.masterData && (
                          <ListItem className={classes.infoCardListItem}>
                            <ListItemIcon>
                              <InfoIcon />
                            </ListItemIcon>
                            <ListItemText
                              disableTypography
                              primary={(
                                <Typography className={classes.primaryTitle} color="textSecondary" gutterBottom>
                                  Master
                                </Typography>
                              )}
                              secondary={(<a href={userInfo.masterData.urlSuffix} target="_blank" rel="noreferrer">{`${userInfo.masterData.firstName || ''} ${userInfo.masterData.lastName || ''}`}</a>)}
                              classes={{
                                primary: classes.infoListPrimaryText,
                                secondary: classes.infoListSecondryText,
                              }}
                            />
                          </ListItem>
                        )}
                        {userInfo && userInfo.settings.accountType === 'master' && (
                          <ListItem className={classes.infoCardListItem}>
                            <ListItemIcon>
                              <InfoIcon />
                            </ListItemIcon>
                            <ListItemText
                              primary={(
                                <Typography className={classes.primaryTitle} color="textSecondary" gutterBottom>
                                  Team Members
                                </Typography>
                              )}
                              disableTypography
                              secondary={(userInfo && userInfo.teamMembers) && (
                                <Box>
                                  <Typography className={classes.secondaryTitle} color="textSecondary" gutterBottom>
                                    {userInfo.teamMembers.length}
                                  </Typography>
                                  <Box className={classes.teamMembersContainer}>
                                    {userInfo.teamMembers.map(member => (
                                      <Box key={member.urlSuffix}>
                                        <a href={member.urlSuffix} target="_blank" rel="noreferrer">{`${member.firstName || ''} ${member.lastName || ''}`}</a>
                                        <br />
                                      </Box>
                                    ))}
                                  </Box>
                                </Box>
                              )}
                              classes={{
                                primary: classes.infoListPrimaryText,
                                secondary: classes.infoListSecondryText,
                              }}
                            />
                          </ListItem>
                        )}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              <Grid item lg={4} md={4} sm={6} xs={12}>
                <Card className={classes.infoCardContainer} variant="outlined">
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Privacy info
                    </Typography>
                    <List className={classes.root}>
                      <ListItem className={classes.infoCardListItem}>
                        <ListItemIcon>
                          <InfoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Has Key"
                          secondary={userInfo && userInfo.profilePasswordActive ? 'Yes' : 'NO'}
                          classes={{
                            primary: classes.infoListPrimaryText,
                            secondary: classes.infoListSecondryText,
                          }}
                        />
                      </ListItem>
                      {userInfo && userInfo.profilePasswordActive && (
                        <ListItem className={classes.infoCardListItem}>
                          <ListItemIcon>
                            <InfoIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Key"
                            secondary={userInfo && userInfo.profilePassword && (
                              <span style={{ textTransform: 'none' }}>{userInfo.profilePassword}</span>
                            )}
                            classes={{
                              primary: classes.infoListPrimaryText,
                              secondary: classes.infoListSecondryText,
                            }}
                          />
                        </ListItem>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

AccountInfo.defaultProps = {
  dialogOpen: false,
  userInfo: null,
}

AccountInfo.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  userInfo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default AccountInfo
