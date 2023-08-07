// import logo from './logo.svg';
// .................................................................... 
// npm run both 
// ....................................................................... 

import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import NoteState from './context/notes/NotesState';
import Alert  from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
// import Aboutnew from './components/Aboutnew';
// import { render } from '@testing-library/react';


function App() {
  const [alert,setAlert] = useState(null);
  const showAlert = (message,type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home showAlert={showAlert} />}></Route>
              <Route path='/about' element={<About />}></Route>
              {/* <Route path='/about' element={<Aboutnew/>}></Route> */}
              <Route path='/login' element={<Login showAlert={showAlert}/>}></Route>
              <Route path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );

}

export default App;
