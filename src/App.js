import React, { useState } from 'react';
import './App.css';
import shortid from 'shortid';

function westEuropeanDateToMilliseconds(dateString) {
  const arr = dateString.split('.');
  const parsableString = `${arr[1]}/${arr[0]}/${arr[2]}`;
  return new Date(parsableString).getTime();
}

function App() {
  const [ currentData, setCurrentData ] = useState({
    date: '',
    km: ''
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
          } else {
            return {...row}
          }
        })
        return shouldAddCurrentData ? [...newData, {...currentData, disabled: true, id: shortid.generate()}] : [...newData];
      } else {
        return [{...currentData, disabled: true, id: shortid.generate()}]
      }
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
        <label htmlFor='date'>Дата (ДД.ММ.ГГ)</label>
        <input id='date' name='date' type="text" value={currentData.date} onChange={handleChange}/>
        <label htmlFor='km'>Пройдено км</label>
        <input id='km' name='km' type="text" value={currentData.km} onChange={handleChange}/>
        <button type="submit" className="btn">ОК</button>
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
                        <button className="edit" onClick={e => handleSwitchEdit(e, row.id)}>edit</button>
                        <button className="delete" onClick={e => handleDelete(e, row.id)}>delete</button>
                      </td>
                    </tr>
                    )
                  })
            }
          </tbody>
        </table> 
      </form>
    </div>
  );
}

export default App;
