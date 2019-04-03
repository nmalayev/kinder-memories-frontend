import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Timeline from './components/Timeline';
import MemoryForm from './components/MemoryForm';
import MemoryViewPage from './components/MemoryViewPage';
import SortAndFilter from './components/SortAndFilter';

import { Route, Redirect, withRouter } from 'react-router-dom';

import './css/App.css';

import HomePage from './components/HomePage';
import AccessDenied from './components/AccessDenied';

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
    newMemFile: '',
    memPoster: 'everyone',
    timeSort: 'chrono',
    memType: 'all',
    currentUser: null
  };

  setCurrentUser = response => {
    localStorage.setItem('token', response.jwt);
    this.setState({ currentUser: response.user });
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState(
      { currentUser: null },
      () => this.props.history.push('/')
      // TODO: add callback function here to push to homepage/login screen after logout
    );
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
        let chronoSorted = this.sortMemories(posts);

        this.setState({
          originalMemories: chronoSorted,
          memories: chronoSorted,
          childName: posts[0].timeline.name
        });
      });

    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:3001/api/v1/auto_login', {
        method: 'GET',
        headers: {
          Authorization: token
        }
      })
        .then(r => r.json())
        .then(response => {
          this.setState({ currentUser: response });
        });
    }
  }

  handleSearch = (e, { value }) => {
    // this.setState({ searchQuery: value });
    let sortedMemoriesByDescription = this.state.originalMemories.filter(mem =>
      mem.description.toLowerCase().includes(value.toLowerCase())
    );

    let sortedMemoriesByTitle = this.state.originalMemories.filter(mem =>
      mem.title.toLowerCase().includes(value.toLowerCase())
    );

    let sortedMemoriesByLetter = this.state.originalMemories.filter(mem =>
      mem.letter.toLowerCase().includes(value.toLowerCase())
    );

    const searchResults = sortedMemoriesByDescription.concat(
      sortedMemoriesByTitle,
      sortedMemoriesByLetter
    );

    // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    const uniqueSearchResults = [...new Set(searchResults)];

    this.setState({
      memories: uniqueSearchResults
    });
  };

  handleAddFormChange = (e, { value }) => {
    this.setState({ [e.target.name]: value });
  };

  handleAddFormFileUpload = (e, { value }) => {
    this.setState(
      {
        newMemFile: e.target.files[0]
      },
      () => console.log('file upload', this.state.newMemFile)
    );
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
      headers: {
        Authorization: localStorage.getItem('token'),
        Accept: 'application/json'
      },
      body: formData
    }) // end of fetch
      .then(r => r.json())
      .then(mem => {
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
        {this.props.location.pathname === '/' ? null : (
          <Navbar
            handleSearch={this.handleSearch}
            currentUser={this.state.currentUser}
            logout={this.logout}
          />
        )}
        {/* Only render the SortAndFilter component if the current path is
        /timeline or /memories. */}
        {(this.props.location.pathname === '/timeline' &&
          this.state.currentUser) ||
        (this.props.location.pathname === '/memories' &&
          this.state.currentUser) ? (
          <SortAndFilter
            memPoster={this.state.memPoster}
            timeSort={this.state.timeSort}
            memType={this.state.memType}
            handleSidebarSortMemPoster={this.handleSidebarSortMemPoster}
            handleSidebarSortTimeSort={this.handleSidebarSortTimeSort}
            handleSidebarSortTypeSort={this.handleSidebarSortTypeSort}
          />
        ) : null}
        <Route
          path='/timeline'
          render={props =>
            // make memories = to some function that takes all three sort/filter states as args and
            // runs through chained filter, filter, sort.
            this.state.currentUser ? (
              <Timeline
                {...props}
                currentUser={this.state.currentUser}
                memories={this.state.memories}
                childName={this.state.childName}
              />
            ) : (
              <AccessDenied {...props} />
            )
          }
        />
        <Route
          path='/new-memory'
          exact
          render={props =>
            this.state.currentUser ? (
              <MemoryForm
                {...props}
                showAddModal={this.state.showAddModal ? true : true} // Hacky way to always pass true, but flip false upon form submit
                handleChange={this.handleAddFormChange}
                handleSelectChange={this.handleAddFormSelectChange}
                handleFileUpload={this.handleAddFormFileUpload}
                handleSubmit={this.handleNewMemorySubmit}
                childName={this.state.childName}
                newMemTitle={this.state.newMemTitle}
                newMemDescription={this.state.newMemDescription}
                newMemType={this.state.newMemType}
                newMemDate={this.state.newMemDate}
                newMemLetter={this.state.newMemLetter}
              />
            ) : (
              <AccessDenied {...props} />
            )
          }
        />
        <Route
          path='/memories'
          exact
          render={props =>
            this.state.currentUser ? (
              <MemoryViewPage {...props} memories={this.state.memories} />
            ) : (
              <AccessDenied {...props} />
            )
          }
        />
        <Route
          path='/'
          exact
          render={props =>
            !this.state.currentUser ? (
              <HomePage {...props} setCurrentUser={this.setCurrentUser} />
            ) : (
              <Redirect to='/timeline' />
            )
          }
        />
      </div>
    );
  }
}

export default withRouter(App);
