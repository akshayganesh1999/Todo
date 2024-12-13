import './App.css'
import { Routes, Route } from 'react-router-dom'
import Todo from './Todo'
import Login from './Login'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </>
  )
}

export default App
