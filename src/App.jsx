import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage'
import UploadPage from './pages/UploadPage'
import SavedPage from './pages/SavedPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Upload } from '@mui/icons-material';

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/upload",
    element: <UploadPage />,
  },
  {
    path: "/saved",
    element: <SavedPage />,
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
