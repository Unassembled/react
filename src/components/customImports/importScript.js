import React, { Component, useEffect } from 'react';

class importScript extends Component {

  render() {
    console.log('IMPORT SHIT');

    return(
      (resourceUrl) => {
        useEffect(() => {
          const script = document.createElement('script');
          script.src = resourceUrl;
          script.async = true;
          document.body.appendChild(script);
          return () => {
            document.body.removeChild(script);
          }
        }, [resourceUrl])
      }
    );
  }
}

export default importScript;