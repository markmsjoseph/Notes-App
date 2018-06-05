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



    render() {
      return (
        <div>
              <div className="header">
                    <div className="header__content">
                      <PrivateHeader  title="All Notes"   />
                    </div>
              </div>

              <div className="public_item_container">
                          {this.props.notes.map((note) => {
                            return(
                              <div>
                                      <div className="public-item">
                                            <h2>{note.title}</h2>
                                            <p>Posted By {note.postedBy}</p>
                                            <p>{note.body}</p>

                                            COMMENTS:{note.comments.map((comment)=>{
                                              return <div className="comment">
                                                <p className = "comment-user">{comment.userAndMessage.yourId} says:</p>
                                                <p className = "comment-message"> {comment.userAndMessage.message} </p>

                                              </div>
                                            })
                                          }

                                          <CommentComponent id={note._id}/>
                                      </div>
                            </div>
                          );
                        })}
              </div>
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
