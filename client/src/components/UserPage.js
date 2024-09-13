import { useSelector } from 'react-redux'
import { Link as RouterLink, useParams } from 'react-router-dom'
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from '@mui/material'

const UserPage = () => {
  const users = useSelector(state => state.users)
  const { userId } = useParams()
  const user = users.find(user => user.id === userId)

  if (!user) return null

  return (
    <div>
      <Typography
        component='h2'
        variant='h3'
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        {user.name}
      </Typography>
      <Typography variant='body1' color='text.secondary' gutterBottom>
        added blogs:
      </Typography>
      <Grid container spacing={1}>
        {user.blogs.length === 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant='h5' color='text.secondary'>
                  No blogs added yet
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
        {user.blogs.map(blog => (
          <Grid key={blog.id} item xs={12} sm={6}>
            <Card>
              <CardActionArea component={RouterLink} to={`/blogs/${blog.id}`}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant='h5' display='inline-block'>
                    {blog.title}&nbsp;
                  </Typography>
                  <Typography
                    variant='h5'
                    display='inline-block'
                    color='text.secondary'
                  >
                    by&nbsp;
                  </Typography>
                  <Typography variant='h5' display='inline-block'>
                    {blog.author}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default UserPage
