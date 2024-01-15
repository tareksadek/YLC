import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'

import { cardStyles } from './styles'

const UserCardSkeleton = () => {
  const classes = cardStyles()

  return (
    <Card className={classes.card}>

      <Skeleton animation="wave" variant="rect" className={classes.media} />

      <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" />
        </>
      </CardContent>
    </Card>
  )
}

export default UserCardSkeleton
