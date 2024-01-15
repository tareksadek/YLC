import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { Box } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

import { searchFilterStyles } from './styles'

const CardList = lazy(() => import('../../components/Cards/CardList'))
const SearchCards = lazy(() => import('../../components/Cards/SearchCards'))
const FilterCards = lazy(() => import('../../components/Cards/FilterCards'))
const DetailsDialog = lazy(() => import('../../components/Cards/DetailsDialog'))

const Cards = ({
  onLoadCards,
  loading,
  cards,
  cardsCount,
  cardsPerPage,
  gridLayout,
}) => {
  const location = useLocation()
  const { cardIn } = queryString.parse(location.search)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchedCards, setSearchedCards] = useState(null)
  const [filterededCards, setFilteredCards] = useState(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cardInfo, setCardInfo] = useState(null)
  const cardsGrid = gridLayout || {
    lg: 3, md: 4, sm: 6, xs: 6,
  }
  const classes = searchFilterStyles()
  const language = useLanguage()

  useEffect(() => {
    let mounted = true

    if (mounted && !cards) {
      (async () => { await onLoadCards() })()
    }

    if (cardIn && cards && cardIn < cards.length) {
      setDialogOpen(true)
      setCardInfo(cards[cardIn])
    }

    return () => { mounted = false }
  }, [cardIn, cards, onLoadCards])

  const searchCardsHandler = searchKeyword => {
    const searchFor = searchKeyword.toLowerCase()

    if (searchFor.length >= 3) {
      setSearchedCards(cards.filter(card => {
        const searchName = language.direction === 'rtl' ? card.nameAr : card.name
        if (searchName.toLowerCase().includes(searchFor)) {
          return true
        }

        return false
      }))
    } else {
      setSearchedCards(null)
      setCurrentPage(1)
    }

    return false
  }

  const clearSearchHandler = () => {
    setSearchedCards(null)
  }

  const filterCardsHandler = filterValue => {
    const filterBy = filterValue.toLowerCase()

    setFilteredCards(cards.filter(card => {
      if (card.type.toLowerCase() === filterBy) {
        return true
      }

      return false
    }))

    return false
  }

  const clearFilterHandler = () => {
    setFilteredCards(null)
  }

  const pageCards = pageNumber => {
    let cardsInPage

    if (searchedCards) {
      return searchedCards
    }

    if (filterededCards) {
      return filterededCards
    }

    if (cards) {
      cardsInPage = cards.slice(((pageNumber - 1) * (cardsPerPage)), ((pageNumber) * (cardsPerPage)))
    }

    return cardsInPage
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageCards(page)
  }

  const openDetailsDialogHandler = info => {
    setDialogOpen(true)
    setCardInfo(info)
  }

  const closeDialogHandler = () => {
    setDialogOpen(false)
  }

  return (
    <Box>
      <Box className={classes.filterContainer} dir={language.direction}>
        <Suspense fallback="Constructing search elements...">
          <SearchCards onSearch={searchCardsHandler} onClear={clearSearchHandler} />
          <FilterCards onFilter={filterCardsHandler} onClear={clearFilterHandler} />
        </Suspense>
      </Box>
      <Suspense fallback="Loading cards...">
        <CardList
          cards={pageCards(currentPage)}
          loading={loading}
          grid={cardsGrid}
          showDetails={openDetailsDialogHandler}
        />
      </Suspense>
      {(!searchedCards && !filterededCards) && <Box mt={5}><Pagination count={Math.ceil(cardsCount / cardsPerPage)} variant="outlined" onChange={paginationChangeHandler} /></Box>}
      <Suspense fallback="Loading...">
        <DetailsDialog dialogOpen={dialogOpen} closeDialog={closeDialogHandler} cardInfo={cardInfo} />
      </Suspense>
    </Box>
  )
}

const mapStateToProps = state => ({
  loading: state.cards.loading,
  cards: state.cards.cards,
  cardsCount: state.cards.cardsCount,
  cardsPerPage: state.cards.cardsPerPage,
})

const mapDispatchToProps = dispatch => ({
  onLoadCards: () => dispatch(actions.loadCards()),
})

Cards.defaultProps = {
  loading: false,
  cards: null,
  cardsCount: 0,
  cardsPerPage: 0,
  gridLayout: null,
}

Cards.propTypes = {
  loading: PropTypes.bool,
  cards: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  cardsCount: PropTypes.number,
  cardsPerPage: PropTypes.number,
  onLoadCards: PropTypes.func.isRequired,
  gridLayout: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])),
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)
