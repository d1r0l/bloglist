import { useSelector } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import Users from './Users'
import Blogs from './Blogs'
import UserPage from './UserPage'
import NavMenu from './NavMenu'
import BlogPage from './BlogPage'
import NotFound from './NotFound'
import SignInForm from './forms/SignInForm'
import SignUpForm from './forms/SignUpForm'
import ResetPassForm from './forms/ResetPassForm'
import NewPassForm from './forms/NewPassForm'

const MainContainer = () => {
  const activeUser = useSelector(state => state.activeUser)

  if (!activeUser)
    return (
      <Routes>
        <Route path='/signin' element={<SignInForm />} />
        <Route path='/signup' element={<SignUpForm />} />
        <Route path='/resetpassword' element={<ResetPassForm />} />
        <Route path='/resetpassword/:userId/:token' element={<NewPassForm />} />
        <Route path='*' element={<Navigate to='/signin' />} />
      </Routes>
    )
  else
    return (
      <>
        <NavMenu />
        <Routes>
          <Route path='/' element={<Navigate to='/blogs' />} />
          <Route path='blogs' element={<Blogs />} />
          <Route path='users' element={<Users />} />
          <Route path='users/:userId' element={<UserPage />} />
          <Route path='blogs/:blogId' element={<BlogPage />} />
          <Route path='/signup' element={<Navigate to='/blogs' />} />
          <Route path='/signin' element={<Navigate to='/blogs' />} />
          <Route path='/resetpassword' element={<Navigate to='/blogs' />} />
          <Route
            path='/resetpassword/:userId/:token'
            element={<Navigate to='/blogs' />}
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    )
}

export default MainContainer
