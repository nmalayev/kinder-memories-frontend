import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import MemoryForm from './components/MemoryForm';
import MemoryViewPage from './components/MemoryViewPage';

import { Route } from 'react-router-dom';

import './css/App.css';

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

    return (
      <div className='App'>
        <Navbar />
        <Route
          path='/timeline'
          render={props => (
            <Timeline {...props} memories={this.state.memories} />
          )}
        />
        <Route path='/new-memory' render={props => <MemoryForm {...props} />} />
        <Route
          path='/memories'
          render={props => (
            <MemoryViewPage {...props} memories={this.state.memories} />
          )}
        />
      </div>
    );
  }
}

export default App;
