import React, { Component } from 'react';
import { Dropdown, Select, Form } from 'semantic-ui-react';
import '../css/SortAndFilter.css';

const memoryPosterOptions = [
  {
    key: 'everyone',
    text: 'Everyone',
    value: 'everyone'
  },
  {
    key: 'parent',
    text: 'Parents',
    value: 'parent'
  },
  {
    key: 'grandparent',
    text: 'Grandparents',
    value: 'grandparent'
  },
  {
    key: 'sibling',
    text: 'Siblings',
    value: 'sibling'
  },
  {
    key: 'friend',
    text: 'Friends',
    value: 'friend'
  }
];

const timeSortOptions = [
  {
    key: 'chrono',
    text: 'Earliest',
    value: 'chrono'
  },
  {
    key: 'reverseChrono',
    text: 'Most Recent',
    value: 'reverseChrono'
  }
];

const typeSortOptions = [
  {
    key: 'all',
    text: 'All',
    value: 'all'
  },
  {
    key: 'photo',
    text: 'Photo',
    value: 'photo'
  },
  {
    key: 'video',
    text: 'Video',
    value: 'video'
  },
  {
    key: 'letter',
    text: 'Letter',
    value: 'letter'
  }
];

export default class SortAndFilter extends Component {
  render() {
    const {
      memPoster,
      timeSort,
      memType,
      handleSidebarSortMemPoster,
      handleSidebarSortTimeSort,
      handleSidebarSortTypeSort
    } = this.props;

    return (
      <div className='main-body'>
        {/* <span> */}
        Show me memories by{' '}
        <Dropdown
          inline
          options={memoryPosterOptions}
          defaultValue={memoryPosterOptions[0].value}
          onChange={handleSidebarSortMemPoster}
          // value={memPoster}
          // placeholder='Choose relation'
        />
        <br />
        {/* </span> */}
        {/* <span> */}
        Sort by{' '}
        <Dropdown
          inline
          options={timeSortOptions}
          defaultValue={timeSortOptions[0].value}
          onChange={handleSidebarSortTimeSort}
          // value={timeSort}
          // placeholder='Select time order'
        />
        <br />
        Show{' '}
        <Dropdown
          inline
          options={typeSortOptions}
          defaultValue={typeSortOptions[0].value}
          onChange={handleSidebarSortTypeSort}
          // placeholder='Select memory type'
          // value={memType}
        />
        memories
        {/* </span> */}
      </div>
    );
  }
}
