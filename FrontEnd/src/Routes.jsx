
import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'
import {BrowserRouter ,Routes , Route} from 'react-router'
import Feed from './Features/Post/Pages/Feed'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Feed/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>


        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

