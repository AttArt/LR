import './App.css';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './page/home';
import Login from './page/Login';
import Sidebar from './components/sidebar';
import Topnav from './components/topnav';

function App() {

  const [loading,setLoading]=useState(true)
  const spinner=document.getElementById("spinner")
  const location=useLocation()
  if(spinner) {
    setTimeout(()=>{
      spinner.style.display="none";
      setLoading(false)
    },1000)
  }

  const [isOpen, setIsopen] = useState(false);
  const ToggleSidebar = () => {
        isOpen === true ? setIsopen(false) : setIsopen(true);
    }



  return (
    !loading && (
        <> 
            <div className="container-fluid m-0 p-0">
                    {
                      location.pathname==="/Login" ? null : <Topnav ToggleSidebar={() => { ToggleSidebar(); }}
                      />
                       
                    }
                    <div className={`content_main ${location.pathname==="/Login" ? 'active' : ''}`}>
                      {
                        location.pathname==="/Login" ? null : 
                        <Sidebar  
                          isOpen = {isOpen} 
                          ToggleSidebar={() => { ToggleSidebar(); }}
                          location ={ {pathname:location.pathname}}
                        />
                      }
                      
                      <div className="main">
                        <Routes>
                          <Route exact path='/' element={<Home />}/>
                          <Route path='/Login' element={<Login />}/>
                        </Routes>
                      </div>
                    </div>
           </div>
           
        </>
    )
  );
}

export default App;