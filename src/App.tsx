import * as React from 'react';
import './App.css';

import { Form1, Form1Data } from  './components/form1';
import { Form2, Form2Data } from  './components/form2';

const logo = require('./logo.svg');

function handleSubmit( d: Form1Data | Form2Data ) {
  alert(JSON.stringify(d, null, '  '));
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Form1 onSubmit={handleSubmit} />
        <Form2 onSubmit={handleSubmit} />
      </div>
    );
  }
}

export default App;
