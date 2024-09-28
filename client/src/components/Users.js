import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { usersSelector } from '../store/selectors'
import LinkButton from './common/LinkButton'
import LinkTypographySec from './common/LinkTypographySec'

const Users = () => {
  const users = usersSelector()

  return (
    <Grid container spacing={2}>
      {users.map((user) => (
        <Grid key={user.id} size={{ xs: 12, md: 6 }}>
          <Card>
            <Stack p={1} gap={1}>
              <LinkButton linkTo={`/users/${user.id}`}>
                <Typography
                  display='inline'
                  variant='h5'
                  fontWeight='bold'
                  textAlign='center'
                >
                  {user.name}
                </Typography>
              </LinkButton>
              <Divider />
              <LinkTypographySec textAlign='center' noWrap>
                Blogs submitted: {user.blogs.length}
              </LinkTypographySec>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default Users
