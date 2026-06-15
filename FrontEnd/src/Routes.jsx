
import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'
import {BrowserRouter ,Routes , Route} from 'react-router'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<h1>welcome</h1>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>


        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

