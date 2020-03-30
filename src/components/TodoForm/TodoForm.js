import React, { Component } from "react";
import PropTypes from "prop-types";
import shortid from "shortid";
import Styles from "./TodoForm.module.css";
import TodoLogo from "../TodoLogo/TodoLogo";
import Information from "../Information/Information";
import { errorHandler } from "../../services/constants";

const styleIcon = {
  fontSize: "90px"
};
const styleText = {
  fontSize: "28px"
};

const INITIAL_STATE = {
  name: "",
  error: {
    name: null
  }
};
export default class TodoForm extends Component {
  static propTypes = {
    addTimers: PropTypes.func.isRequired
  };

  state = {
    ...INITIAL_STATE
  };

  id = shortid.generate();

  handleChange = e => {
    const { error } = this.state;
    this.setState({
      [e.target.name]: e.target.value,
      error: errorHandler(e.target, error)
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const { addTimers } = this.props;
    if (name.length < 3) {
      return;
    }
    addTimers({
      name,
      active: true,
      id: shortid.generate(),
      time: 0,
      timerStart: Date.now()
    });
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, error } = this.state;
    return (
      <section className={Styles.section__contact}>
        <TodoLogo
          styleIcon={styleIcon}
          icon="timer"
          styleText={styleText}
          text="Todo list timer"
        />
        <form onSubmit={this.handleSubmit} className={Styles.form__contact}>
          <label htmlFor={this.id} className={Styles.form__title}>
            Name
            <span className={Styles.input__Wrap}>
              <input
                id={this.id}
                className={Styles.form__input}
                autoComplete="off"
                onChange={this.handleChange}
                value={name}
                name="name"
                type="text"
                placeholder="Input timer name"
              />
              {!!error.name && (
                <Information>Min length three symbol.</Information>
              )}
            </span>
          </label>

          <button type="submit" className={Styles.button}>
            <i className="material-icons">add_circle_outline</i>
          </button>
        </form>
      </section>
    );
  }
}
