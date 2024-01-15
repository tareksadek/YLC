export const navLinks = (urlSuffix, userId) => ([
  {
    title: null,
    links: [
      {
        linkfor: 'profile', path: `/${urlSuffix}`, userId, teamMember: true,
      },
      // { linkfor: 'qrBox', path: `/profile/${urlSuffix}` },
    ],
  },
  // {
  //   title: null,
  //   links: [
  //     { linkfor: 'switch', path: '/switch', teamMember: true },
  //   ],
  // },
  {
    title: null,
    links: [
      { linkfor: 'analytics', path: '/analytics', teamMember: true },
    ],
  },
  // {
  //   title: null,
  //   links: [
  //     { linkfor: 'qrBox', path: '/qrBox', teamMember: true },
  //   ],
  // },
  {
    title: 'edit profile',
    links: [
      { linkfor: 'contact', path: '/contact', teamMember: true },
      { linkfor: 'logo', path: '/logo', teamMember: true },
    ],
  },
  // {
  //   title: 'settings',
  //   links: [
  //     { linkfor: 'theme', path: '/settings/theme' },
  //     { linkfor: 'privacy', path: '/settings/privacy' },
  //     { linkfor: 'account', path: '/settings/account' },
  //   ],
  // },
  {
    title: 'mange team',
    permission: 'master',
    links: [
      { linkfor: 'myTeam', path: '/myTeam' },
      { linkfor: 'info', path: '/info', teamMember: false },
      { linkfor: 'picture', path: '/picture', teamMember: false },
      { linkfor: 'bio', path: '/bio', teamMember: false },
      { linkfor: 'links', path: '/links', teamMember: false },
      { linkfor: 'theme', path: '/settings/theme', teamMember: false },
    ],
  },
  {
    title: 'connections',
    links: [
      { linkfor: 'connections', path: '/connections', teamMember: true },
      { linkfor: 'connectionForm', path: '/connectionForm', teamMember: false },
      { linkfor: 'connectionTags', path: '/connectionTags', teamMember: false },
    ],
  },
  {
    title: 'utilities',
    links: [
      { linkfor: 'qrcode', path: '/qrcode', teamMember: false },
      { linkfor: 'share', path: '/share', teamMember: true },
      { linkfor: 'privacy', path: '/settings/privacy', teamMember: false },
      { linkfor: 'account', path: '/settings/account', teamMember: true },
      { linkfor: 'impact', path: '/impact', teamMember: true },
      // { linkfor: 'secretCode', path: '/secretCode', teamMember: true },
    ],
  },
  {
    title: null,
    links: [
      { linkfor: 'logout', path: '/logout', teamMember: true },
    ],
  },
])
export const footerLinks = [
  { linkfor: 'privacy', path: '/privacyPolicy' },
]
export const adminMenu = [
  { linkfor: 'account', path: '/settings/account' },
  { linkfor: 'invitationsAdmin', path: '/patches', auth: 'superAdmin' },
  { linkfor: 'users', path: '/users', auth: 'superAdmin' },
  { linkfor: 'logout', path: '/logout' },
]
export const socialPlatforms = [
  /* eslint-disable object-curly-newline */
  { platform: 'website', color: '#23cac2', iconColor: '#23cac2', key: 1, active: false },
  { platform: 'blog', color: '#fc4f08', iconColor: '#fc4f08', key: 2, active: false },
  { platform: 'facebook', color: '#3b5998', iconColor: '#3b5998', key: 3, active: false, domain: 'facebook.com' },
  { platform: 'twitter', color: '#00acee', iconColor: '#00acee', key: 4, active: false, domain: 'twitter.com' },
  { platform: 'linkedin', color: '#0e76a8', iconColor: '#0e76a8', key: 5, active: false, domain: 'linkedin.com/in' },
  { platform: 'instagram', color: '#bc2a8d', iconColor: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)', key: 6, active: false, domain: 'instagram.com' },
  { platform: 'youtube', color: '#d21111', iconColor: '#d21111', key: 7, active: false, domain: 'youtube.com/c' },
  { platform: 'tumblr', color: '#34526f', iconColor: '#34526f', key: 8, active: false, domain: 'tumblr.com/blog' },
  { platform: 'pinterest', color: '#E60023', iconColor: '#E60023', key: 9, active: false, domain: 'pinterest.com' },
  { platform: 'whatsapp', color: '#075e54', iconColor: '#075e54', key: 10, active: false, domain: 'wa.me' },
  { platform: 'snapchat', color: '#FFFC00', iconColor: '#FFFC00', dark: true, key: 11, active: false, domain: 'snapchat.com/add' },
  { platform: 'spotify', color: '#1DB954', iconColor: '#1DB954', key: 12, active: false, domain: 'open.spotify.com/user' },
  { platform: 'tiktok', color: '#ff0050', iconColor: '#000000', key: 13, active: false, domain: 'vm.tiktok.com' },
  { platform: 'vimeo', color: '#86c9ef', iconColor: '#86c9ef', key: 14, active: false, domain: 'vimeo.com' },
  { platform: 'paypal', color: '#003087', iconColor: '#003087', key: 15, active: false, domain: 'paypal.com' },
  { platform: 'venmo', color: '#1ab7ea', iconColor: '#1ab7ea', key: 16, active: false, domain: 'venmo.com' },
  { platform: 'reddit', color: '#ff4500', iconColor: '#ff4500', key: 17, active: false, domain: 'reddit.com' },
  { platform: 'applemusic', color: '#FB233B', iconColor: '#FB233B', key: 18, active: false, domain: 'music.apple.com' },
  { platform: 'behance', color: '#1769ff', iconColor: '#1769ff', key: 19, active: false, domain: 'behance.net' },
  { platform: 'anchor', color: '#5017B8', iconColor: '#5017B8', key: 20, active: false, domain: 'anchor.fm' },
  { platform: 'applePodcast', color: '#b150e2', iconColor: '#b150e2', key: 21, active: false, domain: 'itunes.apple.com' },
  { platform: 'calendly', color: '#006BFF', iconColor: '#006BFF', key: 22, active: false, domain: 'calendly.com' },
  { platform: 'dribbble', color: '#E74D89', iconColor: '#E74D89', key: 23, active: false, domain: 'dribbble.com' },
  { platform: 'github', color: '#24292f', iconColor: '#24292f', key: 24, active: false, domain: 'github.com' },
  { platform: 'twitch', color: '#6441a4', iconColor: '#6441a4', key: 25, active: false, domain: 'twitch.tv' },
  /* eslint-enable object-curly-newline */
]
export const defaultSettings = {
  selectedColor: { name: null, code: null },
  theme: 'light',
  layout: 'social',
}
export const themeColors = [
  { name: 'black', code: '#000000' },
  { name: 'grey', code: '#888888' },
  { name: 'orange', code: '#FF7400' },
  { name: 'green', code: '#30c54a' },
  { name: 'blue', code: '#347bd2' },
  { name: 'red', code: '#da373a' },
  { name: 'yellow', code: '#ffbc00' },
  { name: 'pink', code: '#E1005B' },
  { name: 'purble', code: '#9e38de' },
]
export const labelColors = [
  { name: 'red', code: '#db2828' },
  { name: 'orange', code: '#f2711c' },
  { name: 'yellow', code: '#fbbd08' },
  { name: 'olive', code: '#b5cc18' },
  { name: 'green', code: '#21ba45' },
  { name: 'teal', code: '#00b5ad' },
  { name: 'blue', code: '#2185d0' },
  { name: 'violet', code: '#6435c9' },
  { name: 'purple', code: '#a333c8' },
  { name: 'pink', code: '#e03997' },
  { name: 'brown', code: '#a5673f' },
  { name: 'grey', code: '#999999' },
]
export const carouselImages = [
  { src: '/assets/images/carousel/1.jpg', order: 0 },
  { src: '/assets/images/carousel/2.jpg', order: 1 },
  { src: '/assets/images/carousel/3.jpg', order: 2 },
  { src: '/assets/images/carousel/4.jpg', order: 3 },
]
export const AUTH_PAGE = '/auth'
export const LOGIN_PAGE = '/login'
export const INVITATIONS_PAGE = '/checkInvitation'
export const SUBSCRIBE_PAGE = '/subscribe'
export const CREATE_TEAM_PAGE = '/getYLC'
export const CREATE_ACCOUNT_PAGE = '/createAccount'
export const CREATE_MASTER_ACCOUNT_PAGE = '/createMaster'
export const CONNECT_ACCOUNT_PAGE = '/connectCard'
export const LOGIN_REDIRECT = '/cards'
export const CONTACT_EMAIL = 'support@yourlastcard.com'
export const ONBOARDING_PAGE_MEMBER = '/welcomeMember'
export const ONBOARDING_PAGE_MASTER = '/welcome'
// https://oneqr-361401.firebaseapp.com/__/auth/handler
export const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  // authDomain: 'gcvcards-92898.firebaseapp.com',
  // authDomain: 'ylc-teams.firebaseapp.com',
  authDomain: 'ylcteams.app',
  projectId: 'ylc-teams',
  storageBucket: 'ylc-teams.appspot.com',
  messagingSenderId: '568977982597',
  appId: '1:568977982597:web:195d092ed748b2229b95ec',
  measurementId: 'G-XY6ZFGZDBF',
}
export const MAILJS_CONFIG = {
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE,
  userId: process.env.REACT_APP_EMAILJS_USER,
  newSubscriptionTemplateId: process.env.REACT_APP_EMAILJS_NEW_SUBSCRIPTION_TEMPLATE,
  subscriptionUpgradeTemplateId: process.env.REACT_APP_EMAILJS_SUBSCRIPTION_UPGRADE_TEMPLATE,
}
export const CARDS_IMAGES_DIRECTORY = '/assets/images/cards'
export const MAX_PROFILES = 3

