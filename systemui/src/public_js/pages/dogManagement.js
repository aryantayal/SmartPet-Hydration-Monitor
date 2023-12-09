import React from 'react';
import doggo from "./dogManagement/doggo.png";
import * as API_DogManagement from "../api/API_DogManagement.js";
//import "/Users/annebowser/Desktop/KSU/Senior Design/SystemUI/systemui/src/public_js/pages/dogManagement/dogManagement";

class ManageDogs extends React.Component {
  
   state = {
    dogInformation: [],
    editing: null
  }
 
  componentWillMount = () => {
    console.log("mounted");
    console.log(this.state.dogInformation);
    if(Array.isArray(this.state.dogInformation) && (this.state.dogInformation.length == 0)){
      this.loadData();
    }
  }

  loadData = async () => {
    const info = await API_DogManagement.getDogsTodayInfo(); 
    console.log(info.data);
    if(info.status === "Success"){
      this.setState({dogInformation: info.data});
    }
  }

  generateDogColumn = () => {
    const dogInformation = this.state.dogInformation;
    if(!dogInformation || dogInformation.length === 0){
      return;
    }
    return dogInformation.map(dog=>{
      let hydrationLevel = dog.consumption >= dog.suggestedconsumption;
      let dogConsumption = dog.consumption;
      dog.name = dog.name.trim();
      let editable = this.state.editing === dog.user_id;//flag for whether the input is view only
      if(null === dog.suggestedconsumption){
        hydrationLevel = "No reference."
      }
      else if(hydrationLevel === true){
        hydrationLevel = "Status: Hydrated";
      }
      else{
        hydrationLevel = "Status: Dehydrated";
      }

      if(editable){
        return (
          <span style={{marginRight: "40px", display: 'inline-flex', border: "1px", background: "lightblue", borderStyle: "solid", }}>
            <div style={{display: 'block'}}>
              <div><input type="text" id={dog.user_id+"_name"} defaultValue={dog.name}/></div>
              <div>{hydrationLevel}</div>
              <div>Consumption (ml): {dogConsumption}</div>
              <div><b>Suggested Intake (ml):</b> 
              </div>
              <div> 
                <input type="number" id={dog.user_id+"_suggestedIntake"} defaultValue={dog.suggestedconsumption}/> 
              </div>
              
              <div><button style= {{padding: "15px"}} onClick={this.addTag.bind(this, dog.user_id)}>Add Tag</button> 
              <button style = {{padding: "15px"}} onClick={this.saveChange.bind(this, dog.user_id)} >Save</button>
              
              </div>
            </div>
          </span> 
        );
      }
      else{
        return (
          <span style={{marginRight: "40px", display: 'inline-flex', border: "1px", background: "lightblue", borderStyle: "solid", }}>
          <div style={{display: 'block'}}>
            <div><h2>{dog.name}</h2></div>
            <div>{hydrationLevel}</div>
            <div>Consumption (ml): {dogConsumption}</div>
            <div>Suggested Intake (ml): {dog.suggestedconsumption}</div>
            <p><br></br></p>
            <div><button style={{padding: "15px"}} onClick={this.removeDog.bind(this, dog.user_id)}>Remove</button> 
            <button style={{padding: "15px"}} onClick={this.editChange.bind(this, dog.user_id)}>Edit</button>
            </div>
          </div>
        </span> 
            );
      }
    });
  }


  editChange = (user_id) => {
    this.setState({editing: user_id});
  }

  saveChange = async (user_id) => {
    let newName = document.getElementById(user_id+"_name").value;
    let newIntake = document.getElementById(user_id+"_suggestedIntake").value;
    let updated = await API_DogManagement.updateDog({user_id, newName, newIntake});
    console.log(updated);
    if(updated){
      this.setState({editing: null});
      this.loadData();
    }
  }

  createNewDog = async () => {

    
      let dogName = document.getElementById("dogName").value;
      let suggestedConsumption = document.getElementById("suggestedConsumption").value;
      let made = await API_DogManagement.createNewDog({dogName, suggestedConsumption});
      document.getElementById("dogName").value = "";
      document.getElementById("suggestedConsumption").value = null;
      if(made){
        this.loadData();
      }

  }

  removeDog = async (dog) => {
    let user_id = dog;
    let deleted = await API_DogManagement.removeDog({user_id});
    if(deleted){
      this.loadData();
    }
  }

  newDogHTML = () => {
    return (
        <div>
        <br></br>
      <div style = {{padding: "10px"}}>
        <label for="dogName">Name:   </label>
      </div>
      <div style = {{padding: "10px"}}>  
        <input type="text" id="dogName" name="dogName"/>
      </div>
      <div style = {{padding: "10px"}}> 
        <label for="suggestedConsumption">Suggested Intake: </label>
      </div>
      <div style = {{padding: "10px"}}> 
        <input type="number" id="suggestedConsumption" name="suggestedConsumption"/>
      </div>
      <div style = {{padding: "10px"}}> 
        <button style={{padding: "15px"}} value="Submit" onClick={this.createNewDog}>Submit</button>
        <br></br>
      </div>
      
    </div>
    );
  }

 //unfinished..not sure at all if this is on the right track.. compiles but not visible when added to 
addTag = async (user_id) => {
  console.log(user_id);
  let added = await API_DogManagement.addTag({user_id});
  if(added){
    this.loadData();
  }
  this.saveChange(user_id);
}

  //unfinished..not sure at all if this is on the right track.. compiles but not visible. Think i need to create a new attribute to dog being tag and then set as tag
  removeTag = async (tag) => {
    let user_id = tag;
    let removed = await API_DogManagement.removeTag({user_id});
    if(removed){
      this.loadData();
    }
  }


  addTagHTML = async () => {
    return(
      
      <span>
        <div>
        <button style={{padding: "15px"}} onClick={this.addTag}>Add Tag</button>{' '}
        </div>
      </span>
    )

  }

  
  removeTagHTML = async (tag) => {
    return(
      <span>
        <div>
        <button style={{padding: "15px"}} onClick={this.removeTag}>Remove Tag</button>{' '}
        </div>
      </span>
    )
    
  }

  //Not sure if this is right 
  newIntake = async () => {
  

  }


  //TODO create a way to add tags to dogs from a given dog - LOW PRIORITY
  //TODO create a way to remove tags from a given dog. Do this via a button, don't require text input - LOW PRIORITY
  //TODO create better visuals (DONE)
  //TODO Finish creating animal card
  //TODO button to edit animal
  //TODO implement API for save edited animal
  
  render() {
    return (
      <div className="column"> 
      {this.generateDogColumn()}
          <span style={{paddingLeft: "10px", marginRight: "50px", display: 'inline-flex', border: "2px", background: "lightblue", borderStyle: "solid", }}>
          <div style={{border: "3px", display: 'block'}}>
          {this.newDogHTML()}
          

          </div>
          </span>
          
      </div>
    ); 
  }
}

export default ManageDogs;
export const title = "Over View";
export const img = doggo;