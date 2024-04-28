import { useState } from 'react'
import './App.css'
import LogInForm from '/src/Log-in/LogInForm'
import Dashboard from './Components/Dashboard'
import { Routes , Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<LogInForm />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  );
}

export default App;
