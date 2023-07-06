import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ContributionGraph from './components/contribut/ContributionGraph';
import "./App.css";

function App() {

  return (
    <div className='box'>
      <h1>Contribution Graph</h1>
       <ContributionGraph /> 
    </div>
  );
}

export default App;
