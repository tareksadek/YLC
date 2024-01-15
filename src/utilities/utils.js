import React from 'react'
import parse from 'html-react-parser'

import { format, isValid } from 'date-fns'
import vCardsJS from 'vcards-js'

import ContactsIcon from '@material-ui/icons/Contacts'
import LineStyleIcon from '@material-ui/icons/LineStyle'
import LensIcon from '@material-ui/icons/Lens'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import PinterestIcon from '@material-ui/icons/Pinterest'
import YouTubeIcon from '@material-ui/icons/YouTube'
import LinkIcon from '@material-ui/icons/Link'
import {
  TumblrIcon, SnapchatIcon, WhatsappIcon, BlogIcon, WebsiteIcon, SpotifyIcon, TiktokIcon, TiktokIconSocial,
  VimeoIcon, ConnectionsIcon, VenmoIcon, RedditIcon, PaypalIcon, ApplMusicIcon, BehanceIcon, AnchorIcon, ApplePodcastIcon, CalendlyIcon, DribbbleIcon,
  GithubIcon, TwitchIcon,
} from '../layout/CustomIcons'

import { getCardBySuffix } from '../API/cards'

import { APP_DOMAIN } from './appVars'

export const processDate = date => (date.seconds ? date.toDate() : date)

export const updateObj = (oldObj, updatedProps) => ({
  ...oldObj,
  ...updatedProps,
})

export const breakName = name => {
  const userName = parse(name.trim().toLowerCase())
  return {
    firstName: userName.substr(0, userName.indexOf(' ')).trim(),
    lastName: userName.substr(userName.indexOf(' ') + 1, userName.length).trim(),
  }
}

export const capitalizeFirst = string => {
  let str = null
  if (string) {
    str = string.trim().toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
  }
  return null
}

export const getSrc = (htmlStr, htmlTag) => {
  const div = document.createElement('div')
  div.innerHTML = htmlStr
  const tag = div.querySelector(htmlTag)
  return tag.src
}

export const generateRandomString = (length = 6) => Math.random().toString(20).substr(2, length)

export const generateRandomNumber = () => Math.floor(1000000000000 + Math.random() * 9000000000000).toString()

export const renameFile = (originalFile, newName) => new File([originalFile], newName, {
  type: originalFile.type,
  lastModified: originalFile.lastModified,
})

export const imageToBase64 = (file, callback) => {
  const fileReader = new FileReader()
  let image64
  fileReader.onload = fileLoadedEvent => {
    image64 = fileLoadedEvent.target.result
    callback(image64)
  }
  fileReader.readAsDataURL(file)
}

export const createUrlSuffix = async userFullName => {
  const userName = breakName(userFullName)
  const { firstName, lastName } = userName
  const cleanFirstName = firstName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
  const cleanLastName = lastName.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')
  let urlSuffix
  let primaryURLSuffix
  if (cleanFirstName === '') {
    primaryURLSuffix = `${cleanLastName}`
  } else {
    primaryURLSuffix = `${cleanFirstName}_${cleanLastName}`
  }
  const isCardURLExists = await getCardBySuffix(primaryURLSuffix)
  if (isCardURLExists) {
    urlSuffix = `${primaryURLSuffix}_${generateRandomString(4)}`
  } else {
    urlSuffix = primaryURLSuffix
  }
  return {
    urlSuffix,
    firstName: cleanFirstName,
    lastName: cleanLastName,
  }
}

export const shuffleArray = array => {
  const adjustedArray = array
  let currentIndex = adjustedArray.length
  let temporaryValue
  let randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = adjustedArray[currentIndex];
    adjustedArray[currentIndex] = adjustedArray[randomIndex];
    adjustedArray[randomIndex] = temporaryValue;
  }

  return adjustedArray
}

export const dynamicSort = objectKey => {
  let sortOrder = 1
  let property = objectKey

  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }

  return (a, b) => {
    if (sortOrder === -1) {
      return b[property].localeCompare(a[property], 'en', { numeric: true })
    }
    return a[property].localeCompare(b[property], 'en', { numeric: true })
  }
}

