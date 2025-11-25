
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from './store/index.ts'
import { Provider } from 'react-redux'
import './styles/normalize.css'
import './styles/index.css'
import { Header } from '../widgets/Header/Header.tsx'
import { Footer } from '../widgets/Footer/Footer.tsx'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <main >
      <Header/>
    <App />
    <Footer/>
    </main>
    
  </Provider>,
)
