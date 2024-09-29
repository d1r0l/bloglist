import Avatar from '@mui/material/Avatar'
import Link from '@mui/material/Link'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

const getInitials = (name) => {
  const parts = name.split(' ')
  if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase()
  else return parts[0][0].toUpperCase()
}

const NavAvatar = ({ name, linkTo }) => {
  return (
    <Link component={RouterLink} to={linkTo} sx={{ textDecoration: 'none' }}>
      <Avatar
        sx={{ bgcolor: 'secondary.main', height: 36.5, width: 36.5 }}
        alt={name}
      >
        {getInitials(name)}
      </Avatar>
    </Link>
  )
}

NavAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  linkTo: PropTypes.string
}

export default NavAvatar
