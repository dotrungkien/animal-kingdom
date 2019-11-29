import React, { Component } from 'react';
import './App.css';
import { UserSession, config } from 'blockstack';
import Landing from './Landing';
import SignedIn from './SignedIn';

config.logLevel = 'error';

class App extends Component {
  constructor() {
    super();
    this.userSession = new UserSession();
  }

  componentDidMount() {
    const session = this.userSession;
    if (!session.isUserSignedIn() && session.isSignInPending()) {
      session.handlePendingSignIn().then(userData => {
        if (!userData.username) {
          throw new Error('This app requires a username.');
        }
        window.location = `/kingdom/${userData.username}`;
      });
    }
  }

  render() {
    return (
      <main role="main">{this.userSession.isUserSignedIn() ? <SignedIn /> : <Landing />}</main>
    );
  }
}

export default App;
