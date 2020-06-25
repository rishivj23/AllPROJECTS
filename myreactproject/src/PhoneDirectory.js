import React, { Component } from 'react';
import AddSubscriber from './AddSubscriber';
import ShowSubscriber from './ShowSubscriber';
import { BrowserRouter as Router, Route } from 'react-router-dom';



export default class PhoneDirectory extends Component{
    constructor(){
        super();
        this.state={
            subscribersList:[
                {
                    id:1,
                    name:'Rishi',
                    phone:"8619922754"
                }


            ]
        }
    }

deleteSubscriberHandler=(subscriberId)=>{
    let subscribersList = this.state.subscribersList;
    let subscriberIndex = 0;
    subscribersList.forEach(function(subscriber,index){
        if(subscriber.id === subscriberId){
            subscriberIndex=index;
        }
    });
    let newsubscribers = subscribersList;
    newsubscribers.splice(subscriberIndex,1);
    this.setState({subscribersList:newsubscribers});
}
  
    
addSubscriberHandler=(newSubscriber)=>{
   
 let subscribersList = this.state.subscribersList;
 if(subscribersList.length>0){
     newSubscriber.id= subscribersList[subscribersList.length-1].id+1;
 }
 else{
     newSubscriber.id = 1;
 }
 subscribersList.push(newSubscriber);
 this.setState({subscribersList:subscribersList});
 console.log(this.state.subscribersList);
}



render(){
    return(
       <Router>
           <Route exact path='/' render={()=><ShowSubscriber subscribersList={this.state.subscribersList} deleteSubscriberHandler = {this.deleteSubscriberHandler}/>}/>
           <Route path='/add' render={()=><AddSubscriber  addSubscriberHandler = {this.addSubscriberHandler}/>}/>
       </Router>
    )
}



}