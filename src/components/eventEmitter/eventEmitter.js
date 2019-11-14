
import React,{Component} from 'react'
import EventEmitter from 'events';
import _ from 'lodash';

  class BaseClient extends Component {

  /**
   * Initiate the event emitter
   */
  eventEmitter
  constructor() {
     this.eventEmitter= new EventEmitter() ;
  }
  


 
on(eventName, listener) {
   this.eventEmitter.on(eventName, listener); 
}


emit(event, payload, error = false) {
  this.eventEmitter.emit(event, payload, error);
}


}

export default BaseClient