export const GOOGLE_MAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS

export const FILTERS = [
  { name: 'admin created', value: 'admin', type: 'account' },
  { name: 'invitation created', value: 'invitation', type: 'account' },
  { name: 'active accounts', value: true, type: 'activity' },
  { name: 'disabled accounts', value: false, type: 'activity' },
  { name: 'virtual package', value: 'virtual', type: 'package' },
  { name: 'individual package', value: 'individual', type: 'package' },
  { name: 'corporate package', value: 'corporate', type: 'package' },
]
export const SORTS = [
  { name: 'name ASC', value: 'asc', type: 'userName' },
  { name: 'name DESC', value: 'desc', type: 'userName' },
  { name: 'created date ASC', value: 'asc', type: 'date' },
  { name: 'created date DESC', value: 'desc', type: 'date' },
]
export const CONNECTIONS_SORTS = [
  { name: 'Newest', value: 'desc', type: 'date' },
  { name: 'Oldest', value: 'asc', type: 'date' },
  { name: 'A - Z', value: 'asc', type: 'firstName' },
  { name: 'Z - A', value: 'desc', type: 'firstName' },
]
export const TEAM_MEMBERS_SORTS = [
  { name: 'A - Z', value: 'asc', type: 'firstName' },
  { name: 'Z - A', value: 'desc', type: 'firstName' },
]
export const INVITATION_FILTER = [
  { name: 'All', type: 'all' },
  { name: 'Available', type: 'available' },
  { name: 'Used', type: 'used' },
  { name: 'Connected', type: 'connected' },
  { name: 'Unlinked', type: 'unlinked' },
]

