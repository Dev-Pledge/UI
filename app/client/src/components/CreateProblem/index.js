/* @flow */

import React, { PureComponent } from 'react';
import { VelocityTransitionGroup } from 'velocity-react';

import styles from './styles.scss';

export default class CreateProblem extends PureComponent {
  constructor() {
    super();
    this.state = {
      withForm: false
    };
  }

  componentDidMount() {
    console.log('create problem has mounted');
  }

  showForm = () => {
    this.setState(prevState => ({
      withForm: !prevState.withForm
    }));
    console.log('this is this:', this);
  };

  renderForm = () => {
    if (this.state.withForm) {
      return (
        <div className={styles.content}>
          <input
            className={styles['dp-input']}
            placeholder="Give your problem a title"
          />
          <textarea
            className={styles['dp-input']}
            placeholder="Describe your problem"
          />
          <button className={styles['dp-btn']}>Create</button>
        </div>
      );
    }
    return '';
  };

  render() {
    return (
      <div className={styles.CreateProblem}>
        <div
          role="presentation"
          onClick={this.showForm}
          className={styles['title-bar']}
        >
          <h4>
            {this.state.withForm
              ? 'maybe later'
              : 'Its easy to create a problem - click here'}
          </h4>
        </div>
        <VelocityTransitionGroup
          enter={{ animation: 'slideDown' }}
          leave={{ animation: 'slideUp' }}
        >
          {this.renderForm()}
        </VelocityTransitionGroup>
      </div>
    );
  }
}
