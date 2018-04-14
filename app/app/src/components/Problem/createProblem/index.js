import React from 'react';

class CreateProblem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      tags: []
    };
  }

  titleHandler = (event) => {
    this.setState({title: event.target.value});
  }

  descriptionHandler = (event) => {
    this.setState({description: event.target.value});
  }

  handleCreate = (e) => {
    console.log(e)
  }

  render () {
    return (
      <div className="dp-form">
        <input
          className="dp-input"
          value={this.state.title}
          onChange={this.titleHandler}
          placeholder="Give your problem a title"
        />
        <input
          className="dp-input"
          value={this.state.description}
          onChange={this.descriptionHandler}
          placeholder="Give your problem a description"
        />
        <button
          className="dp-button is-primary"
          onClick={this.handleCreate}
        >Create
        </button>
      </div>
    )
  }
};

export default CreateProblem;

