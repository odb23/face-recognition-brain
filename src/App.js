import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from "react-tsparticles";
import {options} from './options.js';
import {getClarifaiData} from './clarifaiHandler';
import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {

      },
    };
  }

  onInputChange = (event) => {
        this.setState({
          input: event.target.value
        });
  }

  onSubmit = () => {
    this.setstate({
      imageUrl: this.state.input,
    })
    this.displayFaceBox(getClarifaiData(this.state.input));
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  render() {
    return (
      <div className="App">
        <Particles id="tsparticles" options={options}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}/>
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
