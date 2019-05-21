import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

// Connect the client to the server
const socket = io('http://localhost:4000');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            joined: false
        };

        // Listen to the server for incoming message
        // Put all listens in constructor
        socket.on('news', data => {
            console.log(data);
            this.setState({
                message: data
            });
        });

        socket.on('welcome', pin => {
            console.log('Welcome to the room', pin);
            this.setState({
                joined: true
            });
        });
    }
    render() {
        const { message, joined } = this.state;
        return (
            <div className='App'>
                <h1>My Message: {message}</h1>
                {/* Sending an event to the server from the client */}
                <button
                    onClick={() =>
                        socket.emit('Join Room', {
                            roomPin: 12345
                        })
                    }>
                    Send to Server
                </button>
                <h2>Joined Room: {joined}</h2>
            </div>
        );
    }
}

export default App;
