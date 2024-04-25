import { useState } from 'react'
import './App.css'
import LogInForm from '/src/Log-in/LogInForm'
import { Routes , Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<LogInForm />} />
    </Routes>
  );
}

export default App;
