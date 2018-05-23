import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import moment from 'moment';

export const Notes = new Mongo.Collection('notes');

if(Meteor.isServer){
  //meteor publish only runs on server not both client and server
  //publish takes a string and a function determining what data each client should have access too
  //must use es5 function because we need this binding
  Meteor.publish('yourNotes', function(){
    //we get the user id because of the this binding from es5 functions, the user calling this publication will have that id
    return Notes.find({userId:this.userId});
  })
}

Meteor.methods({
      'notes.insert'(){
        //if there is no user, you cannot insert a note
        if(!this.userId){
          throw new Meteor.Error('not authorized');
        }
        console.log("CREATING A NEW NOTE");
        Notes.insert({
            title:'',
            body:'',
            userId:this.userId,
            dateAdded:moment().valueOf()
        })
      }
});
