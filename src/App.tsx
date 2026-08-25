import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { SITE_NAME, COPYRIGHT_YEAR } from "./constants"
import Header from "./components/Header"
import Home from "./pages/Home"
import Post from "./pages/Post"

function App() {
  const { pathname } = useLocation()
  const isHome = pathname === "/"

  useEffect(() => {
    if (isHome) document.title = SITE_NAME
  }, [isHome])

  return (
    <div
      className={`font-mono box-content flex min-h-dvh flex-col items-center px-6 sm:px-10 md:px-16 m-0 max-w-full ${
        isHome ? "justify-center" : ""
      }`}
    >
      <div
        className={`flex w-full max-w-2xl flex-col items-start ${
          isHome ? "" : "min-h-dvh py-6 sm:py-10 md:py-16"
        }`}
      >
        <Header />
        <div className={isHome ? "contents" : "flex-1"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/:slug" element={<Post />} />
          </Routes>
        </div>
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
