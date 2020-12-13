import { Button } from 'antd'
import './App.css'
import firebase from './firebase'

function App() {
  const handleSignOut = () => {
    firebase.auth().signOut()
  }
  return (
    <div className='App'>
      App <Button onClick={() => handleSignOut()}>SignOut</Button>
    </div>
  )
}

export default App
