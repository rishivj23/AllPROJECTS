import React, { Component } from 'react';
import './header.css';


export default class Header extends Component{
   render() {
       return(
    <div className='Header'>
       {this.props.heading}
    </div>
)} 
}

