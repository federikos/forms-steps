import React, { useState } from 'react';
import './App.css';
import shortid from 'shortid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function westEuropeanDateToMilliseconds(dateString) {
  const arr = dateString.split('.');
  const parsableString = `${arr[1]}/${arr[0]}/${arr[2]}`;
  return new Date(parsableString).getTime();
}

function App() {
  const [ currentData, setCurrentData ] = useState({
    date: '',
    km: '',
    disabled: true,
  });

  const [tableData, setTableData ] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCurrentData(prevData => {
      return {
        ...prevData,
        [name]: value,
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setTableData(prevData => {
      
      if (prevData.length) {
        let shouldAddCurrentData = true;
        const newData = prevData.map(row => {
          if (currentData.date === row.date) {
            shouldAddCurrentData = false;
            return {...row, km: parseInt(row.km) + parseInt(currentData.km)}
          }
          return {...row}
        })
        return shouldAddCurrentData ? [...newData, {...currentData, id: shortid.generate()}] : [...newData];
      }

      return [{...currentData, id: shortid.generate()}]
    })
  };

  const handleDelete = (e, id) => {
    setTableData(prevData => {
      return prevData.filter(row => row.id !== id);
    })
  }

  const handleSwitchEdit = (e, id) => {
    e.preventDefault();
    setTableData(prevData => {
      return prevData.map(row => {
        if(row.id === id) {
          return {...row, disabled: !row.disabled}
        }
        return {...row}
      });
    })
  }

  const handleInputEdit = (e, id) => {
    const {value, name} = e.target;
    setTableData(prevData => {
      return prevData.map(row => {
        if(row.id === id) {
          return {...row, [name]: value}
        }
        return {...row}
      });
    })
  }

  return (
    <div className="App">
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
      <table>
        <thead>
          <tr>
            <th>Дата (ДД.ММ.ГГ)</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          { tableData &&
            tableData
              .sort((a, b) => {
                return westEuropeanDateToMilliseconds(b.date) - westEuropeanDateToMilliseconds(a.date)
              })
                .map(row => {
                  return(
                  <tr key={row.id}>
                    <td><input name='date' value={row.date} disabled={row.disabled} onChange={e => handleInputEdit(e, row.id)}></input></td>
                    <td><input name='km' value={row.km} disabled={row.disabled} onChange={e => handleInputEdit(e, row.id)}></input></td>
                    <td>
                      <button className="edit" onClick={e => handleSwitchEdit(e, row.id)} aria-label='edit'><FontAwesomeIcon icon={faEdit} /></button>
                      <button className="delete" onClick={e => handleDelete(e, row.id)} aria-label='delete'><FontAwesomeIcon icon={faTrashAlt} /></button>
                    
              
                    </td>
                  </tr>
                  )
                })
          }
        </tbody>
      </table> 
    </div>
  );
}

export default App;