import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
// import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { HashRouter as Router } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Annotations from './components/layouts/Annotations';

// https://medium.com/@colesayershapiro/using-three-js-in-react-6cb71e87bdf4
class App extends Component {
  state = {isMounted: true};

  render() {
    const {isMounted = true} = this.state;

    return (
      <div id="app-container">
      <Router>
          <div className={`header`}>
            <h1>REACT &amp; 3JS</h1>
          </div>
          
          {/* <button onClick={() => this.setState(state => ({isMounted: !state.isMounted}))}>
              {isMounted ? "Unmount" : "Mount"}
          </button> */}
          {/* {isMounted && <App />} */}
          {isMounted && <Navbar />}
          {isMounted && <Annotations />}

          {/* <App />
          <Navbar /> */}
          {/* <Route path="/" component={Main} />
          <Route path="/drag-and-drop" component={DragNDrop} />
          <Route path="/gauge" component={Gauge} />
          <Route path="/multimeter" component={Multimeter} />
          <Route path="/contact" component={Contact} /> */}
          {/* <Route component={Error} /> */}
          {/* <Annotations /> */}
      </Router>
      </div>
    )
  }
}

export default App;