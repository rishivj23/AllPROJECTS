import React, { Component } from 'react';
import Header from "./header";
import './AddSubscriber.css';
import './common.css';
import { Link } from 'react-router-dom';



export default class AddSubscriber extends Component {
  constructor(){
    super();
    this.state={
      id:0,
      name:'',
      phone:''
     
    }
    
  }


  inputChangedHandler=(e)=>{
    const state = this.state;
    state[e.target.name]=e.target.value;
    this.setState(state);
   console.log(this.state);
  }

  onFormSubmitted=(e)=>{
   
    e.preventDefault();
    this.props.addSubscriberHandler(this.state);
    this.setState({ id: 0, name: '', phone: ' ' });
    console.log(e.target);
   e.target.reset();
  }
  


  render() {
    
  const {name ,phone} = this.state;
    return (
      <div>
        <Header heading="Add Subscriber" />
        <div className="component-body-container">
        <Link to='/'> <button className="custom-btn">Back</button></Link> 
          <form className="subscriber-form" onSubmit={this.onFormSubmitted.bind(this)}>
            <label htmlFor="name" className="label-control">Name:</label><br />
            <input id="name" type="text" className="input-control" name="name" autoComplete='off' onChange={this.inputChangedHandler} /><br /><br />
            <label htmlFor="name" className="label-control">Phone:</label><br />
            <input id="phone" type="text" className="input-control" name="phone" autoComplete='off' onChange={this.inputChangedHandler} /><br /><br />
       
          <div className="subscriber-info-container">
            <span className="subscriber-to-add-heading">Subscriber to be added: </span><br /><br />
            <span className="subscriber-info">Name : {this.state.name} </span><br /><br />
            <span className="subscriber-info">Phone : {this.state.phone} </span><br />
          </div>
          <button type="submit" className="custom-btn add-btn">Add</button>
          </form>
        </div>
      </div>
    )
  }
}