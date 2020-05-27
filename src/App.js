import React from 'react';
import './App.css';
import Test from './views/Test'
import Department from './views/Departments'
import Instructor from './views/Instructors'
import Student from './views/Students'

function App() {
  return (
    <div className="App">
      {/* <Test /> */}
      <Department />
      <Instructor />
      <Student />
    </div>
  );
}

export default App;
