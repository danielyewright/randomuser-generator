import React from 'react';
import * as jsonexport from 'jsonexport/dist';
import * as download from 'downloadjs';
import axios from 'axios';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      numResults: '',
      dataResults: '',
      users: null,
      value: '',
      showButtons: false,
      showAlert: false,
      isLoading: false,
      success: false,
      error: false,
      message: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleGenerate = this.handleGenerate.bind(this);
    this.downloadCSV = this.downloadCSV.bind(this);
    this.downloadJSON = this.downloadJSON.bind(this);
    this.focus = this.focus.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  focus() {
    this.textInput.focus();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleClear(e) {
    this.setState({
      users: [],
      dataResults: '',
      showButtons: false
    });
  }

  handleGenerate(e) {
    e.preventDefault();

    this.setState({
      isLoading: true
    });

    try {
      if (this.state.numResults !== '') {
        if (this.state.numResults > 5000) {
          this.setState({
            error: true,
            message: 'You cannot generate more than 5,000 results. Please enter a smaller value.',
            isLoading: false,
            showAlert: true
          }, () => {
            window.setTimeout(() => {
              this.setState({showAlert: false});
            }, 3000)
          });
          this.focus();
          return false;
        }
        else if (this.state.numResults < 0) {
          this.setState({
            error: true,
            message: 'You cannot generate a negative amount. Please enter a positive value.',
            isLoading: false,
            showAlert: true
          }, () => {
            window.setTimeout(() => {
              this.setState({showAlert: false});
            }, 3000)
          });
          this.focus();
          return false;
        }
        else {
          axios.get(`https://randomuser.me/api?results=${this.state.numResults}`)
            .then(response => {
              this.setState({
                users: response.data.results,
                dataResults: JSON.stringify(response.data.results),
                showButtons: true,
                isLoading: false
              });
            })
        }
      }
      else {
        this.setState({
          error: true,
          message: 'You must specify a valid number to generate',
          isLoading: false,
          showAlert: true
        }, () => {
          window.setTimeout(() => {
            this.setState({showAlert: false});
          }, 3000)
        });
        this.focus();
        return false;
      }
      this.setState({
        numResults: '',
        dataResults: JSON.stringify(this.state.users),
      });
    }
    catch(err) {
      alert(err);
    }
  }

  downloadCSV() {
    let options = {
      textDelimiter: '"'
    }

    try {
      if (this.state.users !== '') {
        jsonexport(this.state.users, options, function(err, csv) {
          if (err) {
            console.log(err);
          }
          download(csv, 'UserData-' + Date.now() + '.csv', 'text/csv;charset=utf-8');
        });
      }
      else {
        this.setState({
          error: true,
          message: 'You must generate user data first.',
          isLoading: false,
          showAlert: true
        }, () => {
          window.setTimeout(() => {
            this.setState({showAlert: false});
          }, 3000)
        });
        this.focus();
        return false;
      }
    }
    catch(err) {
      alert(err);
    }
  }

  downloadJSON() {
    try {
      if (this.state.users !== '') {
        download(this.state.dataResults, 'UserData-' + Date.now() + '.json', 'text/json;charset=utf-8');
      }
      else {
        this.setState({
          error: true,
          message: 'You must generate user data first.',
          isLoading: false,
          showAlert: true
        }, () => {
          window.setTimeout(() => {
            this.setState({showAlert: false});
          }, 3000)
        });
        this.focus();
        return false;
      }
    }
    catch(err) {
      alert(err);
    }
  }

  renderIsLoading() {
    if (this.state.isLoading) {
      return (
        <p className="loader">Generating...</p>
      );
    } else {
      if (this.state.showButtons) {
        return (
          <React.Fragment>
            <div className="form-inline justify-content-center my-5">
              <button type="button" className="btn btn-primary" onClick={this.downloadJSON}>Download JSON</button>
              <button type="button" className="btn btn-primary" onClick={this.downloadCSV}>Download CSV</button>
            </div>
          </React.Fragment>
        );
      } else {
        return null;
      }
    }
  }

  renderAlerts() {
    if (this.state.showAlert) {
      if (this.state.success) {
        return (
          <div className="alert alert-success" role="alert">
            {this.state.message}
          </div>
        );
      } else if (this.state.error) {
        return (
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        );
      } else {
        return null;
      }
    } else {
      return false;
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderAlerts()}
        <div className="form-group form-inline">
          <label htmlFor="numResults">Data size</label>
          <input type="number" className="form-control" name="numResults" value={this.state.numResults} disabled={this.state.dataResults} min="1" max="5000" ref={(input) => { this.textInput = input; }} onChange={this.handleChange} pattern="[0-9]" inputMode="numeric" />
          <button type="button" className="btn btn-primary" onClick={this.handleGenerate} disabled={this.state.dataResults}>Generate</button>
          <button type="button" className="btn btn-secondary" onClick={this.handleClear} disabled={!this.state.dataResults}>Clear/Reload</button>
        </div>
        {this.renderIsLoading()}
      </React.Fragment>
    );
  }
}

export default Main;
