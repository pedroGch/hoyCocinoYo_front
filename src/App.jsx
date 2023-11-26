import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage'
import UploadPage from './pages/UploadPage'
import SavedPage from './pages/SavedPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element:  <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/upload",
    element: localStorage.getItem('token') ? <UploadPage /> : <LoginPage />,
  },
  {
    path: "/saved",
    element: localStorage.getItem('token') ? <SavedPage /> : <LoginPage />,
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
