import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from "react-tsparticles";
import { options } from './data/options.js';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signIn',
      isSignedIn: false,
    };
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    })
    this.getClarifaiData(this.state.input);
  }

  getClarifaiData = (imageUrl) => {
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "171dkwqu023b",
        "app_id": "b48a739f82a6480bbfeb47b37176b72b"
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": imageUrl,
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key 731a23c6e6534c138b1f3524cf7f9627'
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
      // response.text()
      .then(response => response.text())
      .then((result) => {
        this.displayFaceBox(this.calculateFaceLocation(JSON.parse(result, null, 2)));
      })
      .catch(error => console.log('error', error));
  }

  calculateFaceLocation(data) {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(this.state.box);
  }

  onRouteChange = (route) => {
    if (route === 'signIn' || route === 'register') {
      this.setState({isSignedIn: false});
    } else {
      this.setState({isSignedIn: true});
    }
    this.setState({
      route: route,
    })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles id="tsparticles" options={options} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {
          (this.state.route === 'home') ?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
            : (
              route === 'signIn' 
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange={this.onRouteChange} />
            ) 
        }
      </div>
    );
  }
}

export default App;
