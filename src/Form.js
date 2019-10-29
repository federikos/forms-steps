import React from 'react';
import PropTypes from 'prop-types';

const Form = props => {
  const { handleSubmit, handleChange, currentData } = props;
  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor='date'>Дата (ДД.ММ.ГГ)</label>
        <input id='date' name='date' type="text" value={currentData.date} onChange={handleChange}/>
      </div>
      <div className="input-wrapper">
        <label htmlFor='km'>Пройдено км</label>
        <input id='km' name='km' type="text" value={currentData.km} onChange={handleChange}/>
      </div>
      <button type="submit" className="btn-ok">ОК</button>
    </form>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  currentData: PropTypes.shape({
    date: PropTypes.string.isRequired,
    km: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    disabled: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Form;