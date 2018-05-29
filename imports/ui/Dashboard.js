import React from 'react';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
import NoteListMainContainer from './Notes/NoteListMainContainer';
import {Session} from 'meteor/session';



export default class Home extends React.Component {

    constructor(props) {
    super(props);
        this.state = {
        username:""
        };
  }

    componentWillMount() {
        //set the global session variable currentPagePrivacy to the value that was passed in as props from the route component in main.js
        Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
    }


    componentDidMount() {
      this.postTracker =  Tracker.autorun(() => {
          if(Meteor.user()){
              this.setState(()=>{
                return{
                  username:Meteor.user().username
                }
              });
          }
      });
    }


    render() {
              console.log("Render called");
              return (
                  <div>
                        <div className="header">
                            <div className="header__content">
                      <PrivateHeader  title="All Notes"  />
                      <p className = "">Logged in as:{this.state.username} </p>
                    </div>
                  </div>
                      <NoteListMainContainer />
                  </div>
              );
    }

  }
