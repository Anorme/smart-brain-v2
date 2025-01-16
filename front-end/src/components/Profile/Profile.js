import React, { Component } from 'react'
import './Profile.css';

 class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet
    }
  }

  onFormChange = (event) => {
    switch (event.target.name){
      case 'user-name': 
        this.setState({ name: event.target.value});
        break;
      case 'user-age':
        this,this.setState({ age: event.target.value});
        break;
      case 'user-pet':
        this.setState({ pet: event.target.value});
      default: 
        return;
    }
  }

  onProfileUpdate = (data) => {
    fetch (`http://localhost:3000/profile/${this.props.user.id}`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ formInput: data})
    }).then(resp => {
      this.props.toggleModal();
      this.props.loadUser({...this.props.user, ...data})
    }).catch(console.log)
  }

  render () {
    const { user, toggleModal } = this.props; 
    const { name, age, pet } = this.state; 
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="https://img.icons8.com/?size=100&id=zxB19VPoVLjK&format=png&color=000000"
              className="br-100 ba h3 w3 dib" alt="avatar" 
            />
            <h1>{this.state.name}</h1>
            <h4>{`Images submitted: ${user.entries}`}</h4>
            <p>{`Member since: ${new Date (user.joined).toLocaleDateString()}`}</p>
            <hr />
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="user-name">Name</label>
              <input
                onChange={this.onFormChange}
                className="pa2 ba hover-black w-100"
                type="text"
                name="user-name"
                id="name"
                placeholder="Psyger-100"
              />
            </div>
              <label className="db fw6 lh-copy f6" htmlFor="user-age">Age</label>
              <input
                onChange={this.onFormChange}
                className="pa2 ba hover-black w-100"
                type="text"
                name="user-age"
                id="user-age"
                placeholder="22"
              />
              <label className="db fw6 lh-copy f6" htmlFor="user-pet">Pet</label>
              <input
                onChange={this.onFormChange}
                className="pa2 ba hover-black w-100"
                type="text"
                name="user-pet"
                id="user-pet"
                placeholder="Lycagon"
              />
              <div className="mt4" style={{display:'flex', justifyContent: 'space-evenly'}}>
                <button
                  onClick={() => this.onProfileUpdate({ name, age, pet })} 
                  className="b pa2 pointer hover-white w-40 bg-light-blue b--black-20 grow "
                  >Save</button>
                <button
                  onClick={toggleModal} 
                  className="b pa2 pointer hover-white w-40 bg-light-red b--black-20 grow "
                >Exit</button>
              </div>
          </main>
          <div className="modal-close pl4 pointer f2" onClick={toggleModal}>&times;</div>
        </article>
      </div>
    )
  }
}

export default Profile;