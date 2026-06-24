
import Login from './Features/Auth/Pages/Login'
import Register from './Features/Auth/Pages/Register'
import {BrowserRouter ,Routes , Route} from 'react-router'
import Feed from './Features/Post/Pages/Feed'
import CreatePost from './Features/Post/Pages/CreatePost'

const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Feed/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path='/create-post' element={<CreatePost/>}></Route>

        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

