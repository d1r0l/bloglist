import Avatar from '@mui/material/Avatar'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../../reducers/activeUserReducer'
import { activeUserSelector } from '../../selectors'
import NavButton from './NavButton'
import NavStack from './NavStack'

const getInitials = (user) => {
  const parts = user.name.split(' ')
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
  else return parts[0][0].toUpperCase()
}

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
        <Avatar
          sx={{ bgcolor: 'secondary.main', height: 36.5, width: 36.5 }}
          alt={activeUser.name}
        >
          {getInitials(activeUser)}
        </Avatar>
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
