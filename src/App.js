import React, { useState } from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css';
import cogoToast from 'cogo-toast'
import { UserProvider } from './context/userContext'
import Login from './views/Login'
import Department from './views/Departments'
import Instructor from './views/Instructors'
import Student from './views/Students'
import Course from './views/Courses'
import Enrollments from './views/Enrollments'
import Navbar from './components/Navbar'
import Home from './views/Home'
import Register from './views/Register'

function App() {
  const [logged, setLogged]  = useState(false);
  const login = () => {
    setLogged(true);
  }
  const logOut = () => {
    cogoToast.success(<div><b>Logout</b>"You have been succesfully logged out."</div>, {position: 'bottom-right'})
    localStorage.removeItem('StudentId');
    localStorage.removeItem('Role');
    setLogged(false);
  }
  if(!logged){
    return(
      <Router>
        <Switch>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/">
            <Login setLogin={login} />
          </Route>
        </Switch>
      </Router>
      
    )
  }
  else if(localStorage.getItem("Role") === "Admin"){
    return (
      <Router>
        <div className="App">
          <Navbar logOut={() => logOut()}/>
          <Switch>
            <Route path="/Department">
              <Department />
            </Route>
            <Route path="/Instructor">
              <Instructor />
            </Route>
            <Route path="/Student">
              <Student />
            </Route>
            <Route path="/Course">
              <Course />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>  
          
        </div>
      </Router>
    );
  }else{
    return(
      <Router>
        <div className="App">
          <Navbar logOut={logOut}/>
          <Switch>
            <Route path="/Enrollments">
              <UserProvider  id={localStorage.getItem("StudentId")}>
                <Enrollments />
              </UserProvider>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>  
        </div>
      </Router>
    );
  }
}

export default App;
