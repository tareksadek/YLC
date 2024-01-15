import { useEffect, useState } from 'react'
import { getInvitationByCode } from '../API/invitations'

export const useInvitation = () => {
  const [invitationCode, setInvitationCode] = useState(null)
  const [invitationCodeStatus, setInvitationCodeStatus] = useState(null)

  const checkInvitationCodeValidity = invitationObj => {
    console.log(invitationObj);
    if (invitationObj.used) {
      setInvitationCodeStatus('used')
    } else if (invitationObj.expirationDate.toDate() < new Date()) {
      setInvitationCodeStatus('expired')
    } else {
      setInvitationCodeStatus('valid')
      setInvitationCode(invitationObj.code)
    }
  }

  const checkInvitationCodeExists = async code => {
    let codeExists = false
    try {
      codeExists = await getInvitationByCode(code)
      console.log(codeExists);
    } catch (err) {
      throw new Error(err)
    }

    return codeExists
  }

  useEffect(() => {
    let mounted = true
    const invitationCodeInStorage = window.localStorage.getItem('invitationCode')
    if (invitationCodeInStorage && invitationCodeInStorage !== 'null') {
      setInvitationCode(invitationCodeInStorage)

      if (mounted) {
        (async () => {
          const invitationCodeExists = await checkInvitationCodeExists(invitationCodeInStorage)
          if (invitationCodeExists) {
            checkInvitationCodeValidity(invitationCodeExists)
          } else {
            setInvitationCodeStatus('invalid')
          }
        })()
      }
    }
    return () => { mounted = false }
  }, []);

  return {
    invitationCode,
    invitationCodeStatus,
    checkInvitationCodeValidity,
    checkInvitationCodeExists,
  }
}
