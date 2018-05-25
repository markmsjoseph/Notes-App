import React from 'react';
import moment from 'moment';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';


//NOTE: DISPLAYS INDIVIDUAL NOTES, IE THEIR TITLE, DATE AND WHETEER OR NOT THEY ARE SELECTED
export const NoteListItem = (props) => {

      //when we click a note, we want to set it as the selected note for the url and css styling purposes
      const setNoteId = ()=>{
          props.Session.set('selectedNoteId', props.note._id);
      }

      return (
          <div className = "wrapper wrapper__post"  onClick={setNoteId}>
                  <h5>{ props.note.title || 'Untitled note' }</h5>
                  { props.note.selected ? 'selected' : undefined }
                  <p>{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
          </div>
      );

};

//create container takes 2 arguments, a function and the component to render stuff to
export default createContainer(() => {
  //returns an object with all the stuff that we want to pass down as props to the component
  return {
    Session:Session
   };
}, NoteListItem);



// import React from 'react';
// import { Meteor } from 'meteor/meteor';
// import moment from 'moment';
// import {Session} from 'meteor/session';
//
// export default class NoteListItem extends React.Component {
//
//     constructor(props) {
//       super(props);
//
//     }
//
//     //render the note name otherwies if no name render untitled note
//     render() {
//       //we set the session variable selectedNoteId to the id of this note
//
//       //in order to see if a note is selected, we get the isSelected value that was
//       //passed in as a prop and we check to see if it is the same as the current note's id
//       return (
//           <div className = "wrapper wrapper__post" onClick={()=>{
//             console.log("setting session to ", this.props._id);
//            Session.set('selectedNoteId', this.props._id)
//             console.log("SESSION VAL $$$$$$$$$$$$$$$$$$$$$$$$$$$$$", Session.get('selectedNoteId'));
//           }}>
//             <h5>{this.props.title || 'Untitled Note'} </h5>
//             {this.props.isSelected===this.props._id ? ' Selected': ''}
//
//             <p> {moment(this.props.dateAdded).format('M/DD/YY HH:mm')}</p>
//           </div>
//       );
//     }
//
//   }
