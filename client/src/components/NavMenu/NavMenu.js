import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import NavButton from './NavButton'
import { logoutUser } from '../../reducers/activeUserReducer'
import NavStack from './NavStack'
import Avatar from '@mui/material/Avatar'

const getInitials = user => {
  const parts = user.name.split(' ')
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
  else return parts[0][0].toUpperCase()
}

const NavMenu = () => {
  const activeUser = useSelector(state => state.activeUser)

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
