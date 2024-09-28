import { Navigate, Route, Routes } from 'react-router-dom'
import { activeUserSelector } from '../selectors'
import BlogPage from './BlogPage'
import Blogs from './Blogs'
import NewPassForm from './forms/NewPassForm'
import ResetPassForm from './forms/ResetPassForm'
import SignInForm from './forms/SignInForm'
import SignUpForm from './forms/SignUpForm'
import NavMenu from './NavMenu'
import NotFound from './NotFound'
import UserPage from './UserPage'
import Users from './Users'

const MainContainer = () => {
  const activeUser = activeUserSelector()

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
