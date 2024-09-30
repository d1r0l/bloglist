import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../store/reducers/activeUserReducer'
import { activeUserSelector } from '../../store/selectors'
import NavAvatar from './NavAvatar'
import NavButton from './NavButton'
import NavStack from './NavStack'

const NavMenu = () => {
  const activeUser = activeUserSelector()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/signin')
  }

  return (
    <NavStack direction='row-reverse' mb={{ xs: 2, sm: 3 }}>
      <NavStack inner flexWrap='wrap-reverse' flexBasis={0}>
        <NavButton sx={{ ml: 'auto' }} onClick={handleLogout}>
          Logout
        </NavButton>
        <NavAvatar linkTo={`/users/${activeUser.id}`} name={activeUser.name} />
      </NavStack>
      <NavStack inner>
        <NavButton linkTo='/blogs'>Blogs</NavButton>
        <NavButton linkTo='/users' sx={{ mr: 'auto' }}>
          Users
        </NavButton>
      </NavStack>
    </NavStack>
  )
}

export default NavMenu
