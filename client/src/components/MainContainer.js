import { Navigate, Route, Routes } from 'react-router-dom'
import { activeUserSelector } from '../store/selectors'
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
import UserVerification from './UserVerification'

const MainContainer = () => {
  const activeUser = activeUserSelector()

  return (
    <>
      <NavMenu />
      <Routes>
        <Route path='/' element={<Navigate to='/blogs' />} />
        <Route path='/404' element={<NotFound />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:userId' element={<UserPage />} />
        <Route path='/blogs/:blogId' element={<BlogPage />} />
        {activeUser ? (
          <>
            <Route path='/signup' element={<Navigate to='/blogs' />} />
            <Route path='/signin' element={<Navigate to='/blogs' />} />
            <Route path='/resetpassword/*' element={<Navigate to='/blogs' />} />
            <Route path='/users/:userId/*' element={<UserPage />} />
          </>
        ) : (
          <>
            <Route path='/signin' element={<SignInForm />} />
            <Route path='/signup' element={<SignUpForm />} />
            <Route path='/resetpassword' element={<ResetPassForm />} />
            <Route
              path='/resetpassword/:userId/:token'
              element={<NewPassForm />}
            />
            <Route
              path='/users/:userId/:token'
              element={<UserVerification />}
            />
          </>
        )}
        <Route path='/*' element={<Navigate to='/404' />} />
      </Routes>
    </>
  )
}

export default MainContainer
