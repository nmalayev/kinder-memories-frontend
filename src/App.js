import React, { Component } from 'react';
import './css/App.css';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class App extends Component {
  state = {
    originalMemories: [],
    memories: []
  };

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/posts')
      .then(r => r.json())
      .then(posts =>
        this.setState({
          originalMemories: posts,
          memories: posts
        })
      );
  }

  render() {
    console.log(this.state);
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
        <Timeline memories={this.state.memories} />
      </div>
    );
  }
}

export default App;
