import { AuthProvider } from "./context/AuthProvider"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import PrivateRoutes from "@components/PrivateRoutes"
import HomePage from "./pages/HomePage/HomePage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import Chat from "@components/Chat/Chat"
import { NotFoundPage } from "@pages/NotFoundPage/NotFoundPage"

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        },
        {
            path: '/chat',
            element: <PrivateRoutes />,
            children: [
                {
                    path: '',
                    element: <Chat />
                },
            ]

        },
        {
            path: '*',
            element: <NotFoundPage />
        },

    ])

    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App
