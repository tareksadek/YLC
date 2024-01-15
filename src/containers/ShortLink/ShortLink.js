import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { getCardBySecretCode } from '../../API/cards'

const ShortLink = () => {
  const { shortLink } = useParams()
  const history = useHistory()

  const [dataLoading, setDataLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      (async () => {
        setDataLoading(true)
        try {
          const cardData = await getCardBySecretCode(shortLink.split('_').pop())
          if (cardData && cardData.urlSuffix) {
            history.push(`/profile/${cardData.urlSuffix}`)
          } else {
            history.push('/')
          }
          setTimeout(() => setDataLoading(false), 1000)
        } catch (err) {
          throw new Error(err)
        }
      })()
    }
    return () => {
      mounted = false
    }
  }, [shortLink, history])

  if (dataLoading) {
    return <LoadingBackdrop withoutProgress />
  }

  return (
    <Box>
      &nbsp;
    </Box>
  )
}

export default ShortLink
