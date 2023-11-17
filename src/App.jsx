import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import RegisterPage from './pages/RegisterPage'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

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
]);

function App() {

  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}

export default App
