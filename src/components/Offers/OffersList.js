import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import { listStyles } from './styles'

import OfferCard from './OfferCard'
import OfferCardSkeleton from './OfferCardSkeleton'

const OffersList = ({
  offers,
  onRemove,
  onOpenDetailsDialog,
  onOpenEditDialog,
  disableRemove,
  disableEdit,
}) => {
  const classes = listStyles()

  const createOffersList = () => {
    let offersList = []
    if (offers) {
      offersList = offers.map(offer => (
        <OfferCard
          key={offer.addedOn.seconds || offer.addedOn}
          offer={offer}
          onRemove={onRemove}
          onViewOffer={onOpenDetailsDialog}
          onEditOffer={onOpenEditDialog}
          disableRemove={disableRemove}
          disableEdit={disableEdit}
        />
      ))
    } else {
      offersList = [...Array(12)].map(() => (
        <OfferCardSkeleton key={Math.floor(Math.random() * 1000000)} />
      ))
    }

    return offersList
  }

  return (
    <div className={classes.root}>
      <List className={classes.connectionsList}>
        {createOffersList()}
      </List>
    </div>
  )
}

OffersList.defaultProps = {
  offers: null,
  disableRemove: false,
  disableEdit: false,
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onRemove: PropTypes.func.isRequired,
  onOpenDetailsDialog: PropTypes.func.isRequired,
  onOpenEditDialog: PropTypes.func.isRequired,
  disableRemove: PropTypes.bool,
  disableEdit: PropTypes.bool,
}

export default OffersList
