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
    newMemDate: '',
    searchQuery: ''
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

  handleSearch = (e, { value }) => {
    this.setState({ searchQuery: value });
  };

  handleAddFormChange = (e, { value }) => {
    this.setState({ [e.target.name]: value });
  };

  handleAddFormSelectChange = (e, { value }) => {
    this.setState({ newMemType: value });
  };

  handleNewMemorySubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('post_type', this.state.newMemType);
    formData.append('title', this.state.newMemTitle);
    formData.append('description', this.state.newMemDescription);
    formData.append('memory_date', this.state.newMemDate);
    formData.append('file', e.target.file.files[0]);

    fetch('http://localhost:3001/api/v1/posts', {
      method: 'POST',
      body: formData
    }) // end of fetch
      .then(r => r.json())
      .then(mem => {
        console.log(mem);
        this.setState({
          memories: this.sortMemories([...this.state.memories, mem]),
          showAddModal: !this.state.showAddModal,
          newMemType: ''
        });
      });

    this.props.history.push('/timeline');
  };

  render() {
    return (
      <div className='App'>
        <Navbar
          handleSearch={this.handleSearch}
          searchQuery={this.state.searchQuery}
        />
        <Redirect from='/' to='/timeline' />
        <Route
          path='/timeline'
          render={props => (
            <Timeline
              {...props}
              memories={this.state.memories}
              searchQuery={this.state.searchQuery}
            />
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
            <MemoryViewPage
              {...props}
              searchQuery={this.state.searchQuery}
              memories={this.state.memories}
            />
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