export const PATCH_FILTERS = [
  { name: 'test', value: 'test', type: 'package' },
  { name: 'virtual', value: 'virtual', type: 'package' },
  { name: 'device', value: 'device', type: 'package' },
]
export const CONNECTIONS_PER_PAGE = 10
export const PATCHES_PER_PAGE = 20
export const INVITATIONS_PER_PAGE = 30
export const TEAM_MEMBERS_PER_PAGE = 20
export const TEAM_INVITATIONS_PER_PAGE = 5
export const ORDERS_PER_PAGE = 10
export const CONNECTIONS_CSV_HEADER = [
  'Name',
  'Given Name',
  'First Name',
  'Family Name',
  'Last Name',
  'E-mail 1 - Value',
  'E-mail Address',
  'Phone 2 - Value',
  'Business Phone',
  'Notes',
]
export const CONNECTIONS_FACEBOOK_CSV_HEADER = [
  'email',
  'email',
  'email',
  'phone',
  'phone',
  'phone',
  'fn',
  'ln',
  'country',
]
export const CONNECTIONS_MAILCHIMP_CSV_HEADER = [
  'Email Address',
  'First Name',
  'Last Name',
  'Tags',
  'Phone',
]
export const CONNECTIONS_SALESFORCE_CSV_HEADER = [
  'Email',
  'First Name',
  'Last Name',
  'Phone',
  'Mobile',
]
export const CONNECTIONS_HUBSPOT_CSV_HEADER = [
  'First Name',
  'Last Name',
  'Email Address',
  'Phone Number',
]
export const SENDOWL_CSV_HEADER = [
  'SKU',
  'Self-hosted URL Name',
]
export const MY_TEAM_CSV_HEADER = [
  'Name',
  'Given Name',
  'First Name',
  'Family Name',
  'Last Name',
  'E-mail 1 - Value',
  'E-mail Address',
  'Phone 2 - Value',
  'Business Phone',
  'Notes',
]
export const OFFERS_PER_PAGE = 10
export const APP_DOMAIN = 'https://ylcteams.app'
export const trialPeriod = 14
export const settings = {
  showIndustry: false,
  onlyInvitations: true,
  allowSubscription: false,
}
export const proFeatures = [
  {
    title: 'a',
    description: 'Connect Instantly When Your QR code is Scanned',
  },
  {
    description: 'Update Your Profile and QR Code in Real-Time',
    title: 'b',
  },
  {
    description: 'Share Your Contact Info to Any Apple or Android Device',
    title: 'c',
  },
  {
    description: 'Capture Leads Instantly',
    title: 'd',
  },
  {
    title: 'e',
    description: 'Create Unlimited Custom Links',
  },
  {
    title: 'f',
    description: 'Share Up to 25 Social Links',
  },
  {
    title: 'g',
    description: 'Customize Profile Theme and Color',
  },
  {
    title: 'h',
    description: 'Works with all Apple and Android Devices. No Apps Required',
  },
  {
    title: 'i',
    description: 'Upload Your Leads to Any CRM',
  },
  {
    description: 'Advanced Analytics to Track Engagement',
    title: 'j',
  },
  {
    title: 'k',
    description: 'Privacy - Make your profile password protected',
  },
]

export const productIDs = {
  withCards: {
    id: 'prod_O50ZYr3k2lO38j',
    prices: {
      5: 'price_1NIqYlEVHckblor7zKKWG4pJ',
      10: 'price_1NIqYlEVHckblor7a11kkbFU',
      15: 'price_1NIqYlEVHckblor7sgMbWvaH',
      20: 'price_1NIqYlEVHckblor76EQ5bWol',
      25: 'price_1NIqYlEVHckblor7eYUSF3Nc',
      30: 'price_1NIqYlEVHckblor7WVpaEXty',
    },
  },
  withoutCards: {
    id: 'prod_O50XlHBcBwCRYY',
    prices: {
      5: 'price_1NIqW0EVHckblor7C0ASRvi1',
      10: 'price_1NIqW0EVHckblor7IHLUw2b6',
      15: 'price_1NIqW0EVHckblor7dOu1fFtq',
      20: 'price_1NIqW0EVHckblor7Iko9daWl',
      25: 'price_1NIqW0EVHckblor74eQTWBr0',
      30: 'price_1NIqW1EVHckblor7nW1GrIvO',
    },
  },
}
