import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import MemoryForm from './components/MemoryForm';
import MemoryViewPage from './components/MemoryViewPage';
import SideBar from './components/SideBar';

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
    newMemLetter: '',
    memPoster: '',
    timeSort: '',
    memType: ''
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

  reverseTimeSortMemories = memories => {
    return memories.sort((memA, memB) => {
      if (memA.memory_date > memB.memory_date) {
        return -1;
      }
      if (memA.memory_date < memB.memory_date) {
        return 1;
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
    // this.setState({ searchQuery: value });
    let sortedMemories = this.state.originalMemories.filter(mem =>
      mem.description.toLowerCase().includes(value)
    );
    this.setState({
      memories: sortedMemories
    });
  };

  handleAddFormChange = (e, { value }) => {
    this.setState({ [e.target.name]: value });
  };

  handleAddFormSelectChange = (e, { value }) => {
    this.setState({ newMemType: value });
  };

  handleSidebarSortMemPoster = (e, { value }) => {
    this.setState({ memPoster: value });

    if (value === 'everyone') {
      this.setState({ memories: this.state.originalMemories });
    } else {
      const filteredMemories = this.state.originalMemories.filter(
        mem => mem.user.relation === value
      );
      this.setState({ memories: filteredMemories });
    }
  };

  handleSidebarSortTimeSort = (e, { value }) => {
    this.setState({ timeSort: value });

    if (value === 'reverseChrono') {
      this.setState({
        memories: this.reverseTimeSortMemories(this.state.memories)
      });
    }
    if (value === 'chrono') {
      this.setState({ memories: this.sortMemories(this.state.memories) });
    }
  };

  handleSidebarSortTypeSort = (e, { value }) => {
    this.setState({ memType: value });

    if (value === 'all') {
      this.setState({ memories: this.state.originalMemories });
    } else {
      const filteredMemories = this.state.originalMemories.filter(
        mem => mem.post_type === value
      );
      this.setState({ memories: this.sortMemories(filteredMemories) });
    }
  };
  // handleSidebarSortTypeSort = (e, { value }) => {
  //   this.setState({ memType: value });

  //   if (value === 'all') {
  //     this.setState({ memories: this.state.originalMemories });
  //   } else {
  //     const filteredMemories = this.state.originalMemories.filter(
  //       mem => mem.post_type === value
  //     );
  //     this.setState({ memories: this.sortMemories(filteredMemories) });
  //   }
  // };

  handleNewMemorySubmit = e => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('post_type', this.state.newMemType);
    formData.append('title', this.state.newMemTitle);
    formData.append('description', this.state.newMemDescription);
    formData.append('memory_date', this.state.newMemDate);
    formData.append('letter', this.state.newMemLetter);

    if (e.target.file) {
      formData.append('file', e.target.file.files[0]);
    }

    fetch('http://localhost:3001/api/v1/posts', {
      method: 'POST',
      body: formData
    }) // end of fetch
      .then(r => r.json())
      .then(mem => {
        console.log(mem);
        this.setState({
          originalMemories: this.sortMemories([...this.state.memories, mem]),
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
        <SideBar
          memPoster={this.state.memPoster}
          timeSort={this.state.timeSort}
          memType={this.state.memType}
          handleSidebarSortMemPoster={this.handleSidebarSortMemPoster}
          handleSidebarSortTimeSort={this.handleSidebarSortTimeSort}
          handleSidebarSortTypeSort={this.handleSidebarSortTypeSort}
        />
        {/* <Redirect from='/' to='/timeline' /> */}
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
