import React from 'react'
import { Link } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

import { useLanguage } from '../hooks/useLang'
import { useColor } from '../hooks/useDarkMode'

import * as vars from '../utilities/appVars'

import { footerStyles } from './styles'

const AppFooter = () => {
  const classes = footerStyles()
  const language = useLanguage()
  const color = useColor()

  return (
    <Box className={classes.container}>
      <Typography variant="body1" component="p" align="center" className={classes.title} style={{ margin: '0 auto' }}>
        <a href={language.languageVars.appParentDomain} target="_blank" rel="noreferrer">{language.languageVars.appName}</a>
        &nbsp;&copy;2021
      </Typography>
      <List component="nav" aria-labelledby="footer navigation" className={classes.linkList} dir={language.direction}>
        {vars.footerLinks.map(({ linkfor, path }) => (
          <Link to={path} key={linkfor} className={classes.linkText}>
            <ListItem button>
              <ListItemText
                primaryTypographyProps={{
                  classes: {
                    body1: language.direction === 'rtl' ? classes.arabicFont : '',
                  },
                }}
                className={language.direction === 'rtl' ? classes.arabicFont : ''}
                primary={language.languageVars.footer.buttons[linkfor]}
                style={{
                  color: color.color.code,
                }}
              />
            </ListItem>
          </Link>
        ))}
        <a href={`mailto:${vars.CONTACT_EMAIL}`} style={{ textDecoration: 'none', fontSize: '0.8rem', opacity: 0.5 }}>
          <ListItem>
            <ListItemText
              primaryTypographyProps={{
                classes: {
                  body1: language.direction === 'rtl' ? classes.arabicFont : '',
                },
              }}
              className={language.direction === 'rtl' ? classes.arabicFont : ''}
              primary={language.languageVars.footer.buttons.contact}
              style={{
                color: color.color.code,
              }}
            />
          </ListItem>
        </a>
      </List>
    </Box>
  )
}

export default AppFooter
