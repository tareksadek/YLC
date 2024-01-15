import {
  useState,
  useEffect,
} from 'react'

import { defaultSettings } from '../utilities/appVars'

export const useLayoutMode = () => {
  const [layout, setLayout] = useState(defaultSettings.layout)

  useEffect(() => {
    const localLayout = window.localStorage.getItem('layout')
    if (localLayout && localLayout !== 'null') {
      setLayout(localLayout)
    }
  }, []);

  const toggleLayout = () => {
    if (layout === 'social') {
      window.localStorage.setItem('layout', 'business')
      setLayout('business')
    } else {
      window.localStorage.setItem('layout', 'social')
      setLayout('social')
    }
  }

  const switchLayout = layoutMode => {
    setLayout(layoutMode)
    window.localStorage.setItem('layout', layoutMode)
  }

  return {
    layout, toggleLayout, switchLayout,
  }
}
