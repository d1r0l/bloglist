import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { userSelector } from '../store/selectors'
import BlogsGrid from './BlogsGrid'
import Loading from './Loading'

const UserPage = () => {
  const { userId } = useParams()
  const user = userSelector(userId)

  if (!user) return <Loading />

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
