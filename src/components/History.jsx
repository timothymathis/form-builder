import React, { Component } from 'react';

export default class History extends Component {
  formatTimestamp = timestamp => {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(timestamp);
    return dateTime.toString();
  };
  handleUndo = () => {
    this.props.undoLatestAction();
  };
  render() {
    const { actionHistory } = this.props;
    return (
      <article>
        <h2>History</h2>
        {actionHistory.map((action, index) => (
          <section key={index}>
            <div>
              <h3>{action.type}</h3>
              <p>
                {action.type === 'CREATE' && action.changes.nextState.text}
                {action.type === 'UPDATE' && action.changes.nextState.text}
                {action.type === 'DELETE' && action.changes.prevState.text}
              </p>
            </div>
            <div>
              <p>{this.formatTimestamp(action.timestamp)}</p>
              {index === 0 && <button onClick={this.handleUndo}>Undo</button>}
            </div>
          </section>
        ))}
      </article>
    );
  }
}
