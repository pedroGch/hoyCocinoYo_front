import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage'
import UploadPage from './pages/UploadPage'
import SavedPage from './pages/SavedPage'
import AdminPage from './pages/AdminPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RecipeDetailsPage from './pages/recipes/RecipeDetailsPage'
import EditRecipePage from './pages/recipes/EditRecipePage'

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/recipes/:id",
    element: <RecipeDetailsPage />,
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
    element: localStorage.getItem('token') ? <UploadPage /> : <LoginPage />,
  },
  {
    path: "/saved",
    element: localStorage.getItem('token') ? <SavedPage /> : <LoginPage />,
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
  {
    path: "/admin",
    element: localStorage.getItem('token') ? <AdminPage /> : <LoginPage />
  },
  {
    path: "/recipes/:id/edit",
    element: localStorage.getItem('token') ? <EditRecipePage /> : <LoginPage />,
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
