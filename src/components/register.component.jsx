import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import './login.styles.css'
import firebase from '../firebase'

const Register = () => {
  const [cred, setCred] = useState({
    username: '',
    mail: '',
    password: '',
    address: '',
    age: '',
    phno: '',
    cfphno: '',
  })
  const [userRef] = useState(firebase.database().ref('users'))

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    switch (name) {
      case 'username':
        setCred({ ...cred, username: value })
        break
      case 'mail':
        setCred({ ...cred, mail: value })
        break
      case 'password':
        setCred({ ...cred, password: value })
        break
      case 'address':
        setCred({ ...cred, address: value })
        break
      case 'age':
        setCred({ ...cred, age: value })
        break
      case 'phno':
        setCred({ ...cred, phno: value })
        break
      case 'cfphno':
        setCred({ ...cred, cfphno: value })
        break

      default:
        break
    }
  }

  const isMailValid = (mail) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (re.test(String(mail).toLowerCase())) {
      return true
    }
    message.error('Email Invalid', 1)
    return false
  }

  const handleSubmit = (e) => {
    if (isEmpty(cred)) {
      if (areInputsValid(cred)) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(mail, password)
          .then((createdUser) => {
            message.success('Submitted Successfully', 1)
            createdUser.user
              .updateProfile({
                displayName: username,
              })
              .then(() => {
                saveUser(createdUser)
                setCred({
                  username: '',
                  mail: '',
                  password: '',
                  address: '',
                  age: '',
                  phno: '',
                  cfphno: '',
                })
              })
              .catch((err) => {
                message.error(err.message)
                setCred({
                  username: '',
                  mail: '',
                  password: '',
                  address: '',
                  age: '',
                  phno: '',
                  cfphno: '',
                })
              })
          })
          .catch((err) => {
            message.error(err.message)
            setCred({
              username: '',
              mail: '',
              password: '',
              address: '',
              age: '',
              phno: '',
              cfphno: '',
            })
          })
      }
    } else {
      message.error('Empty Input')
      setCred({
        username: '',
        mail: '',
        password: '',
        address: '',
        age: '',
        phno: '',
        cfphno: '',
      })
    }
  }

  const saveUser = (createdUser) => {
    return userRef.child(createdUser.user.uid).set({
      id: createdUser.user.uid,
      name: createdUser.user.displayName,
      address: address,
      age: age,
      phno: phno,
      closeFriendPhno: cfphno,
    })
  }

  const { username, mail, password, address, age, phno, cfphno } = cred

  const areInputsValid = ({ mail, password, phno, cfphno }) => {
    if (isMailValid(mail) && isPassValid(password) && isPhValid(phno, cfphno)) {
      return true
    }
    message.error('Input Invalid')
    return false
  }

  const isPhValid = (phn, cfphn) => {
    if (
      phn.length > 8 &&
      phn.length === 10 &&
      cfphn.length > 8 &&
      cfphn.length === 10
    ) {
      return true
    }
    message.error('Phno Invalid')
    return false
  }

  const isPassValid = (password) => {
    if (password.length > 8) {
      return true
    } else {
      message.error('Password Invalid')
      return false
    }
  }

  const isEmpty = ({ username, mail, password, address, age, phno, cfphno }) =>
    username && mail && password && address && age && phno && cfphno

  return (
    <div className='login'>
      <div className='login__border'>
        <Form className='login__form'>
          <h1>REGISTER</h1>
          <Form.Item className='login__formInput'>
            <Input
              value={username}
              type='text'
              placeholder='Enter your Username'
              name='username'
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item className='login__formInput'>
            <Input
              value={mail}
              type='email'
              placeholder='Enter your Email'
              onChange={(e) => handleChange(e)}
              name='mail'
            />
          </Form.Item>
          <Form.Item className='login__formInput'>
            <Input
              value={password}
              type='password'
              name='password'
              placeholder='Enter your Password'
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={address}
              type='text'
              name='address'
              placeholder='Enter your Address'
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={age}
              type='number'
              name='age'
              onChange={(e) => handleChange(e)}
              placeholder='Enter your age'
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={phno}
              type='number'
              name='phno'
              placeholder='Enter your Phonenumber'
              onChange={(e) => handleChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              value={cfphno}
              type='number'
              name='cfphno'
              onChange={(e) => handleChange(e)}
              placeholder="Enter your close friend's Phonenumber"
            />
          </Form.Item>

          <Button
            type='primary'
            size='large'
            className='login__formBtn'
            htmlType='submit'
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Register
