import React from 'react';
import { Link } from 'react-router-dom';
import PrivateHeader from './PrivateHeader';
import NoteListMainContainer from './Notes/NoteListMainContainer';
import {Session} from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';


export class PublicNotes extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //set the global session variable currentPagePrivacy to the value that was passed in as props from the route component in main.js
        Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
    }




    render() {
      console.log(this.props.notes);
      return (
          <div>
                <div className="header">
                          <div className="header__content">
                                <PrivateHeader  title="All Notes" subtitle="To post your own note, you must register and login"  />

                          </div>

                </div>
                {this.props.notes.map((note) => {
                  return(
                    <div className="public-item">
                    <h2>{note.title}</h2>
                    <p>{note.body}</p>

                  </div>
                  );
                })}
          </div>
      );
    }

}


export default createContainer(() => {
        const selectedNoteId = Session.get('selectedNoteId');
        Meteor.subscribe('publicNotes');


        return {
          //from the list of all notes, we create a new array with all the previous properties
          //and we add on a new selected property, this will be false for all except the one that matches the session variable
          notes: Notes.find({isPublic:true}).fetch().map((note) => {
            return {
              ...note
            };
          })
        };
}, PublicNotes);
