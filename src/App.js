import React from 'react';
import{
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import './App.css';
import { UserProvider } from './context/userContext'
import Department from './views/Departments'
import Instructor from './views/Instructors'
import Student from './views/Students'
import Course from './views/Courses'
import Enrollments from './views/Enrollments'
import Navbar from './components/Navbar'
import Home from './views/Home'

function App() {
  return (
    <Router>
      <div className="App">
      <UserProvider  id={3}>
        <Navbar />
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
          <Route path="/Enrollment">
            <Enrollments />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>  
        </UserProvider>
      </div>
    </Router>
  );
}

export default App;
