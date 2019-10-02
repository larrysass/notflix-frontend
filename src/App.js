import React from 'react';
import './App.css';
import MainPage from './MainPage.js';
import HomePage from './HomePage.js';
import LoginPage from './LoginPage.js';
import SignUpPage from './SignUpPage.js';
import PageNotFound from './PageNotFound.js';

import { Switch, Route, withRouter } from 'react-router-dom'


class App extends React.Component {

  state = { 
    currentUser: {},
    username: '',
  }

  componentDidMount() {
    if (localStorage.token) {
      fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })
      .then(res => res.json())
      .then(user => this.setState({currentUser: user, username: user.username}))
    } else {
      this.props.history.push('/')
    }
  }

  render() {
     return (
   <Switch> 
     <Route path={'/main'}
     render={routerProps => <MainPage {...routerProps} currentUser={this.state.currentUser}/>}
     />

     <Route path={'/login'} component={LoginPage} />
      <Route path={'/signup'} component={SignUpPage} />
     <Route path={'/'} component={HomePage}/>
     <Route component={PageNotFound}/>
   </Switch>
  );
}
}

export default withRouter(App)
