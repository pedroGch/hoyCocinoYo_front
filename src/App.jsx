import LoginPage from "./pages/LoginPage"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const route = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
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
