import React from 'react'
import Proptypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { useLanguage } from '../../hooks/useLang'
import { getFirebaseFunctions } from '../../API/firebase'
import { setUserClaims } from '../../API/users'

import { heroStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'

const Hero = ({ onAddInvitationCode, onContact }) => {
  const classes = heroStyles()
  const buttons = buttonStyles()
  const language = useLanguage()
  // const [processingRequest, setProcessingRequest] = useState(false)
  //
  // console.log(processingRequest);

  const makeAdminHandler = async email => {
    const dbFunctions = await getFirebaseFunctions()
    const addAdminRole = dbFunctions.httpsCallable('addSuperAdminRole')
    try {
      const res = await addAdminRole({ email })
      return res.data.message
    } catch (err) {
      throw new Error(err)
    }
  }

  const changeUserClaim = async (userId, claim) => {
    setUserClaims(userId, claim)
  }

  const changeAdminStatusHandler = async () => {
    let changeMessage
    try {
      changeMessage = await makeAdminHandler('ylcteams@gmail.com')
      await changeUserClaim('ve52aT82loc2ye37PWIt0wxYoPT2', { superAdmin: true, firebaseRole: 'subscriber' })
      console.log(changeMessage);
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <Box className={classes.hero} mt={6} dir={language.direction}>
      <Typography align="center" component="p" variant="body1" className={`${classes.heroParagraph} ${language.direction === 'rtl' ? classes.arabicFont : ''}`}>
        GCV Cards
      </Typography>
      <Box className={classes.buttonContainer}>
        <Button size="small" className={`${buttons.defaultButton} ${language.direction === 'rtl' ? classes.arabicFont : ''}`} onClick={() => onAddInvitationCode()}>
          Enter invitation code
        </Button>
        <br />
        <Button size="small" className={`${language.direction === 'rtl' ? classes.arabicFont : ''}`} onClick={() => onContact()}>
          Contact us for invitation code
        </Button>
        <Button size="small" className={`${language.direction === 'rtl' ? classes.arabicFont : ''}`} onClick={() => changeAdminStatusHandler()}>
          make admin
        </Button>
      </Box>
    </Box>
  )
}

Hero.propTypes = {
  onAddInvitationCode: Proptypes.func.isRequired,
  onContact: Proptypes.func.isRequired,
}

export default Hero
