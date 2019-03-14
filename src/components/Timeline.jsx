import React, { Component } from 'react';
import '../css/Timeline.css';
import MemoryCard from './MemoryCard';

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
    return this.props.memories.map(mem => {
      return <MemoryCard />;
    });
  };

  render() {
    return (
      <section className='cd-timeline js-cd-timeline'>
        <div className='cd-timeline__container'>{this.renderMemoryCards()}</div>
      </section>

      // <section className='timeline'>
      //   <ul>
      //     <li>
      //       <div>
      //         <time>1934</time> At vero eos et accusamus et iusto odio
      //         dignissimos ducimus qui blanditiis praesentium At vero eos et
      //         accusamus et iusto odio dignissimos ducimus qui blanditiis
      //         praesentium
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1937</time> Proin quam velit, efficitur vel neque vitae,
      //         rhoncus commodo mi. Suspendisse finibus mauris et bibendum
      //         molestie. Aenean ex augue, varius et pulvinar in, pretium non
      //         nisi.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1940</time> Proin iaculis, nibh eget efficitur varius,
      //         libero tellus porta dolor, at pulvinar tortor ex eget ligula.
      //         Integer eu dapibus arcu, sit amet sollicitudin eros.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1943</time> In mattis elit vitae odio posuere, nec maximus
      //         massa varius. Suspendisse varius volutpat mattis. Vestibulum id
      //         magna est.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1946</time> In mattis elit vitae odio posuere, nec maximus
      //         massa varius. Suspendisse varius volutpat mattis. Vestibulum id
      //         magna est.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1956</time> In mattis elit vitae odio posuere, nec maximus
      //         massa varius. Suspendisse varius volutpat mattis. Vestibulum id
      //         magna est.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1957</time> In mattis elit vitae odio posuere, nec maximus
      //         massa varius. Suspendisse varius volutpat mattis. Vestibulum id
      //         magna est.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1967</time> Aenean condimentum odio a bibendum rhoncus. Ut
      //         mauris felis, volutpat eget porta faucibus, euismod quis ante.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1977</time> Vestibulum porttitor lorem sed pharetra
      //         dignissim. Nulla maximus, dui a tristique iaculis, quam dolor
      //         convallis enim, non dignissim ligula ipsum a turpis.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>1985</time> In mattis elit vitae odio posuere, nec maximus
      //         massa varius. Suspendisse varius volutpat mattis. Vestibulum id
      //         magna est.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>2000</time> In mattis elit vitae odio posuere, nec maximus
      //         massa varius. Suspendisse varius volutpat mattis. Vestibulum id
      //         magna est.
      //       </div>
      //     </li>
      //     <li>
      //       <div>
      //         <time>2005</time> In mattis elit vitae odio posuere, nec maximus
      //         massa varius. Suspendisse varius volutpat mattis. Vestibulum id
      //         magna est.
      //       </div>
      //     </li>
      //   </ul>
      // </section>
    );
  }
}

export default Timeline;
