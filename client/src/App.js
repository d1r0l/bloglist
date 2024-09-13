import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeActiveUser } from './reducers/activeUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import Container from '@mui/material/Container'
import Notification from './components/Notification'
import Header from './components/Header'
import Loading from './components/Loading'
import MainContainer from './components/MainContainer'

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
