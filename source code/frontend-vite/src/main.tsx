import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './Redux Toolkit/Store.ts'
import { BrowserRouter } from 'react-router-dom'
import { ThemeModeProvider } from './Theme/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeModeProvider>
          <App />
        </ThemeModeProvider>
      </BrowserRouter>

    </Provider>

  </StrictMode>,
)
