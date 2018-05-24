import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import {Session} from 'meteor/session';

export default class NoteListItem extends React.Component {

    constructor(props) {
      super(props);
    }

    //render the note name otherwies if no name render untitled note
    render() {
      //we set the session variable selectedNoteId to the id of this note

      //in order to see if a note is selected, we get the isSelected value that was
      //passed in as a prop and we check to see if it is the same as the current note's id
      return (
          <div className = "wrapper wrapper__post" onClick={()=>{
            console.log("setting session to ", this.props._id);
            Session.set('selectedNoteId', this.props._id)
          }}>
            <h5>{this.props.title || 'Untitled Note'} </h5>
            {this.props.isSelected===this.props._id ? ' Selected': ''}

            <p> {moment(this.props.dateAdded).format('M/DD/YY HH:mm')}</p>
          </div>
      );
    }

  }
