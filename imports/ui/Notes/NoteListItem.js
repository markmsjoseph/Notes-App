import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default class NoteListItem extends React.Component {

    constructor(props) {
      super(props);
    }

    //render the note name otherwies if no name render untitled note
    render() {
      return (
          <div className = "wrapper wrapper__post">
            <h5>{this.props.title || 'Untitled Note'} </h5>
            <p> {moment(this.props.dateAdded).format('M/DD/YY HH:mm')}</p>
          </div>
      );
    }

  }
