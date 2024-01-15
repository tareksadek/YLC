import React, {
  useState, useEffect, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import emailjs from 'emailjs-com'

import { DataGrid } from '@mui/x-data-grid'

import { format } from 'date-fns'

import QRCode from 'react-qr-code'

import { svgAsDataUri } from 'save-svg-as-png'

import InfoIcon from '@material-ui/icons/Info'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import EditIcon from '@material-ui/icons/Edit'
import SettingsIcon from '@material-ui/icons/Settings'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { getFirebaseFunctions, getFirebaseStorage } from '../../API/firebase'
import { deleteUserById, updateAccountActivity, changeUserCreatedMethod } from '../../API/users'
import {
  deleteCardByuserId, getCardById, getTeamCards, getMasterCardByInvitation, changeUserProfileCreatedMethod,
} from '../../API/cards'
import { getInvitationByCode } from '../../API/invitations'
import { getPatchByPatchId } from '../../API/invitationPatches'
import { getSubscribedUser } from '../../API/subscriptions'
import { getCardConnections } from '../../API/connections'

import * as actions from '../../store/actions'

import { usersStyles, gridStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

import { capitalizeFirst } from '../../utilities/utils'

import * as vars from '../../utilities/appVars'

const AccountInfo = lazy(() => import('../../components/Users/AccountInfo'))
const AccountConnections = lazy(() => import('../../components/Users/AccountConnections'))
const AccountFollowers = lazy(() => import('../../components/Users/AccountFollowers'))
const AccountFollowing = lazy(() => import('../../components/Users/AccountFollowing'))
const EditInfo = lazy(() => import('../../components/Users/EditInfo'))
const EditContacts = lazy(() => import('../../components/Users/EditContacts'))
const EditPicture = lazy(() => import('../../components/Users/EditPicture'))
const EditLogo = lazy(() => import('../../components/Users/EditLogo'))
const EditVideo = lazy(() => import('../../components/Users/EditVideo'))
const EditDesign = lazy(() => import('../../components/Users/EditDesign'))
const EditLinks = lazy(() => import('../../components/Users/EditLinks'))
const CreateUser = lazy(() => import('../../components/Users/CreateUser'))
const ChangeEmail = lazy(() => import('../../components/Users/ChangeEmail'))
const ChangePackage = lazy(() => import('../../components/Users/ChangePackage'))
const Search = lazy(() => import('../../components/Users/Search'))
const AdvancedSearch = lazy(() => import('../../components/Users/AdvancedSearch'))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Users = ({
  onLoadUsers,
  onLoadUsersByArguments,
  onLoadUsersByKeyword,
  onClearCard,
  onClearLinks,
  loading,
  users,
  userCount,
  usersPerPage,
  onSetNotification,
  switchTheme,
}) => {
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false)
  const [changeEmailDialogOpen, setChangeEmailDialogOpen] = useState(false)
  const [changePackageDialogOpen, setChangePackageDialogOpen] = useState(false)
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useState(false)
  const [accountInfo, setAccountInfo] = useState(null)
  const [accountConnectionsDialogOpen, setAccountConnectionsDialogOpen] = useState(false)
  const [connections, setConnections] = useState(null)
  const [memberConnectionsLoading, setMemberConnectionsLoading] = useState(false)
  const [accountFollowersDialogOpen, setAccountFollowersDialogOpen] = useState(false)
  const [accountFollowingDialogOpen, setAccountFollowingDialogOpen] = useState(false)
  const [accountConnectionsInfo, setAccountConnectionsInfo] = useState(null)
  const [editInfoDialogOpen, setEditInfoDialogOpen] = useState(false)
  const [editContactsDialogOpen, setEditContactsDialogOpen] = useState(false)
  const [editPictureDialogOpen, setEditPictureDialogOpen] = useState(false)
  const [editLogoDialogOpen, setEditLogoDialogOpen] = useState(false)
  const [editVideoDialogOpen, setEditVideoDialogOpen] = useState(false)
  const [editDesignDialogOpen, setEditDesignDialogOpen] = useState(false)
  const [editLinksDialogOpen, setEditLinksDialogOpen] = useState(false)
  const [userId, setUserId] = useState(null)
  const [loadingBackdrop, setLoadingBackdrop] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [searchingUser, setSearchingUsers] = useState(false)
  const [viewMenuAnchor, setViewMenuAnchor] = useState(null)
  const [editMenuAnchor, setEditMenuAnchor] = useState(null)
  const [optionsMenuAnchor, setOptionsMenuAnchor] = useState(null)
  const [menuUser, setMenuUser] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [searchForm, setSearchForm] = useState({
    searchKeyword: createFormElementObj('input', 'Search Keyword', { type: 'text', name: 'searchKeyword', placeholder: 'Search Keyword' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: 6,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    searchFor: createFormElementObj('select', 'Search by', { name: 'search_by' }, 'email', [
      { value: 'email', display: 'User Email' },
      { value: 'userName', display: 'User Name' },
      { value: 'invitationPatch', display: 'Patch ID' },
      { value: 'accountSecret', display: 'Secret Code' },
    ], { required: false }, false, {
      xs: 12,
      sm: 6,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
    orderBy: createFormElementObj('select', 'Order By', { name: 'order_by' }, 'created', [
      { value: 'userName', display: 'User Name' },
      { value: 'created', display: 'Created Date' },
    ], { required: false }, false, {
      xs: 12,
      sm: 6,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
    order: createFormElementObj('select', 'Order', { name: 'order' }, 'desc', [
      { value: 'asc', display: 'Oldest First' },
      { value: 'desc', display: 'Newest First' },
    ], { required: false }, false, {
      xs: 12,
      sm: 6,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
  })
  const [advancedSearchForm, setAdvancedSearchForm] = useState({
    sortBy: createFormElementObj('select', 'Find Users By', { name: 'sortBy' }, 'created', [
      { value: 'created', display: 'Created Date' },
      { value: 'firstLogin', display: 'First Login' },
      { value: 'lastLogin', display: 'Last Login' },
    ], { required: false }, false, {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
    startDate: createFormElementObj('date', 'Between Start Date', { type: 'text', name: 'startDate', placeholder: 'Between Start Date' }, new Date('2021-08-30'), null, { required: false }, false,
      {
        xs: 12,
        sm: 6,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    endDate: createFormElementObj('date', 'And End Date', { type: 'text', name: 'endDate', placeholder: 'And End Date' }, new Date(), null, { required: false }, false,
      {
        xs: 12,
        sm: 6,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    order: createFormElementObj('select', 'Order', { name: 'order' }, 'desc', [
      { value: 'asc', display: 'Oldest First' },
      { value: 'desc', display: 'Newest First' },
    ], { required: false }, false, {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
    onlyAdminCreatedAccounts: createFormElementObj('checkbox', 'Only admin created', { type: 'checkbox', name: 'onlyAdminCreatedAccounts', placeholder: 'Only admin created' }, false, null, { required: false }, false,
      {
        xs: 12,
        sm: 12,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.users
  const auth = useAuth()
  const history = useHistory()
  const color = useColor()
  const classes = usersStyles()
  const gridClasses = gridStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const { user } = auth
  const pageUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/profile/' : language.languageVars.appProfileURL

  useEffect(() => {
    onClearCard()
    onClearLinks()
  }, [onClearCard, onClearLinks])

  useEffect(() => {
    if (window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const openAccountInfoDialogHandler = async info => {
    setAccountInfoDialogOpen(true)
    let userData = { ...info }
    let masterData = null
    let teamMembers
    let invitationData = null
    let patchData = null
    try {
      const dbFunctions = await getFirebaseFunctions()
      const getUserCall = dbFunctions.httpsCallable('getUser')
      const authUser = await getUserCall(info)
      // console.log(info);
      // console.log(authUser);
      const userCardData = await getCardById(info.userId)
      const subscribedUser = await getSubscribedUser(info.userId)
      if (userCardData.invitationData.code) {
        invitationData = await getInvitationByCode(userCardData.invitationData.code)
        patchData = await getPatchByPatchId(invitationData.patchId)
      }
      if (userCardData.masterId) {
        masterData = await getMasterCardByInvitation(userCardData.masterId)
      }
      if (info.settings.accountType === 'master') {
        teamMembers = await getTeamCards(info.settings.invitationCode)
      }
      // console.log(userCardData);
      // console.log(teamMembers);
      userData = {
        ...userData,
        signupMethod: authUser.data.providerData[0].providerId === 'password' ? 'Email and Password' : 'Google',
        isEmailVerified: authUser.data.emailVerified,
        hasMasterAccount: !!userCardData.masterId,
        masterData,
        themeSettings: userCardData.settings,
        links: userCardData.links,
        redirect: userCardData.redirect,
        connectionsCount: userCardData.connections ? userCardData.connections.length : 0,
        followersCount: userCardData.followers ? userCardData.followers.length : 0,
        followingCount: userCardData.following ? userCardData.following.length : 0,
        addedToContacts: userCardData.clickedNo ? userCardData.clickedNo : 0,
        photo: userCardData.logo,
        firstName: userCardData.firstName,
        lastName: userCardData.lastName,
        email: userCardData.email,
        loginEmail: authUser.data.email,
        phone: userCardData.workPhone,
        organization: userCardData.organization,
        industry: userCardData.career,
        patchTitle: patchData ? patchData.patchTitle : 'NA',
        patchId: invitationData ? invitationData.patchId : null,
        invitation: invitationData ? invitationData.code : null,
        teamMembers,
        profilePassword: info.settings.profilePassword,
        profilePasswordActive: info.settings.profilePasswordActive,
        visits: userCardData.visits || 0,
        subscription: subscribedUser && subscribedUser.length > 0 ? subscribedUser[0] : null,
      }
    } catch (err) {
      throw new Error(err)
    }
    setAccountInfo(userData)
  }

  const closeAccountInfoHandler = () => {
    setAccountInfoDialogOpen(false)
    setAccountInfo(null)
  }

  const openAccountConnectionsDialogHandler = async () => {
    setMemberConnectionsLoading(true)
    setAccountConnectionsDialogOpen(true)
    try {
      const allProfileConnections = await getCardConnections(menuUser.userId)
      setConnections(allProfileConnections)
      setAccountConnectionsInfo({
        userName: menuUser.userName,
        userId: menuUser.userId,
      })
      setMemberConnectionsLoading(false)
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.loadUserConnectionsError,
        type: 'error',
      })
      setMemberConnectionsLoading(false)
    }
  }

  const closeAccountConnectionsHandler = () => {
    setAccountConnectionsDialogOpen(false)
    setAccountConnectionsInfo(null)
    setConnections(null)
  }

  const openAccountFollowersDialogHandler = () => {
    setAccountFollowersDialogOpen(true)
    setAccountConnectionsInfo({
      userName: menuUser.userName,
      userId: menuUser.userId,
    })
  }

  const closeAccountFollowersHandler = () => {
    setAccountFollowersDialogOpen(false)
    setAccountConnectionsInfo(null)
  }

  const openAccountFollowingDialogHandler = () => {
    setAccountFollowingDialogOpen(true)
    setAccountConnectionsInfo({
      userName: menuUser.userName,
      userId: menuUser.userId,
    })
  }

  const closeAccountFollowingHandler = () => {
    setAccountFollowingDialogOpen(false)
    setAccountConnectionsInfo(null)
  }

  const openCreateUserDialogHandler = () => {
    setCreateUserDialogOpen(true)
  }

  const closeUserDialogHandler = () => {
    setCreateUserDialogOpen(false)
  }

  const openChangeEmailDialogHandler = () => {
    setChangeEmailDialogOpen(true)
    setOptionsMenuAnchor(null)
  }

  const closeChangeEmailDialogHandler = () => {
    setChangeEmailDialogOpen(false)
    setAccountInfo(null)
  }

  const openChangePackageDialogHandler = () => {
    setChangePackageDialogOpen(true)
    setOptionsMenuAnchor(null)
  }

  const closeChangePackageDialogHandler = () => {
    setChangePackageDialogOpen(false)
    setAccountInfo(null)
  }

  const openViewMenu = (e, userData) => {
    e.stopPropagation()
    setMenuUser(userData)
    setViewMenuAnchor(e.currentTarget)
  }

  const closeViewMenu = e => {
    e.stopPropagation()
    setMenuUser(null)
    setViewMenuAnchor(null)
  }

  const openEditMenu = (e, userData) => {
    e.stopPropagation()
    setMenuUser(userData)
    setEditMenuAnchor(e.currentTarget)
  }

  const closeEditMenu = e => {
    e.stopPropagation()
    setMenuUser(null)
    setEditMenuAnchor(null)
  }

  const openOptionsMenu = (e, userData) => {
    e.stopPropagation()
    setMenuUser(userData)
    setOptionsMenuAnchor(e.currentTarget)
  }

  const closeOptionsMenu = e => {
    e.stopPropagation()
    setMenuUser(null)
    setOptionsMenuAnchor(null)
  }

  const reloadUsers = async () => {
    try {
      await onLoadUsers(user.email)
    } catch (err) {
      throw new Error(err)
    }
  }

  const changeCreatedMethod = async e => {
    closeOptionsMenu(e)
    const confirmBox = window.confirm('Are you sure you want to open this account for subscription?')
    const createdMethod = menuUser.method
    if (confirmBox && createdMethod === 'admin') {
      setLoadingBackdrop(true)
      try {
        await changeUserCreatedMethod(menuUser.userId)
        await changeUserProfileCreatedMethod(menuUser.userId)
        setLoadingBackdrop(false)
        onSetNotification({
          message: 'Account is now open for subscription',
          type: 'success',
        })
      } catch (err) {
        setLoadingBackdrop(false)
      }
    }
  }

  const deleteUser = async e => {
    closeOptionsMenu(e)
    const confirmBox = window.confirm(`Are you sure you want to delete ${menuUser.userName}?`)
    if (confirmBox === true) {
      setLoadingBackdrop(true)
      try {
        const userData = await getCardById(menuUser.userId)
        const dbFunctions = await getFirebaseFunctions()
        const deleteUserCall = dbFunctions.httpsCallable('deleteUser')
        const deletedUser = await deleteUserCall(menuUser.userId)
        await deleteUserById(menuUser.userId)
        await deleteCardByuserId(menuUser.userId)
        if (userData.vCardFile) {
          await getFirebaseStorage().ref(`card/${userData.vCardFile}`).delete()
        }
        if (userData.image) {
          await getFirebaseStorage().ref().child(`/profiles/${userData.image}`).delete()
        }
        setLoadingBackdrop(false)
        const advancedSearchFormDetails = createFormValuesObj(advancedSearchForm)
        await onLoadUsersByArguments(
          auth.user.email,
          new Date(advancedSearchFormDetails.startDate),
          new Date(advancedSearchFormDetails.endDate),
          advancedSearchFormDetails.sortBy,
          advancedSearchFormDetails.order,
        )
        onSetNotification({
          message: deletedUser.data.message.body,
          type: deletedUser.data.message.type,
        })
      } catch (err) {
        setLoadingBackdrop(false)
        onSetNotification({
          message: pageStatics.messages.notifications.deleteUserFail,
          type: 'error',
        })
      }
    }
  }

  const changeActiveState = async (uid, activeState) => {
    setLoadingBackdrop(true)
    try {
      await updateAccountActivity(uid, activeState)
      setLoadingBackdrop(false)
      await reloadUsers()
      onSetNotification({
        message: activeState ? pageStatics.messages.notifications.userActivated : pageStatics.messages.notifications.userDeactivated,
        type: 'success',
      })
    } catch (err) {
      setLoadingBackdrop(false)
      onSetNotification({
        message: pageStatics.messages.notifications.changingAccountFail,
        type: 'error',
      })
    }
  }

  const sendWelcomeEmail = async (userEmail, userPassword, currentUserId) => {
    setSendingEmail(true)
    try {
      const userData = await getCardById(currentUserId)
      const templateParams = {
        fromName: language.languageVars.appAppr,
        firstName: capitalizeFirst(userData.firstName),
        toEmail: userEmail,
        editProfileLink: `${language.languageVars.appEditProfileURL}/${auth.user.uid}/edit`,
        learnConnectTapplLink: `${language.languageVars.appDomain}/activate`,
        tapplCodesLink: `${language.languageVars.appDomain}/invitations`,
      }
      await emailjs.send(vars.MAILJS_CONFIG.serviceId, vars.MAILJS_CONFIG.welcomeChildTemplateId, templateParams, vars.MAILJS_CONFIG.userId)
      setSendingEmail(false)
      onSetNotification({
        message: pageStatics.messages.notifications.sendingEmailSuccess,
        type: 'success',
      })
    } catch (err) {
      setSendingEmail(false)
      onSetNotification({
        message: pageStatics.messages.notifications.sendingEmailFail,
        type: 'error',
      })
      throw new Error(err)
    }
  }

  const inputChangeHandler = async (eve, key, form, setForm) => {
    let changeEvent
    let e = eve
    if (!e) {
      e = ''
    }

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedForm = adjustFormValues(form, changeEvent, key)
    setForm(adjustedForm.adjustedForm)
  }

  const getSearchedUsersHandler = async e => {
    e.preventDefault()
    setSearchingUsers(true)
    const advancedSearchFormDetails = createFormValuesObj(advancedSearchForm)
    try {
      await onLoadUsersByArguments(
        auth.user.email,
        new Date(advancedSearchFormDetails.startDate),
        new Date(advancedSearchFormDetails.endDate),
        advancedSearchFormDetails.sortBy,
        advancedSearchFormDetails.order,
        advancedSearchFormDetails.onlyAdminCreatedAccounts,
      )
      setSearchingUsers(false)
    } catch (err) {
      setSearchingUsers(false)
      onSetNotification({
        message: 'Problem finding users',
        type: 'error',
      })
    }
  }

  const getSearchedUsersByKeywordHandler = async e => {
    e.preventDefault()
    setSearchingUsers(true)
    const searchFormDetails = createFormValuesObj(searchForm)
    try {
      await onLoadUsersByKeyword(
        auth.user.email,
        searchFormDetails.searchKeyword,
        searchFormDetails.searchFor,
        searchFormDetails.orderBy,
        searchFormDetails.order,
      )
      setSearchingUsers(false)
    } catch (err) {
      setSearchingUsers(false)
      onSetNotification({
        message: 'Problem finding users',
        type: 'error',
      })
    }
  }

  const saveAsSVG = async (e, userName) => {
    e.preventDefault()
    try {
      const dataUri = await svgAsDataUri(document.getElementById('qrcode'))
      const dl = document.createElement('a')
      document.body.appendChild(dl)
      dl.setAttribute('href', dataUri)
      dl.setAttribute('download', `${userName.trim()}.svg`)
      dl.click();
    } catch (err) {
      throw new Error(err)
    }
  }

  const openPublicProfileHandler = () => {
    history.push(`/profile/${menuUser.urlSuffix}`)
  }

  const editProfileSectionHandler = section => {
    history.push(`/edit/${menuUser.userId}/${section}`)
  }

  const openEditInfoHandler = e => {
    setUserId(menuUser.userId)
    setEditInfoDialogOpen(true)
    closeEditMenu(e)
  }

  const closeEditInfoHandler = () => {
    setEditInfoDialogOpen(false)
    setUserId(null)
    setMenuUser(null)
  }

  const openEditContactsHandler = e => {
    setUserId(menuUser.userId)
    setEditContactsDialogOpen(true)
    closeEditMenu(e)
  }

  const closeEditContactsHandler = () => {
    setEditContactsDialogOpen(false)
    setUserId(null)
    setMenuUser(null)
  }

  const openEditPictureHandler = e => {
    setUserId(menuUser.userId)
    setEditPictureDialogOpen(true)
    closeEditMenu(e)
  }

  const closeEditPictureHandler = () => {
    setEditPictureDialogOpen(false)
    setUserId(null)
    setMenuUser(null)
  }

  const openEditLogoHandler = e => {
    setUserId(menuUser.userId)
    setEditLogoDialogOpen(true)
    closeEditMenu(e)
  }

  const closeEditLogoHandler = () => {
    setEditLogoDialogOpen(false)
    setUserId(null)
    setMenuUser(null)
  }

  const openEditVideoHandler = e => {
    setUserId(menuUser.userId)
    setEditVideoDialogOpen(true)
    closeEditMenu(e)
  }

  const closeEditVideoHandler = () => {
    setEditVideoDialogOpen(false)
    setUserId(null)
    setMenuUser(null)
  }

  const openEditDesignHandler = e => {
    setUserId(menuUser.userId)
    setEditDesignDialogOpen(true)
    closeEditMenu(e)
  }

  const closeEditDesignHandler = () => {
    setEditDesignDialogOpen(false)
    setUserId(null)
    setMenuUser(null)
  }

  const openEditLinksHandler = e => {
    setUserId(menuUser.userId)
    setEditLinksDialogOpen(true)
    closeEditMenu(e)
  }

  const closeEditLinksHandler = () => {
    setEditLinksDialogOpen(false)
    setUserId(null)
    setMenuUser(null)
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      {menuUser && (
        <Box className={classes.qrCodeContainer}>
          <QRCode id="qrcode" value={`${pageUrl}${menuUser.urlSuffix}`} />
        </Box>
      )}
      <Box className={layoutClasses.contentContainer}>
        {loadingBackdrop && <LoadingBackdrop loadingText={language.languageVars.processing} boxed />}
        {sendingEmail && <LoadingBackdrop loadingText={pageStatics.messages.loading.sendingWelcomeEmail} boxed />}
        <Button
          color="primary"
          onClick={() => openCreateUserDialogHandler()}
          className={buttonClasses.defaultButton}
          style={{
            backgroundColor: color.color.code,
            minWidth: '250px',
            marginBottom: 8,
          }}
        >
          {pageStatics.buttons.createNewUser}
        </Button>
        <Box>
          <AppBar className={classes.tabsHeader}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="simple tabs example">
              <Tab label="Search By Date Range" className={classes.searchTab} {...a11yProps(0)} />
              <Tab label="Search By Keyword" className={classes.searchTab} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <div
            role="tabpanel"
            hidden={tabValue !== 0}
            id="simple-tabpanel-0"
            className={classes.seachPanel}
            aria-labelledby="simple-tab-0"
          >
            {tabValue === 0 && (
              <Suspense fallback={language.languageVars.loading}>
                <AdvancedSearch
                  searchForm={advancedSearchForm}
                  loading={searchingUser}
                  inputChangeHandler={inputChangeHandler}
                  setSearchForm={setAdvancedSearchForm}
                  onSubmit={getSearchedUsersHandler}
                />
              </Suspense>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={tabValue !== 1}
            id="simple-tabpanel-1"
            className={classes.seachPanel}
            aria-labelledby="simple-tab-1"
          >
            {tabValue === 1 && (
              <Suspense fallback={language.languageVars.loading}>
                <Search
                  searchForm={searchForm}
                  loading={searchingUser}
                  inputChangeHandler={inputChangeHandler}
                  setSearchForm={setSearchForm}
                  onSubmit={getSearchedUsersByKeywordHandler}
                />
              </Suspense>
            )}
          </div>
        </Box>
        {users && (
          <Box mt={3}>
            <DataGrid
              loading={loading}
              autoHeight
              pageSize={usersPerPage}
              rows={users || []}
              getRowId={row => row.userId}
              columns={[
                { field: 'userName', headerName: 'User Name', width: 150 },
                { field: 'email', headerName: 'E-mail', width: 250 },
                {
                  field: 'created',
                  headerName: 'Created on',
                  type: 'date',
                  width: 150,
                  valueFormatter: value => format(value.value.toDate(), 'dd - MM - yyyy'),
                },
                {
                  field: 'actions',
                  headerName: 'Actions',
                  width: 200,
                  sortable: false,
                  filterable: false,
                  renderCell: ({ row }) => (
                    <Box className={classes.gridActionsContainer}>
                      <Box className={classes.gridActionsButtons}>
                        <IconButton aria-label="info" onClick={() => openAccountInfoDialogHandler(row)}>
                          <InfoIcon color="secondary" fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="profile" aria-haspopup="true" color="secondary" onClick={e => openViewMenu(e, row)}>
                          <AccountBoxIcon color="secondary" fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="edit" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={e => openEditMenu(e, row)}>
                          <EditIcon color="secondary" fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="edit" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={e => openOptionsMenu(e, row)}>
                          <SettingsIcon color="secondary" fontSize="small" />
                        </IconButton>
                      </Box>
                      <Menu
                        id="profile-menu"
                        anchorEl={viewMenuAnchor}
                        keepMounted
                        open={Boolean(viewMenuAnchor)}
                        onClose={closeViewMenu}
                        classes={{ paper: classes.cardEditMenu }}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      >
                        <MenuItem onClick={() => openPublicProfileHandler()} className={classes.cardMenuButton}>View profile</MenuItem>
                        <MenuItem onClick={() => openAccountConnectionsDialogHandler()} className={classes.cardMenuButton}>View Connections</MenuItem>
                        <MenuItem onClick={() => openAccountFollowersDialogHandler()} className={classes.cardMenuButton} style={{ display: 'none' }}>View Followers</MenuItem>
                        <MenuItem onClick={() => openAccountFollowingDialogHandler()} className={classes.cardMenuButton} style={{ display: 'none' }}>View Followings</MenuItem>
                        <MenuItem onClick={() => editProfileSectionHandler('picture')} className={classes.cardMenuButton} style={{ display: 'none' }}>View QR code</MenuItem>
                      </Menu>
                      <Menu
                        id="edit-menu"
                        anchorEl={editMenuAnchor}
                        keepMounted
                        open={Boolean(editMenuAnchor)}
                        onClose={closeEditMenu}
                        classes={{ paper: classes.cardEditMenu }}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      >
                        <MenuItem onClick={e => openEditInfoHandler(e)} className={classes.cardMenuButton}>Edit info</MenuItem>
                        <MenuItem onClick={e => openEditContactsHandler(e)} className={classes.cardMenuButton}>Edit contacts</MenuItem>
                        <MenuItem onClick={e => openEditLogoHandler(e)} className={classes.cardMenuButton}>Edit logo</MenuItem>
                        <MenuItem disabled={menuUser && !!menuUser.settings.masterId} onClick={e => openEditPictureHandler(e)} className={classes.cardMenuButton}>Edit picture</MenuItem>
                        <MenuItem disabled={menuUser && !!menuUser.settings.masterId} onClick={e => openEditVideoHandler(e)} className={classes.cardMenuButton}>Edit video</MenuItem>
                        <MenuItem disabled={menuUser && !!menuUser.settings.masterId} onClick={e => openEditDesignHandler(e)} className={classes.cardMenuButton}>Edit design</MenuItem>
                        <MenuItem disabled={menuUser && !!menuUser.settings.masterId} onClick={e => openEditLinksHandler(e)} className={classes.cardMenuButton}>Edit links</MenuItem>
                        {/* <MenuItem onClick={() => editProfileSectionHandler('bio')} className={classes.cardMenuButton}>Edit profile video</MenuItem> */}
                      </Menu>
                      <Menu
                        id="options-menu"
                        anchorEl={optionsMenuAnchor}
                        keepMounted
                        open={Boolean(optionsMenuAnchor)}
                        onClose={closeOptionsMenu}
                        classes={{ paper: classes.cardEditMenu }}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                      >
                        <MenuItem onClick={e => changeCreatedMethod(e)} className={classes.cardMenuButton}>Open for subscription</MenuItem>
                        <MenuItem onClick={e => saveAsSVG(e, row.userName)} className={classes.cardMenuButton}>Download QR</MenuItem>
                        <MenuItem onClick={() => openChangeEmailDialogHandler()} className={classes.cardMenuButton}>Change email</MenuItem>
                        <MenuItem onClick={() => openChangePackageDialogHandler()} className={classes.cardMenuButton} style={{ display: 'none' }}>Change package</MenuItem>
                        <MenuItem onClick={() => sendWelcomeEmail(row.email, row.userName, row.userId)} className={classes.cardMenuButton}>Send welcome email</MenuItem>
                        <MenuItem onClick={() => changeActiveState(row.userId, !row.settings.active)} className={classes.cardMenuButton}>
                          {row.settings.active ? 'Disable user' : 'Activate user'}
                        </MenuItem>
                        <MenuItem onClick={e => deleteUser(e)} className={classes.cardMenuButton}>Delete user</MenuItem>
                      </Menu>
                    </Box>
                  ),
                },
              ]}
              // onPageChange={page => console.log(page)}
              className={gridClasses.gridContainer}
              componentsProps={{
                panel: { className: gridClasses.gridPanel },
              }}
            />
          </Box>
        )}
        <Suspense fallback={language.languageVars.loading}>
          <AccountInfo
            dialogOpen={accountInfoDialogOpen}
            closeDialog={closeAccountInfoHandler}
            userInfo={accountInfo}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <AccountConnections
            open={accountConnectionsDialogOpen}
            onClose={closeAccountConnectionsHandler}
            connections={connections}
            memberName={accountConnectionsInfo && accountConnectionsInfo.userName ? accountConnectionsInfo.userName : null}
            memberConnectionsLoading={memberConnectionsLoading}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <AccountFollowers
            dialogOpen={accountFollowersDialogOpen}
            closeDialog={closeAccountFollowersHandler}
            userInfo={accountConnectionsInfo}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <AccountFollowing
            dialogOpen={accountFollowingDialogOpen}
            closeDialog={closeAccountFollowingHandler}
            userInfo={accountConnectionsInfo}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <CreateUser
            reloadUsers={reloadUsers}
            userCount={userCount}
            dialogOpen={createUserDialogOpen}
            closeDialog={closeUserDialogHandler}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <ChangeEmail
            reloadUsers={reloadUsers}
            dialogOpen={changeEmailDialogOpen}
            closeDialog={closeChangeEmailDialogHandler}
            userInfo={menuUser}
          />
        </Suspense>
        <Suspense fallback={language.languageVars.loading}>
          <ChangePackage
            reloadUsers={reloadUsers}
            dialogOpen={changePackageDialogOpen}
            closeDialog={closeChangePackageDialogHandler}
            userInfo={menuUser}
          />
        </Suspense>

        <Suspense fallback={language.languageVars.loading}>
          <EditInfo
            dialogOpen={editInfoDialogOpen}
            closeDialog={closeEditInfoHandler}
            userId={userId}
            onSetNotification={onSetNotification}
          />
        </Suspense>

        <Suspense fallback={language.languageVars.loading}>
          <EditContacts
            dialogOpen={editContactsDialogOpen}
            closeDialog={closeEditContactsHandler}
            userId={userId}
            onSetNotification={onSetNotification}
          />
        </Suspense>

        <Suspense fallback={language.languageVars.loading}>
          <EditPicture
            dialogOpen={editPictureDialogOpen}
            closeDialog={closeEditPictureHandler}
            userId={userId}
            onSetNotification={onSetNotification}
          />
        </Suspense>

        <Suspense fallback={language.languageVars.loading}>
          <EditLogo
            dialogOpen={editLogoDialogOpen}
            closeDialog={closeEditLogoHandler}
            userId={userId}
            onSetNotification={onSetNotification}
          />
        </Suspense>

        <Suspense fallback={language.languageVars.loading}>
          <EditVideo
            dialogOpen={editVideoDialogOpen}
            closeDialog={closeEditVideoHandler}
            userId={userId}
            onSetNotification={onSetNotification}
          />
        </Suspense>
        {editDesignDialogOpen && (
          <Suspense fallback={language.languageVars.loading}>
            <EditDesign
              dialogOpen={editDesignDialogOpen}
              closeDialog={closeEditDesignHandler}
              userId={userId}
              onSetNotification={onSetNotification}
            />
          </Suspense>
        )}
        {editLinksDialogOpen && (
          <Suspense fallback={language.languageVars.loading}>
            <EditLinks
              dialogOpen={editLinksDialogOpen}
              closeDialog={closeEditLinksHandler}
              userId={userId}
              onSetNotification={onSetNotification}
            />
          </Suspense>
        )}
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  loading: state.users.loading,
  users: state.users.users,
  userCount: state.users.userCount,
  usersPerPage: state.users.usersPerPage,
})

const mapDispatchToProps = dispatch => ({
  onLoadUsers: currentUserEmail => dispatch(actions.loadUsers(currentUserEmail)),
  onLoadUsersByArguments: (
    currentUserEmail,
    startDate,
    endDate,
    sortBy,
    order,
    onlyAdminCreatedAccounts,
  ) => dispatch(actions.loadUsersByArguments(currentUserEmail, startDate, endDate, sortBy, order, onlyAdminCreatedAccounts)),
  onLoadUsersByKeyword: (currentUserEmail, searchKeyword, searchFor, orderBy, order) => dispatch(actions.loadUsersByKeyword(currentUserEmail, searchKeyword, searchFor, orderBy, order)),
  onSortUser: (value, type) => dispatch(actions.sortUsers(value, type)),
  onClearCard: () => dispatch(actions.clearCard()),
  onClearLinks: () => dispatch(actions.clearLinks()),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

Users.defaultProps = {
  loading: false,
  users: null,
  userCount: 0,
  usersPerPage: 0,
}

Users.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  userCount: PropTypes.number,
  usersPerPage: PropTypes.number,
  onLoadUsers: PropTypes.func.isRequired,
  onLoadUsersByArguments: PropTypes.func.isRequired,
  onLoadUsersByKeyword: PropTypes.func.isRequired,
  onClearCard: PropTypes.func.isRequired,
  onClearLinks: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
