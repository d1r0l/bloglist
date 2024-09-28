import { configureStore } from '@reduxjs/toolkit'
import activeUserReducer from './reducers/activeUserReducer'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    users: usersReducer,
    activeUser: activeUserReducer,
    notification: notificationReducer
  }
})

export default store
