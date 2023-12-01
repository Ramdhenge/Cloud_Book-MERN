import './App.css';
import { Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Signup from './Components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './Components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }

  return (
    <>
      <NoteState >
        <Nav />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </>
  );
}

export default App;
