import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./providers/AppRouter"
import { Suspense } from "react"
import { LoaderPage } from "../pages/loader/loaderPage"
import { Header } from "../widgets/Header/Header"
import { Footer } from "../widgets/Footer/Footer"



function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <AppRouter/>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
