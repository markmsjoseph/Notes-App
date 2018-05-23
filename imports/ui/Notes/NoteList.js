import React from 'react';
import {Notes} from '../../api/notes';
import {Tracker} from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import NotesListHeader from './NotesListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

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
      return this.state.notes.map((notes)=>{
        return <NoteListItem key={notes._id}   {...notes} />;

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
