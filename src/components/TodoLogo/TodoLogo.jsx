import React from 'react';
import PropTypes from 'prop-types';
import Styles from './TodoLogo.module.css';

const TodoLogo = ({ styleIcon, icon, styleText, text }) => {
  return (
    <section className={Styles.section}>
      <i className="material-icons" style={styleIcon}>
        {icon}
      </i>
      <div style={styleText}>{text}</div>
    </section>
  );
};
TodoLogo.propTypes = {
  styleIcon: PropTypes.shape({}).isRequired,
  icon: PropTypes.string.isRequired,
  styleText: PropTypes.shape({}).isRequired,
  text: PropTypes.string.isRequired,
};
export default TodoLogo;
