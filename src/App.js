import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class App extends Component {
  render() {
    // Function is run by GoogleLogin component below on success or failure
    const responseGoogle = response => {
      console.log(response);
    };

    return (
      <div className='App'>
        <GoogleLogin
          clientId='797274764544-8k4ne4k38ulf5elhdbg19ojti4ee1vra.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />

        <GoogleLogout buttonText='Logout' onLogoutSuccess={responseGoogle} />
        <Navbar />
      </div>
    );
  }
}

export default App;
