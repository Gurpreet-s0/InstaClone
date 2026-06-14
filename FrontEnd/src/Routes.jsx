
import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'
import {BrowserRouter ,Routes , Route} from 'react-router'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>


        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

