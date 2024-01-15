import React from 'react'
import MetaTags from 'react-meta-tags'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { useLanguage } from '../hooks/useLang'

const AppMeta = ({ base64Photo }) => {
  const language = useLanguage()
  const photo = base64Photo && `data:${base64Photo.type};base64,${base64Photo.code}`

  return (
    <MetaTags>
      <meta charSet="utf-8" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, nofollow" />
      <title>{parse(language.languageVars.appNameCAPS)}</title>
      <meta name="description" content={parse(language.languageVars.appSlogan)} />
      <meta name="image" content={`${photo || `/assets/images/${language.languageVars.appNameSM}-image.jpg`}`} />
      <meta itemProp="name" content={parse(language.languageVars.appNameCAPS)} />
      <meta itemProp="description" content={parse(language.languageVars.appSlogan)} />
      <meta itemProp="image" content={`${photo || `/assets/images/${language.languageVars.appNameSM}-image.jpg`}`} />
      {/* <meta property="og:site_name" content={`${language.languageVars.appName} ${language.languageVars.appSlogan}`} />
      <meta property="og:title" content={parse(language.languageVars.appNameCAPS)} />
      <meta property="og:description" content={parse(language.languageVars.appSlogan)} />
      <meta property="og:image" content={`${photo || `/assets/images/${language.languageVars.appNameSM}-og.jpg`}`} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={parse(language.languageVars.appNameCAPS)} />
      <meta name="twitter:description" content={parse(language.languageVars.appSlogan)} />
      <meta name="twitter:site" content={`@${language.languageVars.appName}`} />
      <meta name="twitter:image:src" content={`${photo || `/assets/images/${language.languageVars.appNameSM}-tw.jpg`}`} /> */}
    </MetaTags>
  )
}

const mapStateToProps = state => ({
  base64Photo: state.cards.base64Photo,
})

AppMeta.defaultProps = {
  base64Photo: null,
}

AppMeta.propTypes = {
  base64Photo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default connect(mapStateToProps, null)(AppMeta)
