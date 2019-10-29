import React, { useState } from 'react';
import './App.css';
import shortid from 'shortid';
import Form from './Form';
import Table from './Table';

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
      <Form handleChange={handleChange} handleSubmit={handleSubmit} currentData={currentData} />
      <Table tableData={tableData} handleDelete={handleDelete} handleSwitchEdit={handleSwitchEdit} handleInputEdit={handleInputEdit} />
    </div>
  );
}

export default App;