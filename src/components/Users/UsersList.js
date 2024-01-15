import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { listStyles } from './styles'

const UserCard = lazy(() => import('./UserCard'))
const UserCardSkeleton = lazy(() => import('./UserCardSkeleton'))

const UsersList = ({
  users,
  loading,
  grid,
  openQrdialog,
  openAccountInfo,
  openChangeEmailDialog,
  openChangePackageDialog,
  sendWelcomeEmail,
  deleteUser,
  changeActiveState,
}) => {
  const classes = listStyles()

  console.log(users);

  const createUsersList = () => {
    let usersList = []
    if (users) {
      usersList = users.map(user => (
        <Grid item lg={grid.lg} md={grid.md} sm={grid.sm} xs={grid.xs} key={user.email}>
          <Suspense fallback="Loading...">
            <UserCard
              userInfo={user}
              loading={loading}
              openQrdialog={openQrdialog}
              openAccountInfo={openAccountInfo}
              openChangeEmailDialog={openChangeEmailDialog}
              openChangePackageDialog={openChangePackageDialog}
              sendWelcomeEmail={sendWelcomeEmail}
              deleteUser={deleteUser}
              changeActiveState={changeActiveState}
            />
          </Suspense>
        </Grid>
      ))
    } else {
      usersList = [...Array(12)].map(() => (
        <Grid item lg={3} sm={4} xs={6} key={Math.floor(Math.random() * 1000000)}><Suspense fallback="Loading..."><UserCardSkeleton /></Suspense></Grid>
      ))
    }

    return usersList
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {createUsersList()}
      </Grid>
    </div>
  )
}

UsersList.defaultProps = {
  users: null,
  loading: false,
  grid: null,
}

UsersList.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  grid: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
  openQrdialog: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  changeActiveState: PropTypes.func.isRequired,
  openAccountInfo: PropTypes.func.isRequired,
  openChangeEmailDialog: PropTypes.func.isRequired,
  openChangePackageDialog: PropTypes.func.isRequired,
  sendWelcomeEmail: PropTypes.func.isRequired,
}

export default UsersList
