import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Styles from './TodoList.module.css';
import TodoItem from '../TodoItem/TodoItem';
import slide from '../../transition/slide.module.css';

const TodoList = ({ timers, onClickDelete, onClickActive }) => {
  // console.table(timers);
  return (
    <TransitionGroup component="ul" className={Styles.list}>
      {timers.map(timer => (
        <CSSTransition
          key={timer.id}
          timeout={250}
          unmountOnExit
          classNames={slide}
        >
          <TodoItem
            timer={timer}
            onClickDelete={onClickDelete}
            onClickActive={onClickActive}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
TodoList.propTypes = {
  timers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClickDelete: PropTypes.func.isRequired,
  onClickActive: PropTypes.func.isRequired,
};
export default TodoList;
