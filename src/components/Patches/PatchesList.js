import React, { lazy, Suspense } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { listStyles } from './styles'

const PatchCard = lazy(() => import('./PatchCard'))
const PatchCardSkeleton = lazy(() => import('./PatchCardSkeleton'))

const PatchesList = ({
  patches,
  loading,
  grid,
  openChangeStatusDialog,
  deletePatch,
}) => {
  const classes = listStyles()

  const createPatchesList = () => {
    let patchesList = []
    if (patches) {
      patchesList = patches.map(patch => (
        <Grid item lg={grid.lg} md={grid.md} sm={grid.sm} xs={grid.xs} key={patch.patchId}>
          <Suspense fallback="Loading...">
            <PatchCard
              patchInfo={patch}
              loading={loading}
              openChangeStatusDialog={openChangeStatusDialog}
              deletePatch={deletePatch}
            />
          </Suspense>
        </Grid>
      ))
    } else {
      patchesList = [...Array(12)].map(() => (
        <Grid item lg={3} sm={4} xs={6} key={Math.floor(Math.random() * 1000000)}><Suspense fallback="Loading..."><PatchCardSkeleton /></Suspense></Grid>
      ))
    }

    return patchesList
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {createPatchesList()}
      </Grid>
    </div>
  )
}

PatchesList.defaultProps = {
  patches: null,
  loading: false,
  grid: null,
}

PatchesList.propTypes = {
  loading: PropTypes.bool,
  patches: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
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
  openChangeStatusDialog: PropTypes.func.isRequired,
  deletePatch: PropTypes.func.isRequired,
}

export default PatchesList
