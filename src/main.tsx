import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import { App } from '@/App'
import { store } from '@/services/store'
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
