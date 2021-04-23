import React, {Component} from 'react'
import './App.css'
import Player from './components/Player/Player'
import Adventure from './components/Adventure/Adventure'
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

  componentDidMount = async () => {
    const url = `http://localhost:3000/scene/${this.state.sceneChange}`
    const res = await fetch(url)
    const data = await res.json()
    this.setState({scene: data})
  }

  onSceneChange = async (option) => {
    this.setState({sceneChange: option}, async () => {
      const url = `http://localhost:3000/scene/${this.state.sceneChange}`
      const res = await fetch(url)
      const data = await res.json()
      this.setState({scene: data})
    })
  }

  onSkipProgress = async (playerName) => {
    const url = `http://localhost:3000/user/${playerName}`
    const res = await fetch(url)
    const data = await res.json()
    this.onSceneChange(data.progress)
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesparam} />
        <Player 
          currentScene={this.state.sceneChange}
          onSkipProgress={this.onSkipProgress}
        />
        <Adventure 
          sceneDescription={this.state.scene.description}
          firstOptionDescription={this.state.scene.options[0].description}
          firstOptionName={this.state.scene.options[0].optionName}
          secondOptionDescription={this.state.scene.options[1].description}
          secondOptionName={this.state.scene.options[1].optionName}
          onSceneChange={this.onSceneChange}
        />
      </div>
    )
  }
}

export default App;
