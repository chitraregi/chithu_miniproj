import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import './login.styles.css'
import firebase from '../firebase'

const Login = () => {
  const [cred, setCred] = useState({
    mail: '',
    password: '',
  })

  const handleChange = (e) => {
    const value = e.target.value
    switch (e.target.name) {
      case 'mail':
        setCred({ ...cred, mail: value })
        break
      case 'password':
        setCred({ ...cred, password: value })
        break
      default:
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEmpty(cred)) {
      if (areInputsValid(mail, password)) {
        firebase.auth().signInWithEmailAndPassword(mail, password)
      } else {
        message.error('Inputs are Not Valid')
      }
    } else {
      message.error('Fill in all Inputs')
    }
  }

  const isEmpty = ({ mail, password }) => mail && password

  const areInputsValid = (mail, password) =>
    isMailValid(mail) && isPasswordValid(password)

  const isMailValid = (mail) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(mail).toLowerCase())) {
      return true
    }
    message.error('Email Invalid', 1)
    return false
  }

  const isPasswordValid = (password) => password.length >= 8

  const { mail, password } = cred
  return (
    <div className='login'>
      <div className='login__border'>
        <Form className='login__form'>
          <h1>Login</h1>
          <Form.Item className='login__formInput'>
            <Input
              type='email'
              placeholder='Enter your Email'
              name='mail'
              value={mail}
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item className='login__formInput'>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={(e) => handleChange(e)}
              placeholder='Enter your Password'
            />
          </Form.Item>
          <Button
            type='primary'
            size='large'
            className='login__formBtn'
            htmlType='submit'
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login
