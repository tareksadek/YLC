import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import DateRangeIcon from '@material-ui/icons/DateRange'
import FaceIcon from '@material-ui/icons/Face'

import Skeleton from '@material-ui/lab/Skeleton'

import { getFirebaseStorage } from '../../API/firebase'

import { layoutStyles } from '../../theme/layout'
import { connectionStyles } from './styles'

const OfferCard = ({
  offer,
  onRemove,
  onViewOffer,
  onEditOffer,
  disableRemove,
  disableEdit,
}) => {
  const classes = connectionStyles()
  const layoutClasses = layoutStyles()

  const [offerMenuAnchor, setOfferMenuAnchor] = useState(null)
  const [currentOfferImage, setCurrentOfferImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true

    if (mounted && offer.addedOn) {
      (async () => {
        setLoading(true)
        if (offer.image) {
          const offerImage = await getFirebaseStorage().ref(`offers/${offer.image}`).getDownloadURL()
          setCurrentOfferImage(offerImage)
        }
        setLoading(false)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offer.addedOn, offer.image])

  const openOfferMenu = e => {
    e.stopPropagation()
    setOfferMenuAnchor(e.currentTarget)
  }

  const closeOfferMenu = e => {
    e.stopPropagation()
    setOfferMenuAnchor(null)
  }

  const viewDetails = (e, offerData) => {
    closeOfferMenu(e)
    onViewOffer(offerData)
  }

  const editDetails = (e, offerData) => {
    closeOfferMenu(e)
    onEditOffer(offerData)
  }

  const removeOffer = (e, offerData) => {
    closeOfferMenu(e)
    onRemove(offerData)
  }

  return (
    <ListItem className={classes.connectionItemContainer}>
      {loading ? (
        <Box className={classes.FollowerSkeleton}>
          <Skeleton className={layoutClasses.skeleton} animation="wave" variant="circle" width={40} height={40} />
          <Skeleton className={layoutClasses.skeleton} animation="wave" height={15} width="30%" style={{ marginLeft: 8 }} />
        </Box>
      ) : (
        <>
          {currentOfferImage && (
            <ListItemAvatar className={classes.connectionItemAvatarContainer}>
              <Avatar variant="rounded" className={classes.connectionItemAvatar} src={currentOfferImage} />
            </ListItemAvatar>
          )}
          <ListItemText
            disableTypography
            className={classes.connectionItemTextContainer}
            primary={(
              <Box className={classes.connectionName}>
                <Typography component="p" variant="body1" className={classes.connectionNameText}>
                  {offer.title}
                </Typography>
              </Box>
            )}
            secondary={(
              <Box className={classes.connectionDetails}>
                <Typography component="p" variant="body1">
                  {offer.description}
                </Typography>
                <Box className={classes.conectionDetailsChipsContainer}>
                  {offer && (
                    <Chip
                      size="small"
                      icon={<CheckCircleIcon />}
                      label={offer.active ? 'Active' : 'Inactive'}
                      color={offer.active ? '#00c1af' : '#ccc'}
                    />
                  )}
                  {offer && offer.oldPrice && (
                    <Chip
                      size="small"
                      icon={<MonetizationOnIcon />}
                      label={`Old price: ${offer.oldPrice}`}
                      color={offer.active ? '#00c1af' : '#ccc'}
                    />
                  )}
                  {offer && offer.newPrice && (
                    <Chip
                      size="small"
                      icon={<MonetizationOnIcon />}
                      label={`New price: ${offer.newPrice}`}
                      color={offer.active ? '#00c1af' : '#ccc'}
                    />
                  )}
                  {offer && offer.startDate && (
                    <Chip
                      size="small"
                      icon={<DateRangeIcon />}
                      label={`Starts: ${format(offer.startDate.toDate(), 'dd-MM-yyyy')}`}
                      color={offer.active ? '#00c1af' : '#ccc'}
                    />
                  )}
                  {offer && offer.endDate && (
                    <Chip
                      size="small"
                      icon={<DateRangeIcon />}
                      label={`Ends: ${format(offer.endDate.toDate(), 'dd-MM-yyyy')}`}
                      color={offer.active ? '#00c1af' : '#ccc'}
                    />
                  )}
                  {offer && offer.limit && (
                    <Chip
                      size="small"
                      icon={<FaceIcon />}
                      label={`Limited to: ${offer.limit} clients`}
                      color={offer.active ? '#00c1af' : '#ccc'}
                    />
                  )}
                </Box>
              </Box>
            )}
          />
          <ListItemSecondaryAction className={classes.connectionItemActionContainer}>
            <IconButton aria-label="edit" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={e => openOfferMenu(e)}>
              <MoreVertIcon color="secondary" fontSize="small" />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={offerMenuAnchor}
              keepMounted
              open={Boolean(offerMenuAnchor)}
              onClose={closeOfferMenu}
              classes={{ paper: layoutClasses.menu }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={e => viewDetails(e, offer)} className={classes.cardMenuButton}>View details</MenuItem>
              {!disableEdit && (
                <MenuItem onClick={e => editDetails(e, offer)} className={classes.cardMenuButton}>Edit details</MenuItem>
              )}
              {!disableRemove && (
                <MenuItem onClick={e => removeOffer(e, offer)} className={classes.cardMenuButton}>Delete</MenuItem>
              )}
            </Menu>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  )
}

OfferCard.defaultProps = {
  offer: null,
  disableRemove: false,
  disableEdit: false,
}

OfferCard.propTypes = {
  offer: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onRemove: PropTypes.func.isRequired,
  onViewOffer: PropTypes.func.isRequired,
  onEditOffer: PropTypes.func.isRequired,
  disableRemove: PropTypes.bool,
  disableEdit: PropTypes.bool,
}

export default OfferCard
