import React from 'react';
import { Accounts } from 'meteor/accounts-base';

export default class PrivateHeader extends React.Component {

  onLogout() {
    console.log("logout clicked");
    Accounts.logout();
  }

  render() {
    return (
      <div >


        <h1 className = "header__title"> {this.props.title}</h1>
        <h3 className = "subtitle-bar"> {this.props.subtitle}</h3>
        <button className = "logoutButton" onClick={this.onLogout.bind(this)}>Logout</button>
    

      </div>
    );
  }


  }
