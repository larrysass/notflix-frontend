import React, { Component } from 'react';
import netflix_logo from './assets/netflix_logo.png'

class LoginPage extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.token = data.token

        this.props.history.push('/main')

      }
    })
  }

  handleClick = () => {
    this.props.history.push('./homePage')
  }

  render() {
    return (
      <div className="homePageMainContainer">
         <img className="homePageNotflix" src={netflix_logo} onClick={this.handleClick} />
      <div className="homePageSubContainer">
        <p className="homePageText"> Log in!</p>
        <form onSubmit={this.handleSubmit} className="field">
          <input className="signupInput" onChange={this.handleChange} value={this.state.username} placeholder="username" type="text"  name="username" />
          <input className="signupInput" onChange={this.handleChange} value={this.state.password} placeholder="password"type="password" name="password" />
          <input className="newSignupButton" type="submit"  value="Log in"/>
        </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;