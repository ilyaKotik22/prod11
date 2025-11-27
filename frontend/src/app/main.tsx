
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import './styles/normalize.css'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <main >
      
    <App />
    
    </main>
    
  </Provider>,
)
