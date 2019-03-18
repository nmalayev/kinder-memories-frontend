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
    childName: '',
    newMemTitle: '',
    newMemDescription: '',
    newMemType: '',
    newMemDate: ''
  };

  sortMemories = memories => {
    return memories.sort((memA, memB) => {
      if (memA.memory_date > memB.memory_date) {
        return 1;
      }
      if (memA.memory_date < memB.memory_date) {
        return -1;
      }
      return 0;
    });
  };

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/posts')
      .then(r => r.json())
      .then(posts => {
        // Sorting the API data chronologically by memory date to place on timeline
        let timeSorted = this.sortMemories(posts);

        this.setState({
          originalMemories: timeSorted,
          memories: timeSorted,
          childName: posts[0].timeline.name
        });
      });
  }

  handleAddFormChange = (e, { value }) => {
    this.setState({ [e.target.name]: value }, () => console.log(this.state));
  };

  handleAddFormSelectChange = (e, { value }) => {
    this.setState({ newMemType: value }, () => console.log(this.state));
  };

  handleNewMemorySubmit = e => {
    e.preventDefault();
    fetch('http://localhost:3001/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        post_type: this.state.newMemType,
        title: this.state.newMemTitle,
        description: this.state.newMemDescription,
        memory_date: this.state.newMemDate
      })
    }) // end of fetch
      .then(r => r.json())
      .then(mem => {
        // let newMemories = [...this.state.memories, mem];
        // let newSortedMemories = this.sortMemories(newMemories);
        // console.log('newMemories', newMemories);
        // console.log('newSortedMemories', newSortedMemories);

        this.setState(
          {
            memories: this.sortMemories([...this.state.memories, mem]),
            showAddModal: !this.state.showAddModal,
            newMemType: ''
          },
          () => console.log('app', this.state)
        );
      });

    // Hide new memory modal upon submission and clear newMemType
    // this.setState({
    //   showAddModal: !this.state.showAddModal,
    //   newMemType: ''
    // });
    this.props.history.push('/timeline');
  };

  render() {
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
              handleChange={this.handleAddFormChange}
              handleSelectChange={this.handleAddFormSelectChange}
              handleSubmit={this.handleNewMemorySubmit}
              childName={this.state.childName}
              newMemTitle={this.state.newMemTitle}
              newMemDescription={this.state.newMemDescription}
              newMemType={this.state.newMemType}
              newMemDate={this.state.newMemDat}
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
