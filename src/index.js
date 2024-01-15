import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux'

import WebFont from 'webfontloader'

import { SnackbarProvider } from 'notistack'

import App from './App'

// import * as serviceWorker from './serviceWorkerRegistration'

import errorReducer from './store/reducers/error'
import notificationReducer from './store/reducers/notification'
import cardsReducer from './store/reducers/cards'
import profilesReducer from './store/reducers/profile'
import usersReducer from './store/reducers/users'
import invitationReducer from './store/reducers/invitations'
import linksReducer from './store/reducers/links'
import counterReducer from './store/reducers/counter'
import invitationPatchesReducer from './store/reducers/invitationPatches'
import teamMembersReducer from './store/reducers/teamMembers'
import connectionReducer from './store/reducers/connections'
import createAccountProcessorReducer from './store/reducers/createAccountProcessor'

WebFont.load({
  google: {
    families: ['Roboto:300,400,600,700,800&display=swap'],
  },
  active: () => {
    sessionStorage.fontsLoaded = true
  },
})

// const isChrome = navigator.userAgent.indexOf('Chrome') !== -1

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 }) : null || compose

const rootReducer = combineReducers({
  errorCenter: errorReducer,
  notification: notificationReducer,
  cards: cardsReducer,
  users: usersReducer,
  invitations: invitationReducer,
  links: linksReducer,
  counter: counterReducer,
  patches: invitationPatchesReducer,
  teamMembers: teamMembersReducer,
  connections: connectionReducer,
  profiles: profilesReducer,
  createAccountProcessor: createAccountProcessorReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxThunk)),
)

const app = (
  <SnackbarProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
)

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const root = document.getElementById('root')
let renderMethod
if (root && root.innerHTML !== '') {
  renderMethod = ReactDOM.hydrate
} else {
  renderMethod = ReactDOM.render
}

renderMethod(
  <BrowserRouter>
    {app}
  </BrowserRouter>,
  document.getElementById('root'),
)
// serviceWorker.register()
