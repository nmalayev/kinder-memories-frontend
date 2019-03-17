import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import MemoryForm from './components/MemoryForm';
import MemoryViewPage from './components/MemoryViewPage';

import { Route, Redirect, withRouter } from 'react-router-dom';

import './css/App.css';

class App extends Component {
  state = {
    originalMemories: [],
    memories: [],
    showAddModal: true,
    childName: ''
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
          memories: timeSorted,
          childName: posts[0].timeline.name
        });
      });
  }

  handleNewMemorySubmit = e => {
    e.preventDefault();
    this.setState({
      showAddModal: !this.state.showAddModal
    });
    this.props.history.push('/timeline');
  };

  render() {
    console.log(this.state);
    return (
      <div className='App'>
        <Navbar />
        <Redirect from='/' to='/timeline' />
        <Route
          path='/timeline'
          render={props => (
            <Timeline {...props} memories={this.state.memories} />
          )}
        />
        <Route
          path='/new-memory'
          render={props => (
            <MemoryForm
              {...props}
              showAddModal={this.state.showAddModal ? true : true} // Hacky way to always pass true, but flip false upon form submit
              handleSubmit={this.handleNewMemorySubmit}
              childName={this.state.childName}
            />
          )}
        />
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

export default withRouter(App);
