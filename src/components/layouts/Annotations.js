import React, { Component } from 'react';

class Annotations extends Component {
    render() {
        return(
            <>
            <div className='annotation'>
                <p><strong>React &amp; 3JS</strong></p>
                <p>This was built with my cursory knowledge of React and 3JS.  The 3D (GLTF) car model was not developed by me, but was taken from poly.google.com and incorporated into this design.</p>
            </div>
            {/* <canvas id="number" width="64" height="64"></canvas> */}
            </>
        );
    }
}

export default Annotations;