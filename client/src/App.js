import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      selectedFile: ''
    }
  }
  onSubmit = (e) => {
    e.preventDefault()

    const { description, selectedFile } = this.state
    
    const formData = new FormData()

    formData.append('description', description)
    formData.append('selectedFile', selectedFile)

    axios.post('/api/upload', formData)
      .then((result) => {
        console.log(result.data)
      })
  }

  onChange = (e) => {
    const state = this.state

    switch (e.target.name) {
      case 'selectedFile':
        state.selectedFile = e.target.files[0]
        break
      default:
        state[e.target.name] = e.target.value
    }

    this.setState(state)
  }

  render() {
    const { description } = this.state
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          name='description'
          value={description}
          onChange={this.onChange}
        />
        <input
          type='file'
          name='selectedFile'
          onChange={this.onChange}
        />
        <button type='submit'>Upload</button>
      </form>
    );
  }
}

export default App;
