import Typography from '@mui/material/Typography'
import { Navigate, useParams } from 'react-router-dom'
import { userSelector } from '../store/selectors'
import BlogsGrid from './BlogsGrid'

const UserPage = () => {
  const { userId } = useParams()
  const user = userSelector(userId)

  if (!user) return <Navigate to='/404' />

  return (
    <>
      <Typography variant='h2' gutterBottom>
        {user.name}
      </Typography>
      <BlogsGrid blogs={user.blogs} />
    </>
  )
}

export default UserPage
