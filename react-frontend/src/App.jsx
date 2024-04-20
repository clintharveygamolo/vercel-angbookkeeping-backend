import { useState } from 'react'
import './App.css'
import LogInForm from './Log-in/LogInForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LogInForm />
    </div>
  )
}

export default App
