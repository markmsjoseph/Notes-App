import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PrivateHeader from './PrivateHeader';
import NoteListMainContainer from './Notes/NoteListMainContainer';
import {Session} from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';
import CommentComponent from './CommentComponent';


export class PublicNotes extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        //set the global session variable currentPagePrivacy to the value that was passed in as props from the route component in main.js
        Session.set('currentPagePrivacy', this.props.priavteOrPublic);//set session id
    }


    addComment(idOfNote, e) {
      e.preventDefault();
      console.log("ID", idOfNote);

      //get the comment and trim of all unnecessary spaces
      let newComment = this.refs.commentRef.value;
        console.log("COMMENT" , newComment);
      //combine comment and the username of the poster into 1
      // let userAndMessage = {message:newComment, yourId:this.props.username};
      // console.log(userAndMessage);
      //this.props.meteorCall('notes.updateComments', idOfNote, {userAndMessage});
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
                    <div>
                    <div className="public-item">
                    <h2>{note.title}</h2>
                    <p>Posted By {note.postedBy}</p>
                    <p>{note.body}</p>
                    <CommentComponent id={note._id}/>
                    </div>

                  <p>Notes You Posted</p>
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
          username:Meteor.user() != undefined ? Meteor.user().username : 'undefined',
          meteorCall: Meteor.call,
          notes: Notes.find({isPublic:true}).fetch().map((note) => {
            return {
              ...note
            };
          })
        };
}, PublicNotes);
