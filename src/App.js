import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
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
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmit = () => {
    console.log('click');
    getClarifaiData("https://image.shutterstock.com/image-photo/close-portrait-smiling-handsome-man-260nw-1011569245.jpg");
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
        {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
