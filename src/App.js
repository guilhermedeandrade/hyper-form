import React, { Component } from 'react';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues:
        {
          name: '',
          email: '',
          password: ''
        } || {},
      shouldRenderValues: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    event.persist();
    const { name, value } = event.target;
    this.setState(({ formValues }) => ({
      formValues: {
        ...formValues,
        [name]: value
      }
    }));
  };

  handleClick = () => {
    const { shouldRenderValues } = this.state;

    this.setState({
      shouldRenderValues: !shouldRenderValues
    });
  };

  renderFields = () => {
    const { formValues } = this.state;

    return Object.entries(formValues).map(([fieldName, fieldValue]) => {
      return (
        <input
          key={fieldName}
          type="text"
          name={fieldName}
          value={fieldValue}
          placeholder={`type your ${fieldName}`}
          onChange={event => this.handleChange(event)}
        />
      );
    });
  };

  renderButton = () => {
    const { shouldRenderValues } = this.state;
    const buttonText = !shouldRenderValues ? 'submit' : 'hide';

    return (
      <button type={buttonText} onClick={this.handleClick}>
        {buttonText}
      </button>
    );
  };

  renderValues = () => {
    if (this.state.shouldRenderValues) {
      return (
        <div className="paper">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <div className="paper">
          <h1>hyper form</h1>
          {this.renderFields()}
          {this.renderButton()}
        </div>
        {this.renderValues()}
      </div>
    );
  }
}
