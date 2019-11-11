import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import netflix_logo from './assets/netflix_logo.png'
import backgroundImage from './assets/netflixBackground.jpg'

class HomePage extends Component {
    render() {
        return (
            <div className="homePageMainContainer"> 
                <img className="homePageNotflix" src={netflix_logo} />
                <div className="homePageSubContainer">
                    <p className="homePageText">Welcome to Notflix. </p>
                    <Link to="/signup" ><button className="signupButton" >Go to Signup</button></Link>
                    <Link to="/login" ><button className="loginButton" >Go to Login</button></Link>
                </div>
            </div>
        )
    }
}

export default HomePage