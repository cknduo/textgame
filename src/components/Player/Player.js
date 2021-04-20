import React, {Component} from 'react'
import Modal from 'react-modal'
import './Player.css'

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(23, 23, 23, 0.6)'
    },
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        padding: '1rem'
    }
}

Modal.setAppElement(document.getElementById('root'))

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            showModal: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.handleSaveProgress = this.handleSaveProgress.bind(this)
    }

    openModal() {
      this.setState({showModal: true});
    }
  
    closeModal() {
      this.setState({showModal: false});
    }

    handleChange(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        let user = {
            "name": this.state.name
        }
        fetch('http://localhost:3000/user/create', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    handleSaveProgress(event) {
        let user = {
            "name": this.state.name,
            "progress": this.props.currentScene
        }
        fetch('http://localhost:3000/user/update', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }
    
    render() {
        return (
            <div className='player'>
                <div className='player-control'>
                    <button className='player-option player-option-1' onClick={this.openModal}>Enter Player</button>

                    <Modal
                        isOpen={this.state.showModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                    >
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>Enter your name:
                                <br />
                                <input type='text' placeholder='Name' onChange={this.handleChange}/>
                            </label>
                            <input type='submit' value='Save' />
                        </form>
                    </div>
                    <button className='close-modal' onClick={this.closeModal}>CLOSE</button>    
                    </Modal>
                    
                    <button className='player-option player-option-2' onClick={this.handleSaveProgress}>Save current progress</button>
                </div>
                
                <div className='playing-as'>
                    { this.state.name === ''
                    ? `You are playing as Guest.`
                    : `Welcome to the adventure, ${this.state.name}.`
                    }
                </div>

            </div>
        )
    }
}

export default Player