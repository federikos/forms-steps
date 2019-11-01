import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

const Form = props => {
  const {handleSubmit, editModeData} = props;

  const [ currentData, setCurrentData ] = useState({
    date: '',
    km: '',
  });

  useEffect(() => {
    if (Object.keys(editModeData).length) {
      setCurrentData({
        date: editModeData.date,
        km: editModeData.km,
      })
    }
  }, [editModeData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCurrentData(prevData => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }
  
  return (
    <form className="form" onSubmit={(e) => handleSubmit(e, currentData)}>
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
};

export default Form;