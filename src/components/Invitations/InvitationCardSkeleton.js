import React from 'react'

import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Skeleton from '@material-ui/lab/Skeleton'

import { invitationStyles } from './styles'

const InvitationCardSkeleton = () => {
  const classes = invitationStyles()

  return (
    <ListItem>
      <Card className={classes.connectionSkeletonContainer}>

        <Skeleton animation="wave" variant="rect" className={classes.media} />

        <CardContent>
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        </CardContent>
      </Card>
    </ListItem>
  )
}

export default InvitationCardSkeleton
