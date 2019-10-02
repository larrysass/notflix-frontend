import React, { Component } from 'react';
import netflix_logo from './assets/netflix_logo.png'

export default class SignUpPage extends Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = (e) => {
    
    e.preventDefault()
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(r => r.json()).then(data => {
      if (data.token) {
        localStorage.token = data.token

        this.props.history.push('/main')

      }
    })
  }
  handleClick = () => {
    this.props.history.push('./homePage')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  render() {
    return (
      <div className="homePageMainContainer">
        <img className="homePageNotflix" onClick={this.handleClick} src={netflix_logo} />
       <div className="homePageSubContainer">
       <p className="homePageText">Signup. </p>
        <form >
          <input className="signupInput"type="text" name="username" onChange={this.handleChange} value={this.state.username} placeholder="username" />
          <input className="signupInput" type="password" name="password" onChange={this.handleChange} value={this.state.password} placeholder="password"/>
          <input className="newSignupButton"type="submit" value="Signup" onClick={this.handleSubmit}/>
        </form>
      </div>
      </div>
    );
  }
}