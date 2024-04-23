import { useState } from 'react'
import './App.css'
import LogInForm from './Log-in/LogInForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LogInForm />
    </div>

    //<h1 className="text-3xl font-bold underline">
    //Hello world!
    //</h1>
  )
}

export default App
