import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Styles from './TodoItem.module.css';
import { Time } from '../../services/constants';

export default class TodoItem extends Component {
  static propTypes = {
    timer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      time: PropTypes.number.isRequired,
      timerStart: PropTypes.number.isRequired,
    }).isRequired,
    onClickDelete: PropTypes.func.isRequired,
    onClickActive: PropTypes.func.isRequired,
  };

  state = {
    time: '',
    intervalId: null,
  };

  componentDidMount() {
    const { timer } = this.props;
    if (timer.active === true) {
      this.startTimer();
    } else {
      this.setState({ time: timer.time });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { timer } = this.props;
    const { intervalId } = this.state;
    if (prevProps.timer.active !== timer.active) {
      if (timer.active && intervalId === null) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    }
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  stopTimer = () => {
    const { intervalId } = this.state;
    clearInterval(intervalId);
    this.setState({ intervalId: null });
  };

  startTimer = () => {
    const { timer } = this.props;
    const update = () => {
      const time = Date.now() - timer.timerStart + timer.time;
      this.setState({ time });
    };
    const interval = setInterval(update, 1000);
    this.setState({ intervalId: interval });
  };

  timerTransform = () => {
    const { time } = this.state;
    const result = new Time();
    return result.getTime(time);
  };

  onActive = () => {
    const { time } = this.state;
    const { timer, onClickActive } = this.props;
    onClickActive({ ...timer, time });
  };

  onDelete = e => {
    const { onClickDelete } = this.props;
    onClickDelete(e.currentTarget.id);
  };

  render() {
    const { timer } = this.props;
    return (
      <li className={Styles.item}>
        <div className={Styles['item-wrap']}>
          <span className={Styles['item-name']}>{timer.name}:</span>
          <span className={Styles['item-time']}>{this.timerTransform()}</span>
          <button
            className={Styles.button}
            type="button"
            onClick={this.onActive}
            id={timer.id}
          >
            {timer.active ? (
              <>
                <i className="material-icons">pause_circle_outline</i>
              </>
            ) : (
              <>
                <i className="material-icons">play_circle_outline</i>
              </>
            )}
          </button>
          <button
            className={Styles.button}
            type="button"
            onClick={this.onDelete}
            id={timer.id}
          >
            <i className="material-icons">remove_circle_outline</i>
          </button>
        </div>
      </li>
    );
  }
}
