import React, { Component } from'react';
import './Box.css';

class Box extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      left: '0px',
      top: '0px'
    })
    this.dragElementRef = React.createRef();
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  handleDragStart(e) {  
    console.log('====================================');
    console.log('drag started');
    console.log('====================================');
  }

  handleTouchMove(e) {
    console.log('touch started');
    // grab the loaction of the touch
    var touchLocation = e.targetTouches[0];

    this.setState({
      left: touchLocation.pageX + 'px',
      top: touchLocation.pageY + 'px'
    })
  }

  handleTouchEnd(e) {
    var dragElement = this.dragElementRef.current;
    var x = parseInt(dragElement.style.left, 10);
    var y = parseInt(dragElement.style.top, 10);

    console.log('Drop position x, y: ', x, y)
  }

  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Code to make a text element drag and droppable on both desktop and mobile browsers.
        </p>
        <div id="columns">
          <div
            style={{ top: this.state.top, left: this.state.left }}
            className="column"
            ref={this.dragElementRef}
            draggable
            onDragStart={() => this.handleDragStart()}
            onTouchMove={(e) => this.handleTouchMove(e)}
            onTouchEnd={(e) => this.handleTouchEnd(e)}
          >
            <header>Drag Me</header>
          </div>
        </div>
      </div>
    );
  }
}

export default Box;

