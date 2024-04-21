import { useState } from 'react'
import './App.css'
import LogInForm from './Log-in/LogInForm'
import Sidebar from './Components/Sidebar'

function App() {
  const [count, setCount] = useState(0)

  return (
    //<div>
    //<LogInForm />
    //</div>
    <div>
      <Sidebar />
    </div>
  )
}

export default App
