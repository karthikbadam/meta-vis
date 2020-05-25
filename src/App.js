import React, { useReducer } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import LandingPage from './containers/LandingPage'
import { light, dark } from './theme'

export const GlobalStyles = createGlobalStyle`
  body, #root {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }
`

const Context = React.createContext(null)

const reducer = (state = { }, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return {
        isDark: !state.isDark
      }
    default:
      return state
  }
}

function App () {
  const [state, dispatch] = useReducer(reducer, {
    isDark: true
  })
  return (
    <Context.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={state.isDark ? dark : light}>
        <GlobalStyles />
        <Router>
          <Route exact path='/' component={LandingPage} />
        </Router>
      </ThemeProvider>
    </Context.Provider>
  )
}

export default App
