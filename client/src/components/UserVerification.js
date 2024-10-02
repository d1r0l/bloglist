import NewReleasesIcon from '@mui/icons-material/NewReleases'
import VerifiedIcon from '@mui/icons-material/Verified'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { verifyUser } from '../store/reducers/usersReducer'
import FormButton from './forms/common/FormButton'
import FormContainer from './forms/common/FormContainer'
import FormHeader from './forms/common/FormHeader'
import Loading from './Loading'

const UserVerification = () => {
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const { userId, token } = useParams()
  const dispatch = useDispatch()

  const verify = async () => {
    const isSuccessful = await dispatch(verifyUser(userId, token))
    setIsSuccessful(isSuccessful)
    setIsVerifying(false)
  }

  useEffect(() => {
    verify()
  }, [])

  if (isVerifying) return <Loading />

  return (
    <FormContainer>
      {isSuccessful ? (
        <>
          <FormHeader
            icon={<VerifiedIcon />}
            label='Verification successful!'
            comment='You can now sign in.'
          />
          <FormButton component={RouterLink} to='/signin'>
            Go to sign in
          </FormButton>
        </>
      ) : (
        <>
          <FormHeader
            icon={<NewReleasesIcon />}
            label='Verification failed!'
            comment='Please check the link and try again.'
          />
          <FormButton component={RouterLink} to='/'>
            Go home
          </FormButton>
        </>
      )}
    </FormContainer>
  )
}

export default UserVerification
