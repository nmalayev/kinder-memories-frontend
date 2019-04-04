import React, { Component, Fragment } from 'react';
import '../css/Timeline.css';
import TimelineCard from './TimelineCard';
import { Button } from 'semantic-ui-react';

export class Timeline extends Component {
  timelineFunctionality = () => {
    // Vertical Timeline - by CodyHouse.co
    function VerticalTimeline(element) {
      this.element = element;
      this.blocks = this.element.getElementsByClassName('js-cd-block');
      this.images = this.element.getElementsByClassName('js-cd-img');
      this.contents = this.element.getElementsByClassName('js-cd-content');
      this.offset = 0.8;
      this.hideBlocks();
    }

    VerticalTimeline.prototype.hideBlocks = function() {
      //hide timeline blocks which are outside the viewport
      if (!'classList' in document.documentElement) {
        return;
      }
      var self = this;
      for (var i = 0; i < this.blocks.length; i++) {
        (function(i) {
          if (
            self.blocks[i].getBoundingClientRect().top >
            window.innerHeight * self.offset
          ) {
            self.images[i].classList.add('cd-is-hidden');
            self.contents[i].classList.add('cd-is-hidden');
          }
        })(i);
      }
    };

    VerticalTimeline.prototype.showBlocks = function() {
      if (!'classList' in document.documentElement) {
        return;
      }
      var self = this;
      for (var i = 0; i < this.blocks.length; i++) {
        (function(i) {
          if (
            self.contents[i].classList.contains('cd-is-hidden') &&
            self.blocks[i].getBoundingClientRect().top <=
              window.innerHeight * self.offset
          ) {
            // add bounce-in animation
            self.images[i].classList.add('cd-timeline__img--bounce-in');
            self.contents[i].classList.add('cd-timeline__content--bounce-in');
            self.images[i].classList.remove('cd-is-hidden');
            self.contents[i].classList.remove('cd-is-hidden');
          }
        })(i);
      }
    };

    var verticalTimelines = document.getElementsByClassName('js-cd-timeline'),
      verticalTimelinesArray = [],
      scrolling = false;
    if (verticalTimelines.length > 0) {
      for (var i = 0; i < verticalTimelines.length; i++) {
        (function(i) {
          verticalTimelinesArray.push(
            new VerticalTimeline(verticalTimelines[i])
          );
        })(i);
      }

      //show timeline blocks on scrolling
      window.addEventListener('scroll', function(event) {
        if (!scrolling) {
          scrolling = true;
          !window.requestAnimationFrame
            ? setTimeout(checkTimelineScroll, 250)
            : window.requestAnimationFrame(checkTimelineScroll);
        }
      });
    }

    function checkTimelineScroll() {
      verticalTimelinesArray.forEach(function(timeline) {
        timeline.showBlocks();
      });
      scrolling = false;
    }
  };

  componentDidMount() {
    this.timelineFunctionality();
  }

  renderMemoryCards = () => {
    const { memories } = this.props;
    return memories.map(mem => {
      return <TimelineCard key={mem.id} memory={mem} />;
    });
  };

  render() {
    console.log('timeline', this.props.memories);
    return (
      <Fragment>
        <h1 id='timeline-name'>{this.props.childName + "'s Timeline"}</h1>
        {this.props.memories.length > 0 ? null : (
          <h1 id='no-search-match'>No matches, please try again...</h1>
        )}
        <section className='cd-timeline js-cd-timeline'>
          <div className='cd-timeline__container'>
            {this.renderMemoryCards()}
          </div>
        </section>
        <Button
          id='scroll-to-top-btn'
          color='teal'
          onClick={() => window.scrollTo(0, 0)}
        >
          Back to Top
        </Button>
      </Fragment>
    );
  }
}

export default Timeline;
