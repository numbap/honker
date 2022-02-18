import { useState, useEffect } from 'react'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/RegisterPage'
import { FormRow, Alert } from '../components'
import { useAppContext, registerUser } from '../context/appContext'
import { REGISTER_USER } from '../context/actions'
import { useNavigate } from 'react-router-dom'
// global context and useNavigate later

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
  user: null,
  token: null, 
  userLocation: null
}
// if possible prefer local state
// global state

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
    const {
      isLoading, 
      showAlert, 
      displayAlert, 
      user,
      clearAlert, 
      setupUser} = useAppContext();



    // const currentUser = {name, email, password} 
    // if(isMember){
    //   console.log('already a member')
    // }else{
    //   registerUser(currentUser) 
    // }
  // global context and useNavigate later

  const handleChange = (e) => {
       setValues({...values, [e.target.name]: e.target.value})
  }


  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }


  const onSubmit = (e) => {
    e.preventDefault()
    const {name, email, password, isMember, user, token, userLocation} = values
    
    if(!email || !password || (!isMember && !name)){
        displayAlert()
        return
    }
    const currentUser = {name, email, password}
    if(isMember){
      setupUser({
        currentUser, 
        endPoint: 'login', 
        alertText: 'Login successful! Redirecting...'})
    }else{
      setupUser({
        currentUser, 
        endPoint: 'register', 
        alertText: 'Registration successful! Redirecting...'})
    }
    console.log(values)

  }


  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        {showAlert && <Alert />}


        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
          )}

        <FormRow type={"text"} name={"email"} value={values.email} labelText={"Email"} handleChange={handleChange}/>
        <FormRow type={"password"} name={"password"} value={values.password} labelText={"Password"} handleChange={handleChange}/>

        <button type='submit' className='btn btn-block' disable={isLoading}>
            {values.isMember ? 'Login' : 'Register'}
        </button>

        <p>
        {values.isMember ? 'Not a member yet?' : 'Already a member?'}
  
        <button type='button' onClick={toggleMember} className='member-btn'>
          {values.isMember ? 'Register' : 'Login'}
        </button>
      </p>
      </form>
    </Wrapper>
  )
}


export default Register
