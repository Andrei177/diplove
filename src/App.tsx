import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './shared/NavBar/Navbar.tsx'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
