import React, { Component } from 'react';

class Contact extends Component {
    componentWillUnmount() {
        console.log('****UNMOUNTED!!!****');    
    }
    componentDidMount(){
        // let canvas = document.querySelector('canvas');
        //     canvas.style.display='none';            
        // let appContainer = document.getElementById('app-container');
        //     appContainer.style.display='none';
        let annotation = document.querySelector('.annotation');
            annotation.style.display='none';
        let title = document.querySelector('h1');
            title.textContent = 'CONTACT ME';
        
        // document.body.style.backgroundImage = 'none';
    }
    
    render() {
        const style ={
            contact: {
                position:'relative',
                top:'125px',
                padding:'10px',
            }
        }
        return( 
        <div id="contact" style={style.contact}>
            <div className='contact1'>
                khanh.christopher.tran{`@`}gmail.com
            </div>
           <div className='contact2'>
               310.218.8379
            </div>
        </div>
        );
    }
}

export default Contact;