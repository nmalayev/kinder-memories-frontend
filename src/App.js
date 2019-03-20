import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import MemoryForm from './components/MemoryForm';
import MemoryViewPage from './components/MemoryViewPage';
import SortAndFilter from './components/SortAndFilter';

import { Route, Redirect, withRouter } from 'react-router-dom';

import './css/App.css';
import Login from './components/Login';

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
    memPoster: 'everyone',
    timeSort: '',
    memType: 'all'
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

  // FIX: fix handleSidebarSortMemPoster, handleSidebarSortTimeSort, handleSidebarSortTypeSort
  // to only update state, and then create a new function that takes those three state values and
  // chains filter, filter, and sort to create required memory array. That then gets invoked when
  // passed down to as prop memories.

  handleSidebarSortMemPoster = (e, { value }) => {
    this.setState({
      memPoster: value
    });

    // If filtered by memory type (this.state.memType), filter the
    // memories by type and by those belonging to the memory poster
    if (value === 'everyone') {
      this.setState({
        memories: this.state.originalMemories
      });
    } else if (this.state.memType !== 'all') {
      const filteredMemories = this.state.originalMemories.filter(
        mem =>
          mem.user.relation === value && mem.post_type === this.state.memType
      );
      this.setState({
        memories: filteredMemories
      });
    } else if (this.state.memType === 'all') {
      const filteredMemories = this.state.originalMemories.filter(
        mem => mem.user.relation === value
      );
      this.setState({
        memories: filteredMemories
      });
    } else {
      const filteredMemories = this.state.originalMemories.filter(
        mem => mem.user.relation === value
      );
      this.setState({
        memories: filteredMemories
      });
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

    // If filtered by memory poster (this.state.memPoster), filter the
    // memories by type and by those belonging to the memory poster
    if (value === 'all' && this.state.memPoster !== 'everyone') {
      const filteredMemories = this.state.originalMemories.filter(
        mem => mem.user.relation === this.state.memPoster
      );
      this.setState({ memories: filteredMemories });
    } else if (value !== 'all' && this.state.memPoster === 'everyone') {
      const filteredMemories = this.state.originalMemories.filter(
        mem => mem.post_type === value
      );
      this.setState({ memories: filteredMemories });
    } else if (value === 'all' && this.state.memPoster === 'everyone') {
      this.setState({ memories: this.state.originalMemories });
    } else {
      const filteredMemories = this.state.originalMemories.filter(
        mem =>
          mem.post_type === value && mem.user.relation === this.state.memPoster
      );
      this.setState({
        memories: this.sortMemories(filteredMemories)
      });
    }
  };

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
    console.log('this.props', this.props);
    return (
      <div className='App'>
        <Navbar handleSearch={this.handleSearch} />
        {/* Only render the  */}
        {this.props.location.pathname === '/timeline' ||
        this.props.location.pathname === '/memories' ? (
          <SortAndFilter
            memPoster={this.state.memPoster}
            timeSort={this.state.timeSort}
            memType={this.state.memType}
            handleSidebarSortMemPoster={this.handleSidebarSortMemPoster}
            handleSidebarSortTimeSort={this.handleSidebarSortTimeSort}
            handleSidebarSortTypeSort={this.handleSidebarSortTypeSort}
          />
        ) : null}
        {/* <Redirect from='/' to='/timeline' /> */}
        <Route
          path='/timeline'
          render={props => (
            // make memories = to some function that takes all three sort/filter states as args and
            // runs through chained filter, filter, sort.
            <Timeline {...props} memories={this.state.memories} />
          )}
        />
        <Route path='/login' render={props => <Login {...props} />} />
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
