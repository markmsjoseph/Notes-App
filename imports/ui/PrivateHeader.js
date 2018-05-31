import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import {Session} from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import { history } from '../../client/main.js';
import { Link } from 'react-router-dom';

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
    console.log("LOCATION", this.props.history.location);
            const imageSource = this.props.isNavOpen ? 'images/x.svg' : '/images/bars.svg';

            return (
                      <div >

                            <img className = "header_nav_toggle" src =  {imageSource} onClick = {this.onImageClick.bind(this)}/>
                            <h1 className = "header__title"> {this.props.title}</h1>
                          { this.props.history.location.pathname === "/dashboard" || this.props.history.location.pathname === "/dashboard/:id" ? <h3 className = "header__title"> <Link to ="/publicNotes">All Public Notes</Link></h3> : ''}
                              <h3 className = "header__title"> {this.props.subtitle}</h3>
                              { this.props.history.location.pathname === "/" ? <Link to ="/signup" className = "button--logout">Login Or Signup</Link> : <button className = "button--logout" onClick={this.onLogout.bind(this)}>Logout</button> }
                      </div>
            );
  }


  }

  export default createContainer(() => {
    return {
        isNavOpen:Session.get('isNavOpen'),
        history:history
    };
  }, PrivateHeader);
