import React from 'react';
import './App.css';
import Test from './views/Test'
import Department from './views/Departments'
import Instructor from './views/Instructors'

function App() {
  return (
    <div className="App">
      {/* <Test /> */}
      <Department />
      <Instructor />
    </div>
  );
}

export default App;
