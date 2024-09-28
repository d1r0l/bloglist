import Container from '@mui/material/Container'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Loading from './components/Loading'
import MainContainer from './components/MainContainer'
import Notification from './components/Notification'
import { initializeActiveUser } from './reducers/activeUserReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()

  const initializeState = async () => {
    await dispatch(initializeBlogs())
    await dispatch(initializeActiveUser())
    await dispatch(initializeUsers())
    setIsInitialized(true)
  }

  useEffect(() => {
    initializeState()
  }, [])

  return (
    <Container sx={{ p: { xs: 2, sm: 3 } }}>
      <Notification />
      <Header />
      <main>{isInitialized ? <MainContainer /> : <Loading />}</main>
    </Container>
  )
}

export default App
