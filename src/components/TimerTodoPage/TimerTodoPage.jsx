import React, { Component } from 'react';
import { TransitionGroup } from 'react-transition-group';
import TodoForm from '../TodoForm/TodoForm';
import TodoList from '../TodoList/TodoList';
import Styles from './TimerTodoPage.module.css';
import * as LS from '../../services/localStorage';
import notification from '../../services/notification';

const KEY = 'timers';
class TimerTodoPage extends Component {
  state = {
    timers: [],
  };

  componentDidMount() {
    const localTimers = LS.getWithLocalStorage(KEY);
    const newTimers = localTimers === null ? [] : localTimers;
    this.setState({ timers: newTimers });
  }

  addTimers = obj => {
    const { timers } = this.state;
    const isContactExits = timers.find(
      timer => timer.name.toLowerCase() === obj.name.toLowerCase(),
    );
    if (isContactExits) {
      notification(obj.name);
      return;
    }
    const newTimers = [obj, ...timers];
    this.setState({ timers: newTimers });
    LS.setToLocalStorage(KEY, newTimers);
  };

  onClickDelete = id => {
    const { timers } = this.state;
    const newTimers = timers.filter(timer => timer.id !== id);
    this.setState({ timers: newTimers });
    LS.setToLocalStorage(KEY, newTimers);
  };

  onClickActive = timer => {
    const { timers } = this.state;
    const newTimers = JSON.parse(JSON.stringify(timers));
    newTimers.find(e => {
      if (e.name === timer.name) {
        e.active = !e.active;
        if (e.active) {
          e.timerStart = Date.now();
        } else {
          e.time = timer.time;
        }
      }
      return false;
    });
    this.setState({ timers: newTimers });
    LS.setToLocalStorage(KEY, newTimers);
  };

  render() {
    const { timers } = this.state;
    return (
      <TransitionGroup component="section" className={Styles.section}>
        <TodoForm addTimers={this.addTimers} />
        <TodoList
          timers={timers}
          onClickDelete={this.onClickDelete}
          onClickActive={this.onClickActive}
        />
      </TransitionGroup>
    );
  }
}
export default TimerTodoPage;