export const generateBirthDateObj = date => {
  let birthDateObj

  if (date) {
    if (isValid(date)) {
      birthDateObj = date
    } else {
      birthDateObj = date.toDate()
    }
    return birthDateObj
  }

  return null
}

export const isUpperCase = str => str === str.toUpperCase()

export const startsWithCapital = word => word.charAt(0) === word.charAt(0).toUpperCase()

export const generateVcard = (cardDetails, links, cardName, imageCode, imageType, urlSuffix) => {
  const vCard = vCardsJS()
  let birthDate = null

  if (imageCode) {
    vCard.photo.embedFromString(imageCode, imageType)
  }

  if (cardDetails.birthday) {
    const birthDateObj = generateBirthDateObj(cardDetails.birthday)
    birthDate = cardDetails.birthday && new Date(format(new Date(birthDateObj), 'yyyy'), format(new Date(birthDateObj), 'M') - 1, format(new Date(birthDateObj), 'dd'))
  }
  if (cardDetails.firstName) { vCard.firstName = startsWithCapital(cardDetails.firstName) ? cardDetails.firstName : capitalizeFirst(cardDetails.firstName || null) }
  if (cardDetails.middleName) { vCard.middleName = startsWithCapital(cardDetails.middleName) ? cardDetails.middleName : capitalizeFirst(cardDetails.middleName || null) }
  if (cardDetails.lastName) { vCard.lastName = startsWithCapital(cardDetails.lastName) ? cardDetails.lastName : capitalizeFirst(cardDetails.lastName || null) }
  if (cardDetails.namePrefix) { vCard.namePrefix = startsWithCapital(cardDetails.namePrefix || null) }
  if (cardDetails.nameSuffix) { vCard.nameSuffix = cardDetails.nameSuffix || null }
  if (cardDetails.gender) { vCard.gender = startsWithCapital(cardDetails.gender || null) }
  if (cardDetails.nickname) { vCard.nickname = startsWithCapital(cardDetails.nickname) ? cardDetails.nickname : capitalizeFirst(cardDetails.nickname || null) }
  if (cardDetails.organization) { vCard.organization = startsWithCapital(cardDetails.organization) ? cardDetails.organization : capitalizeFirst(cardDetails.organization || null) }
  if (cardDetails.title) { vCard.title = startsWithCapital(cardDetails.title) ? cardDetails.title : capitalizeFirst(cardDetails.title || null) }
  if (cardDetails.workPhone) { vCard.workPhone = cardDetails.workPhone.replace(/[^\d+]/g, '') || null }
  if (cardDetails.homePhone) { vCard.homePhone = cardDetails.homePhone.replace(/[^\d+]/g, '') || null }
  if (cardDetails.workFax) { vCard.workFax = cardDetails.workFax.replace(/[^\d+]/g, '') || null }
  if (cardDetails.homeFax) { vCard.homeFax = cardDetails.homeFax.replace(/[^\d+]/g, '') || null }
  if (cardDetails.address) { vCard.workAddress.street = cardDetails.address || null }
  if (birthDate) { vCard.birthday = birthDate }
  if (cardDetails.note) { vCard.note = cardDetails.note || null }
  if (cardDetails.email) { vCard.workEmail = cardDetails.email || null }

  if (links && links.length > 0) {
    links.map(link => {
      if (link.active) {
        vCard.socialUrls[link.linkTitle ? link.linkTitle : link.platform] = link.link
      }
      return true
    })
  }

  if (cardDetails.bioVideo) {
    // eslint-disable-next-line dot-notation
    vCard.socialUrls['video'] = cardDetails.bioVideo
  }

  const profileUrl = urlSuffix || cardDetails.urlSuffix ? `${APP_DOMAIN}/${urlSuffix || cardDetails.urlSuffix}` : null
  // const firstName = cardDetails.firstName || ''
  // const lastName = capitalizeFirst(cardDetails.lastName) || ''
  // const fullName = `${firstName}${lastName}`
  // const profileUrl = `${APP_SHORT_LINK}/${fullName}_${cardDetails.accountSecret}`

  if (profileUrl) {
    // eslint-disable-next-line dot-notation
    vCard.socialUrls['profile'] = profileUrl
  }

  const blob = new Blob(
    [vCard.getFormattedString()],
    { type: 'text/vcard;charset=utf-8' },
  )

  return new File([blob], cardName, { type: 'text/vcard', lastModified: new Date().getTime() })
}

