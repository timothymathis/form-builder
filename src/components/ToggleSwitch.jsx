import React, { Component } from 'react';

export default class ToggleSwitch extends Component {
  handleChange = event => {};
  render() {
    return (
      <label>
        <input
          type="checkbox"
          checked={this.props.active}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}
