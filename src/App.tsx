import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { SITE_NAME, COPYRIGHT_YEAR } from "./constants"
import Header from "./components/Header"
import Home from "./pages/Home"
import Post from "./pages/Post"

function App() {
  useEffect(() => {
    document.title = SITE_NAME
  }, [])

  return (
    <div className="font-mono box-content flex flex-col items-center p-6 sm:p-10 md:p-16 m-0 max-w-full">
      <div className="relative flex flex-col items-start w-full max-w-2xl">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:slug" element={<Post />} />
        </Routes>
        <div className="mt-10">
          <p className="copyright text-sm text-ink-muted">
            &copy; {COPYRIGHT_YEAR} {SITE_NAME}
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
