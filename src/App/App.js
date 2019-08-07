import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from '../Utils/PrivateRoute'
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/loginForm';
import Profile from '../UserProfile/Profile';
import SuccessSignUp from '../RegistrationForm/Success';
import ShareMusic from '../ShareMusic/ShareMusic'
import DiscoverFeed from '../DiscoverFeed/DiscoverFeed'
import PublicProfile from '../UserProfile/PublicProfile';

export default class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route path='/register' component={RegistrationForm} />
          <Route path='/success' component={SuccessSignUp} />
          
          <Route path='/profile/:id' component={PublicProfile} />
          <PrivateRoute path='/profile' component={Profile} />
         

          <PrivateRoute path='/share-music' component={ShareMusic} />
          <PrivateRoute path='/discover' component={DiscoverFeed} />
          <Route path='/spotify-login' component={() => {
            window.location.href = 'https://murmuring-beyond-87321.herokuapp.com/api/spotify-login';
            return null;
          }} />
        </Switch>
      </main>
    )
  }
}