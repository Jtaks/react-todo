import { createContext } from 'react'

// TODO: Finish the rest of the theme
export const theme = {
  dark: {
    elevation: {
      zero: {
        backgroundColor: '#000000',
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.15), 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0)'
      },
      one: {
        backgroundColor: '#121212',
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.1), 0 0 0 rgba(0, 0, 0, 0), 0 1px 1px rgba(0, 0, 0, 0.2)'
      },
      two: {
        backgroundColor: '#212121',
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.2)'
      },
      three: {
        backgroundColor: '#272727',
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2), 0 8px 24px rgba(0, 0, 0, 0.2)'
      },
      four: {
        backgroundColor: '#2d2d2d',
        boxShadow:
          '0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.2), 0 18px 46px 6px rgba(0, 0, 0, 0.2)'
      }
    },
    color: {
      default: 'rgba(255, 255, 255, 0.8)',
      subtle: 'rgba(255, 255, 255, 0.6)',
      disabled: 'rgba(255, 255, 255, 0.4)',
      muted: 'rgba(255, 255, 255, 0.2)'
    },
    success: {
      backgroundColor: '#0A6640'
    },
    danger: {
      backgroundColor: '#A82A2A'
    }
  },
  light: {
    elevation: {
      zero: {
        backgroundColor: '#fff',
        boxShadow:
          '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
      },
      one: {
        backgroundColor: '#fff',
        boxShadow:
          '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
      },
      two: {
        backgroundColor: '#fff',
        boxShadow:
          '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
      },
      three: {
        backgroundColor: '#fff',
        boxShadow:
          '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
      },
      four: {
        backgroundColor: '#fff',
        boxShadow:
          '0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)'
      }
    },
    color: {
      default: 'rgba(0, 0, 0, 0.8)',
      subtle: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.4)',
      muted: 'rgba(0, 0, 0, 0.2)'
    },
    success: {
      backgroundColor: '#0A6640'
    },
    danger: {
      backgroundColor: '#A82A2A'
    }
  }
}

export const defaultContext = {
  theme: theme,
  modes: { LIGHT: 'light', DARK: 'dark' },
  toggleTheme: () => {}
}

defaultContext.toggleTheme = defaultContext.toggleTheme.bind(defaultContext)

export const ThemeContext = createContext(defaultContext)
