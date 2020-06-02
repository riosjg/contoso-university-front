import React from 'react';
import './App.css';
import { UserProvider } from './context/userContext'
import Department from './views/Departments'
import Instructor from './views/Instructors'
import Student from './views/Students'
import Course from './views/Courses'
import Enrollments from './views/Enrollments'

function App() {
  return (
    <div className="App">
      <UserProvider  id={3}>
        <Department />
        <Instructor />
        <Student />
        <Course />
        <Enrollments />
      </UserProvider>
    </div>
  );
}

export default App;
