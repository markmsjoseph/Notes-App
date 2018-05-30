
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { Notes } from '../../api/notes';
import { history } from '../../../client/main.js';

export  class Editor extends React.Component {

  constructor(props) {
       super(props);
        this.state={
         title:'',
         body:''
        }
     }

  //this is called right after the props or state of this component is changed
  componentDidUpdate(prevProps, prevState){
    //turnary operator, if a note exist, get it's ID otherwise return undefined. this removes the error of trying
    //to access a poeperty of an undefined object
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    //if there is a note and the current note is not the previous(already the same no need to reset stuff)
    if(currentNoteId && currentNoteId != prevNoteId){
      //set the title and body to show what it previously had in the input fields
      this.setState({
        title: this.props.note.title,
        body:this.props.note.body
      });
    }

  }
  //get the text typed in, set it to the state, and save the text that was passed in to the database
  handleBodyChange = (e)=> {
          const body = e.target.value;
          this.setState({body});
          //call update and pass in as the arguments the noteid and the update
          this.props.call('notes.update', this.props.note._id, {body});
    }

  handleTitleChange =(e)=> {
     const title = e.target.value;
      this.setState({title});
      this.props.call('notes.update', this.props.note._id, {title});
    }

  deleteNote = ()=>{
      this.props.call('notes.delete', this.props.note._id);
      //fixes error where when u delete a note the browser url still shows the note id
      this.props.history.replace('/dashboard');
      Session.set('selectedNoteId', '');

  }

  render(){
        if (this.props.note) {
            return (
                <div className="editor">
                <input className = "editor__title" value={this.state.title} placeholder="Untitled Note" onChange={this.handleTitleChange}/>
                <textarea className = "editor__body" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange}></textarea>
                <button className = "button button--secondary"onClick={this.deleteNote}>Delete Note</button>
              </div>
            );
        }
        else {
            return (
                <div className="editor">
              <p className = "empty-item">
                { this.props.selectedNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
              </p>
            </div>
            );
        }
  }




};//endclass


export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId:selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call,
    history:history
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
