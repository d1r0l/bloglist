import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import { userSelector } from '../selectors'
import BlogsGrid from './BlogsGrid'
import Loading from './Loading'

const UserPage = () => {
  const { userId } = useParams()
  const user = userSelector(userId)

  if (!user) return <Loading />

  return (
    <>
      <Typography
        component='h2'
        variant='h3'
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        {user.name}
      </Typography>
      <BlogsGrid blogs={user.blogs} />
    </>
  )
}

export default UserPage
