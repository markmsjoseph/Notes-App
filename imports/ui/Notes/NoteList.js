import React from 'react';
import {Notes} from '../../api/notes';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import NotesListHeader from './NotesListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import {Session} from 'meteor/session';

export default class NoteList extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        notes:[]
      };
    }

    //called after stuff is rendered to the screen in render
    componentDidMount() {
      // console.log("ComponentDidMount fires AllPost");
      this.postTracker =  Tracker.autorun(() => {
          const selectedNoteId = Session.get('selectedNoteId');
          console.log("Current note :", selectedNoteId);
          Meteor.subscribe('yourNotes');
          //find all links which are approved. then call fetch on cursor to get all link documents back
          const allYourNotes = Notes.find({}).fetch();
          this.setState({notes:allYourNotes});
            console.log("SUPPOSED TO BE NOTES ARRAY: ",this.state.notes);
      });


    }

    //fires right before component is removed from screen
    componentWillUnmount() {
      // console.log("Component Unmount fires PostList");
      //video 69 15:18 called to stop component from getting updated
      this.postTracker.stop();
    }


    renderAllNoteListItems(){
      const selectedNoteId = Session.get('selectedNoteId');
      return this.state.notes.map((notes)=>{
        //from the state array, which is the data stored in the database, we take that database data
        //and we pass it into notelistitem for each note(this will format etc). we use the spreat operator
        //to get all this data and we pass in the id of the currently selected note
        return <NoteListItem key={notes._id} {...notes} isSelected = {selectedNoteId} />;

      });
    }
    //if notes length is 0, after question mark provide the value, if it is not 0, after colon provide that value
    //in this case, we provide undefined if length is != 0
  //{this.state.notes.length===0 ? : undefined}
    render() {
      return (
        <div>
                {this.state.notes.length===0 ? <NoteListEmptyItem/> : <NotesListHeader length={this.state.notes.length}/>}

                {this.renderAllNoteListItems()}
        </div>
      );
    }


  }
