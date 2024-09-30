import { useDispatch } from 'react-redux'
import { logoutUser } from '../../store/reducers/activeUserReducer'
import { activeUserSelector } from '../../store/selectors'
import NavAvatar from './NavAvatar'
import NavButton from './NavButton'
import NavStack from './NavStack'

const NavMenu = () => {
  const activeUser = activeUserSelector()
  const dispatch = useDispatch()

  const handleLogout = () => dispatch(logoutUser())

  return (
    <NavStack direction='row-reverse' mb={{ xs: 2, sm: 3 }}>
      {activeUser ? (
        <NavStack inner flexWrap='wrap-reverse'>
          <NavButton sx={{ ml: 'auto' }} onClick={handleLogout}>
            Sign Out
          </NavButton>
          <NavAvatar
            linkTo={`/users/${activeUser.id}`}
            name={activeUser.name}
          />
        </NavStack>
      ) : (
        <NavStack inner>
          <NavButton linkTo='/signup' sx={{ ml: 'auto' }}>
            Sign Up
          </NavButton>
          <NavButton linkTo='/signin'>Sign In</NavButton>
        </NavStack>
      )}
      <NavStack inner>
        <NavButton linkTo='/blogs' sx={{ width: { xs: 'auto', sm: 146 } }}>
          Blogs
        </NavButton>
        <NavButton
          linkTo='/users'
          sx={{ width: { xs: 'auto', sm: 146 }, mr: 'auto' }}
        >
          Users
        </NavButton>
      </NavStack>
    </NavStack>
  )
}

export default NavMenu
