import React from 'react';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import {Session} from 'meteor/session';
import {Notes} from '../../api/notes';

export default class NoteListItem extends React.Component {

    constructor(props) {
      super(props);
      this.state={
        noteStatus:'',
        foundNote:undefined
      }
    }
    componentDidMount() {
      this.postTracker =  Tracker.autorun(() => {
        const selectedNoteId = Session.get('selectedNoteId');
        this.findSelectedNote(selectedNoteId)
      });
    }

    //find the selected note
    findSelectedNote(noteId){
      const allYourNotes = Notes.findOne(noteId);
      this.setState({foundNote:allYourNotes});

    }

    onTextAreaChange(e){
        const selectedNoteId = Session.get('selectedNoteId');
      const text = e.target.value;
      Meteor.call('notes.update',[selectedNoteId, text])
    }
    onTitleChanged(e){
      const selectedNoteId = Session.get('selectedNoteId');
      const text = e.target.value;
      Meteor.call('notes.updateTitle',[selectedNoteId, text])
    }

    render() {
            if(this.state.foundNote){
                  return (
                      <div className = "wrapper wrapper__post" >
                        <h5>Edit Note</h5>
                        <input value = {this.state.foundNote.title} onChange={this.onTitleChanged.bind(this)}/>
                        <textarea value = {this.state.foundNote.body} onChange={this.onTextAreaChange.bind(this)}></textarea>
                        <button/>
                      </div>
                  );
            }
            else{
                    return (
                        <div className = "wrapper wrapper__post" >
                          <h5>No Note Found</h5>
                          {this.state.noteStatus}
                        </div>
                    );
            }


    }

  }
