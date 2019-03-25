import React, { Component } from 'react';
import { Dropdown, Select, Form } from 'semantic-ui-react';
import '../css/SortAndFilter.css';

const memoryPosterOptions = [
  {
    key: 'everyone',
    text: 'Everyone',
    value: 'everyone'
  },
  { key: 'parent', text: 'Parents', value: 'parent' },
  { key: 'grandparent', text: 'Grandparents', value: 'grandparent' },
  { key: 'sibling', text: 'Grandparents', value: 'sibling' },
  { key: 'friend', text: 'Friends', value: 'friend' },
  { key: 'cousin', text: 'Cousins', value: 'cousin' },
  { key: 'uncle', text: 'Uncles', value: 'uncle' },
  { key: 'aunt', text: 'Aunts', value: 'aunt' }
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
      <div id='sort-and-filter'>
        <div className='dropdown-filter'>
          {/* Show me memories by{' '} */}
          <Dropdown
            inline
            options={memoryPosterOptions}
            defaultValue={memoryPosterOptions[0].value}
            onChange={handleSidebarSortMemPoster}
            // value={memPoster}
            // placeholder='Choose relation'
          />
        </div>
        <div className='dropdown-filter'>
          {/* Sort by{' '} */}
          <Dropdown
            inline
            options={timeSortOptions}
            defaultValue={timeSortOptions[0].value}
            onChange={handleSidebarSortTimeSort}
            // value={timeSort}
            // placeholder='Select time order'
          />
        </div>
        <div className='dropdown-filter'>
          {/* Show{' '} */}
          <Dropdown
            inline
            options={typeSortOptions}
            defaultValue={typeSortOptions[0].value}
            onChange={handleSidebarSortTypeSort}
            // placeholder='Select memory type'
            // value={memType}
          />
          {/* memories */}
        </div>
      </div>
    );
  }
}
