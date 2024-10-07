import Container from '@mui/material/Container'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Header from './components/Header'
import Loading from './components/Loading'
import MainContainer from './components/MainContainer'
import Notification from './components/Notification'
import ThemeSwitch from './components/ThemeSwitch'
import { initializeActiveUser } from './store/reducers/activeUserReducer'
import { initializeBlogs } from './store/reducers/blogsReducer'
import { initializeUsers } from './store/reducers/usersReducer'

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const dispatch = useDispatch()
  const timeoutId = useRef(null)

  useEffect(() => {
    const initializeState = async () => {
      document.body.classList.remove('dark-fallback')
      await dispatch(initializeBlogs())
      await dispatch(initializeActiveUser())
      await dispatch(initializeUsers())
      setIsInitialized(true)
    }

    timeoutId.current = setTimeout(initializeState, 200)

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
        timeoutId.current = null
      }
    }
  }, [])

  return (
    <Container sx={{ p: { xs: 2, sm: 3 } }}>
      <ThemeSwitch />
      <Notification />
      <Header />
      <main>{isInitialized ? <MainContainer /> : <Loading />}</main>
    </Container>
  )
}

export default App
