import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import {Session} from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export class PrivateHeader extends React.Component {

  constructor(props) {
       super(props);
  }

  onLogout() {
    console.log("logout clicked");
    Accounts.logout();
  }
  onImageClick(){
    if(this.props.isNavOpen){
        Session.set('isNavOpen', false);
        console.log("NAV NOW CLOSED");
    }
    else{
        Session.set('isNavOpen', true);
        console.log("NAV NOW OPEN");
    }

  }

  render() {
    const imageSource = this.props.isNavOpen ? 'images/x.svg' : '/images/bars.svg';
    return (
      <div >
            <img className = "header_nav_toggle" src =  {imageSource} onClick = {this.onImageClick.bind(this)}/>
            <h1 className = "header__title"> {this.props.title}</h1>
            <h3 className = "subtitle-bar"> {this.props.subtitle}</h3>
            <button className = "" onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }


  }

  export default createContainer(() => {
    return {
        isNavOpen:Session.get('isNavOpen')
    };
  }, PrivateHeader);
