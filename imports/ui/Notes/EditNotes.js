
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../../api/notes';

export class Editor extends React.Component {
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }

  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder="Untitled Note" onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
          { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
        </p>
      );
    }
  }
};


export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId:selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);

// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import moment from 'moment';
// import {Session} from 'meteor/session';
// import {Notes} from '../../api/notes';
//
// export default class EditNotes extends React.Component {
//
//     constructor(props) {
//       super(props);
//       this.state={
//         noteStatus:'',
//         foundNote:undefined
//       }
//     }
//
//     componentDidMount() {
//         Tracker.autorun(() => {
//             const selectedNoteId = Session.get('selectedNoteId');
//             const allYourNotes = Notes.findOne(Session.get('selectedNoteId'));
//             console.log("ALL NOTES", allYourNotes);
//
//             this.setState({ foundNote: allYourNotes },() =>
//             console.log("STATE IS ",this.state.foundNote)
//             );
//             // this.setState({foundNote:allYourNotes});
//             console.log("In Edit Note Component, session value is : ",Session.get('selectedNoteId'));
//
//           });
//     }
//
//     //whenever we change the input of the selected note, we update it in the database
//     onTextAreaChange(e){
//         const selectedNoteId = Session.get('selectedNoteId');
//       const text = e.target.value;
//       Meteor.call('notes.update',[selectedNoteId, text])
//     }
//     onTitleChanged(e){
//       const selectedNoteId = Session.get('selectedNoteId');
//       const text = e.target.value;
//       Meteor.call('notes.updateTitle',[selectedNoteId, text])
//     }
//
//     render() {
//       //if we have a note that is selected we display the editing boxes otherwise we have not selected a note
//             if(this.state.foundNote){
//                   return (
//                       <div className = "wrapper wrapper__post" >
//                         <h5>Edit Note</h5>
//                         <input value = {this.state.foundNote.title} onChange={this.onTitleChanged.bind(this)}/>
//                         <textarea value = {this.state.foundNote.body} onChange={this.onTextAreaChange.bind(this)}></textarea>
//                         <button/>
//                       </div>
//                   );
//             }
//             else{
//                     return (
//                         <div className = "wrapper wrapper__post" >
//                           <h5>No Note Found</h5>
//                           {this.state.noteStatus}
//                         </div>
//                     );
//             }
//
//
//     }
//
//   }
