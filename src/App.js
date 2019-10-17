import React from 'react';
import './App.css';
import Main from './Main';

function App() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <h1 className="mb-5 mt-3">Random User Data Generator</h1>
          <p>This tool generates random user data from <a href="https://randomuser.me">randomuser.me</a> that can be downloaded as a CSV or JSON file.</p>
          <p>Once data is generated, you must click <b>Clear</b> or refresh the page to re-generate data.</p>
          <br />
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
