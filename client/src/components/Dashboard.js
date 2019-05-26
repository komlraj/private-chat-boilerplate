import React, { Component } from 'react';
import io from 'socket.io-client';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      toUser: "friend",
      fromUser: "user",
      messages: []
    };

    this.socket = io('localhost:1234');

    this.socket.emit('ONLINE', { userId: this.state.fromUser})

    this.socket.on('RECEIVE_PRIVATE_MESSAGE', function(data){
      console.log(data, "received msg"); 
    });

    this.handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    };
  
    this.handleSendMessage = (e) => {
      e.preventDefault();
      const { message, fromUser, toUser } = this.state;
      this.socket.emit('SEND_PRIVATE_MESSAGE', {
        toUser,
        fromUser,
        message
      });
      this.setState({message: ''});
    }
  }

  render() {
		const { messages } = this.state;
    return (
      <div className='chatArea'>
        <div>
          {
            messages ? messages.map((message, i) => {
              if(message.fromUser === currentUser._id) {
                return <div key={i} className='currentUser-msg-wrap'><span className='right currentUser-msg'>{message.message} </span></div>
              } else {
                return <div key={i} className='anotherUser-msg-wrap'><span className='anotherUser-msg'>{message.message} </span></div>
              }
            }) : 'no messages'
          }
        </div>
        <form onSubmit={this.handleSendMessage} className='sendMsgForm'>
        	<input 
            name='message' 
            className='input message-box' 
            value={this.state.message} 
            onChange={this.handleChange} 
            placeholder='Message' 
        	/>
        </form>
      </div>
    )
  }
}


export default Dashboard;