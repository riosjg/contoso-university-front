import React from 'react';
import './App.css';
import Department from './views/Departments'
import Instructor from './views/Instructors'
import Student from './views/Students'
import Course from './views/Courses'

function App() {
  return (
    <div className="App">
      <Department />
      <Instructor />
      <Student />
      <Course />
    </div>
  );
}

export default App;
