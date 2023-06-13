import './App.css';
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './flags.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './page/home';
import Login from './page/Login';
import Sidebar from './components/sidebar';
import Topnav from './components/topnav';
import DataTable from './page/datatable';

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
                     {
                        location.pathname==="/Login" ? null : 
                        <Sidebar  
                          isOpen = {isOpen} 
                          ToggleSidebar={() => { ToggleSidebar(); }}
                          location ={ {pathname:location.pathname}}
                        />
                      }
                    <div className={`content_main ${location.pathname==="/Login" ? 'active' : ''}`}>
                     
                      
                      <div className="main">
                        <Routes>
                          <Route exact path='/' element={<Home />}/>
                          <Route path='/Login' element={<Login />}/>
                          <Route path='/A' element={<DataTable />}/>

                        </Routes>
                      </div>
                    </div>
           </div>
           
        </>
    )
  );
}

export default App;