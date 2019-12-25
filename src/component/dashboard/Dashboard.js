import React, { Component } from 'react';
import Profile from './Profile';

class Dashboard extends Component{
    render(){
        return(
            <div className="container">
                <Profile />
            </div>
        )
    }
}

export default Dashboard;