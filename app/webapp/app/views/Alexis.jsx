import React, { Component } from 'react';
import { connect } from 'react-redux'

import { AlexisImages, AlexisLinks } from './../assets/img/alexis/index';

class Alexis extends Component {
  constructor (props) {
    super(props);
  }

  navigateToUrl (index) {
    ga('send', 'event', 'ALEXIS_IMAGE', AlexisLinks[index])
    window.open("https://www.instagram.com/p/" + AlexisLinks[index], "_blank")
  }

  shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }


  render() {
    return (
      <div id="alexis">
        { 
          this.shuffle(AlexisImages).map((image, index) => (
            <img key={index} src={ image } onClick={() => this.navigateToUrl(index)} />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { }
};

export default connect(mapStateToProps)(Alexis);
