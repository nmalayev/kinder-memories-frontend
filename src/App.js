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
      .then(posts => {
        // Sorting the API data chronologically by memory date to place on timeline
        let timeSorted = posts.sort((memA, memB) => {
          if (memA.memory_date > memB.memory_date) {
            return 1;
          }
          if (memA.memory_date < memB.memory_date) {
            return -1;
          }
          return 0;
        });

        this.setState({
          originalMemories: timeSorted,
          memories: timeSorted
        });
      });
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