export const cleanInvitationCode = code => {
  let cleanCode = code
  if (code.includes('_')) {
    cleanCode = code.substring(0, code.indexOf('_'))
  }
  return cleanCode
}

export const mapToArray = (arr, headerArr) => {
  const res = []
  res.push(headerArr)
  arr.forEach(obj => {
    res.push([obj.userName, obj.firstName, obj.firstName, obj.lastName, obj.lastName, obj.email, obj.email, obj.workPhone, obj.workPhone, obj.note])
  })
  return res
}

export const mapToFacebookArray = (arr, headerArr) => {
  const res = []
  res.push(headerArr)
  arr.forEach(obj => {
    res.push([obj.email, obj.email, obj.email, obj.workPhone, obj.workPhone, obj.workPhone, obj.firstName, obj.lastName, 'CA'])
  })
  return res
}

export const mapToMailchimpArray = (arr, headerArr) => {
  const res = []
  res.push(headerArr)
  arr.forEach(obj => {
    res.push([obj.email, obj.firstName, obj.lastName, obj.tags && obj.tags.length > 0 ? obj.tags.toString() : '', obj.workPhone])
  })
  return res
}

export const mapToSalesForceArray = (arr, headerArr) => {
  const res = []
  res.push(headerArr)
  arr.forEach(obj => {
    res.push([obj.email, obj.firstName, obj.lastName, obj.workPhone, obj.workPhone])
  })
  return res
}

export const mapToHubspotArray = (arr, headerArr) => {
  const res = []
  res.push(headerArr)
  arr.forEach(obj => {
    res.push([obj.firstName, obj.lastName, obj.email, obj.workPhone])
  })
  return res
}

export const customIcons = (suitName, color, size, className, styles) => {
  switch (suitName) {
    case 'facebook': return <FacebookIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'instagram': return <InstagramIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'twitter': return <TwitterIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'linkedin': return <LinkedInIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'pinterest': return <PinterestIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'reddit': return <RedditIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'youtube': return <YouTubeIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'tumblr': return <TumblrIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'snapchat': return <SnapchatIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} stroke={styles && styles.stroke} />
    case 'spotify': return <SpotifyIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'tiktok': return <TiktokIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'tiktokSocial': return <TiktokIconSocial color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'vimeo': return <VimeoIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'whatsapp': return <WhatsappIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'blog': return <BlogIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'website': return <WebsiteIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'venmo': return <VenmoIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'paypal': return <PaypalIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'applemusic': return <ApplMusicIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'behance': return <BehanceIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'anchor': return <AnchorIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'applePodcast': return <ApplePodcastIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'calendly': return <CalendlyIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'dribbble': return <DribbbleIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'github': return <GithubIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    case 'twitch': return <TwitchIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
    default: return <LinkIcon color={color} fontSize={size || null} className={className || null} style={styles} fill={styles && styles.color} />
  }
}

export const navIcons = (linkFor, color, size, className) => {
  switch (linkFor) {
    case 'publicProfile': return <ContactsIcon color={color} fontSize={size || null} className={className || null} />
    case 'editProfile': return <LineStyleIcon color={color} fontSize={size || null} className={className || null} />
    case 'contacts': return <ConnectionsIcon color={color} fontSize={size || null} className={className || null} />
    default: return <LensIcon color={color} fontSize={size || null} className={className || null} />
  }
}
