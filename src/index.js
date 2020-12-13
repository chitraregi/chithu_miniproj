import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import 'antd/dist/antd.css'
import Login from './components/login.component'
import Register from './components/register.component'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom'

import firebase from './firebase'

//store for storing and accessing variables in redux

const Root = () => {
  const history = useHistory({}) // hook for handling the history
  useEffect(() => {
    const set = async () => {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          history.push('/')
        } else {
          history.push('/login')
        }
      })
    }
    set()
    //eslint-disable-next-line
  }, [])

  return (
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </Switch>
  )
}

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('root')
)
