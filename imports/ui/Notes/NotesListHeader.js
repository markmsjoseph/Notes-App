import React from 'react';
import { Meteor } from 'meteor/meteor';


export default class NoteListHeader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error:'',
        };
  }

  createNote(){
    console.log("Note being created");
    Meteor.call('notes.insert');
  }



    render() {
      return (
        <div className="addpost__WrapperForm">
            <h4>Total Notes:{this.props.length}</h4>
            <button onClick={this.createNote.bind(this)}>Create Note</button>
        </div>
      );
    }


  }
