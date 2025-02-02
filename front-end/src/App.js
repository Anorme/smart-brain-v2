import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/Signin/Signin';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import ParticlesBg from 'particles-bg'; 
import 'tachyons';
import './App.css';
import Profile from './components/Profile/Profile';

const initialState = {
  input: '',
  imageUrl:'',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  isProfileOpen: false,
  user: {
    id: '',
    email: '',
    name: '',
    entries: 0,
    joined: '',
    pet: '',
    age: ''
  }
}

class App extends Component {
  constructor () {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user:{
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    if (data && data.outputs) {
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);

      const dataArray = data.outputs[0].data.regions;
      const clarifaiFaces = dataArray.map((face) => {
        const clarifaiFace = face.region_info.bounding_box;
        // Accessing and rounding the bounding box values
        const topRow = clarifaiFace.top_row.toFixed(3);
        const leftCol = clarifaiFace.left_col.toFixed(3);
        const bottomRow = clarifaiFace.bottom_row.toFixed(3);
        const rightCol = clarifaiFace.right_col.toFixed(3);

        //Calculating the face box position 
        return {
          leftCol: leftCol * width,
          topRow: topRow * height,
          rightCol: width - (rightCol * width),
          bottomRow: height - (bottomRow * height)
        }
      });
      return clarifaiFaces;
    }
    return 
  }

  displayFaceBox = (boxes) => {
    if (boxes) {
      this.setState({boxes: boxes});
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value}); 
  }

  onPictureSubmit = () => {
  this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })  
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {
            'Content-Type' : 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
          body: JSON.stringify({
          id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        .catch(console.log)

      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }
  
  render() {
    const { isSignedIn, imageUrl, boxes, route, user, isProfileOpen} = this.state;
    return (
      <div className="App">
        <>
          <ParticlesBg className="particles" color="#ffffff" type="cobweb" bg={true} num={100} />
        </>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
      {
        isProfileOpen && 
          <Modal toggleModal={this.toggleModal}>
            <Profile 
              isProfileOpen={isProfileOpen} 
              toggleModal={this.toggleModal}
              loadUser={this.loadUser}
              user={user}
            />
          </Modal>
      }
      {route === 'home'
        ? <div>
          <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onPictureSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div>
        : (
            route === 'signin'
            ?<SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
      }
      </div>
    );
  }
}
 
export default App;
