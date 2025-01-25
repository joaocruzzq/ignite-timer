import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'

import { GlobalStyles } from './styles/global'

import { Router } from './router'
import { BrowserRouter } from 'react-router-dom'

import { CyclesContextProvider } from './contexts/cyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      
      <GlobalStyles />
    </ThemeProvider>
  )
}