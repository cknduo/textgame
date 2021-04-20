// import logo from './logo.svg';
import React, {Component} from 'react'
import './App.css'
import Player from './components/Player/Player'
import Journal from './components/Journal/Journal'
import Particles from 'react-particles-js'

const particlesparam = {
  "particles": {
      "number": {
          "value": 100,
          "density": {
              "enable": false
          }
      },
      "size": {
          "value": 3,
          "random": true,
          "anim": {
              "speed": 4,
              "size_min": 0.3
          }
      },
      "line_linked": {
          "enable": false
      },
      "move": {
          "random": true,
          "speed": 0.5,
          "direction": "top",
          "out_mode": "out"
      }
  }
}

const initState = {
  sceneChange: 'intro',
  scene: {
    description: '',
    options: [
      {
        description: '',
        optionName: ''
      },
      {
        description: '',
        optionName: ''
      }
    ]
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = initState
  }

  async componentDidMount() {
    const url = `http://localhost:3000/scene/${this.state.sceneChange}`
    const res = await fetch(url)
    const data = await res.json()
    this.setState({scene: data})
  }

  async onOptionClick(option) {
    this.setState({ sceneChange: option }, async () => {
      const url = `http://localhost:3000/scene/${this.state.sceneChange}`
      const res = await fetch(url)
      const data = await res.json()
      this.setState({scene: data})
    })
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesparam} />
        <Player currentScene={this.state.sceneChange} />
        <Journal 
          sceneDescription={this.state.scene.description}
          firstOptionDescription={this.state.scene.options[0].description}
          firstOptionName={this.state.scene.options[0].optionName}
          secondOptionDescription={this.state.scene.options[1].description}
          secondOptionName={this.state.scene.options[1].optionName}
          onOptionClick={this.onOptionClick.bind(this)}
        />
      </div>
    )
  }
}

export default App;
