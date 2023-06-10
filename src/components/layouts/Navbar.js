import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './Main';
import DragNDrop from './DragNDrop';
import Gauge from './Gauge';
import Multimeter from './Multimeter';
import Contact from './Contact';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state={
      menuOpen:false,
    }
  }
  
  handleHover(){
    this.setState({hover:!this.state.hover});
  }
  handleMenuClick() {
    this.setState({menuOpen:!this.state.menuOpen});
  }
  handleLinkClick() {
    this.setState({menuOpen: false});
  }
  
  componentDidMount() {

  }
  
  render(){
    const styles= 
      {
        container:{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: '99',
          opacity: 0.9,
          display:'flex',
          alignItems:'center',
          background: 'black',
          width: '100%',
          color: 'white',
          fontFamily:'Orbitron',
        },
        logo: {
          margin: '0 auto',
        },
        menuItem:{
          display:'block',          
          fontFamily:`'Orbitron', sans-serif`,
          // fontSize: '1rem',
          padding: '1rem 0',
          margin: '0 5%',
          cursor: 'pointer',
          color: this.state.hover? 'gray':'#fafafa',
          transition: 'color 0.2s ease-in-out',
          animation: '0.5s slideIn forwards',
          animationDelay:this.props.delay,
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          filter: this.state.menuOpen ? 'blur(2px)':null,
          transition: 'filter 0.5s ease',
        },
      }
    const menu = ['React & 3JS', 'Drag And Drop', 'Vacuum Gauge', 'Multimeter', 'Contact Me'];
    const ref = ['./', '/drag-and-drop', '/gauge', '/multimeter', '/contact'];
    const menuItems = menu.map((val,index)=>{
      return (
        <MenuItem
          key={index} 
          delay={`${index * 0.1}s`}
          onMouseEnter={()=>{this.handleHover();}} 
          onMouseLeave={()=>{this.handleHover();}}
          onClick={()=>{this.handleLinkClick();}}>
            <Link to={ref[index]} style={styles.menuItem}>
              {val}
            </Link>
        </MenuItem>
      )
    });
  
    return(
      <div>
        <div id="menu-container" style={styles.container}>
          <MenuButton open={this.state.menuOpen} onClick={()=>this.handleMenuClick()} color='white'/>
          <div style={styles.logo}>KHANH CHRISTOPHER TRAN</div>
        </div>

        <Routes>
          <Route exact path={`/`} element={<Main />} />
          <Route exact path={`/drag-and-drop`} element={<DragNDrop/>} />
          <Route exact path={`/gauge`} element={<Gauge/>} />
          <Route exact path={`/multimeter`} element={<Multimeter/>} />
          <Route exact path={`/contact`} element={<Contact/>} />
        </Routes>

        <Menu open={this.state.menuOpen}>
          {menuItems}
        </Menu>
      </div>
    )
  }
}

/* MenuItem.jsx*/
class MenuItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      hover:false,
    }
  }
  
  handleHover(){
    this.setState({hover:!this.state.hover});
  }
  
  render(){
    const styles={
      container: {
        opacity: 0,
        animation: '1s appear forwards',
        animationDelay:this.props.delay,
      },
      menuItem:{
        fontFamily:`'Orbitron', sans-serif`,
        fontSize: '1rem',
        padding: '1rem 0',
        margin: '0 5%',
        cursor: 'pointer',
        color: this.state.hover? 'gray':'#fafafa',
        transition: 'color 0.2s ease-in-out',
        animation: '0.5s slideIn forwards',
        animationDelay:this.props.delay,
      },
      line: {
        width: '90%',
        height: '1px',
        background: 'gray',
        margin: '0 auto',
        animation: '0.5s shrink forwards',
        animationDelay:this.props.delay,        
      }
    }
    return(
      <div className={'link-item-container'} style={styles.container}>
        <div
          className='link-item'
          // style={styles.menuItem} 
          onMouseEnter={()=>{this.handleHover();}} 
          onMouseLeave={()=>{this.handleHover();}}
          onClick={this.props.onClick}>          
            {this.props.children}
        </div>
        <div style={styles.line}/>
    </div>  
    )
  }
}

/* Menu.jsx */
class Menu extends React.Component {
  constructor(props){
    super(props);
    this.state={
      // open: this.props.open? this.props.open:false,
      open: []
    }
  }

  // // 'componentWillReceiveProps' deprecated!
  // componentWillReceiveProps(prevProps){
  //   if(prevProps.open !== this.state.open){
  //     this.setState({open:prevProps.open});
  //   }
  // }
  static getDerivedStateFromProps(prevProps, prevState){
    if (prevProps.open !== prevState.open) {
        return { open: prevProps.open };
    }
    else return null; // Triggers no change in the state
  }

  render(){
    const styles={
      container: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.state.open? '100%': 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'black',
        opacity: 0.95,
        color: '#fafafa',
        transition: 'height 0.3s ease',
        zIndex: 2,
      },
      menuList: {
        paddingTop: '3rem',
      }
    }
    return(
      <div id='menu-list-container' style={styles.container}>
        {
          this.state.open?
          <div className={'menu-lists'} style={styles.menuList}>
            {this.props.children}
          </div>:null 
        }
      </div>
    )
  }
}

/* MenuButton.jsx */
class MenuButton extends Component {
  constructor(props){
    super(props);
    this.state={
      open: this.props.open? this.props.open:false,
      color: this.props.color? this.props.color:'black',
    }
  }

  // // 'componentWillReceiveProps' deprecated!
  // componentWillReceiveProps(nextProps){
  //   if(nextProps.open !== this.state.open){
  //     this.setState({open:nextProps.open});
  //   }
  // }
  static getDerivedStateFromProps(nextProps, prevState){
    if (nextProps.open !== prevState.open) {
        return { open: nextProps.open };
    }
    else return null; // Triggers no change in the state
  }

  handleClick(){
  this.setState({open:!this.state.open});
  }
  
  render(){
    const styles = {
      container: {
        height: '32px',
        width: '32px',
        display:'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '4px',
      },
      line: {
        height: '2px',
        width: '20px',
        background: this.state.color,
        transition: 'all 0.2s ease',
      },
      lineTop: {
        transform: this.state.open ? 'rotate(45deg)':'none',
        transformOrigin: 'top left',
        marginBottom: '5px',
      },
      lineMiddle: {
        opacity: this.state.open ? 0: 1,
        transform: this.state.open ? 'translateX(-16px)':'none',
      },
      lineBottom: {
        transform: this.state.open ? 'translateX(-1px) rotate(-45deg)':'none',
        transformOrigin: 'top left',
        marginTop: '5px',
      },       
    }
    return(
      <div className={`menu-hamburger`} style={styles.container} 
        onClick={this.props.onClick ? this.props.onClick: 
          ()=> {this.handleClick();}}>
        <div style={{...styles.line,...styles.lineTop}}/>
        <div style={{...styles.line,...styles.lineMiddle}}/>
        <div style={{...styles.line,...styles.lineBottom}}/>
      </div>
    )
  }
}

export default Navbar;