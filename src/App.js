import React from 'react';
import './App.css';
import Main from './Main';

function App() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <h1 className="mb-5 mt-3">Random User Generator</h1>
          <p>This tool gets random user data from the <a href="https://randomuser.me" target="_blank" rel="noopener noreferrer">randomuser.me</a> API, which can then be downloaded as a CSV or JSON file.</p>
          <p>Once data is generated, you must click <b>Clear</b> or refresh the page to re-generate data.</p>
          <br />
          <Main />
        </div>
      </div>
    </div>
  );
}

export default App;
