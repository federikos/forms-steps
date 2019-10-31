import React, { useState } from 'react';
import './App.css';
import shortid from 'shortid';
import Form from './Form';
import Table from './Table';

function App() {
  const [tableData, setTableData ] = useState([]);

  const handleSubmit = (e, currentData) => {
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
        });

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

  const handleInputChange = (e, id) => {
    e.preventDefault();
    const {value, name} = e.currentTarget;

    setTableData(prevData => {
      return prevData.map(row => {
        if(row.id === id) {
          //Если нажата кнопка-переключатель Edit, переключаем значение disabled для строки таблицы
          if (name === 'switch-edit') {
            return {...row, disabled: !row.disabled};
          }
          //Иначе устанавливаем новое значение из поля input
          return {...row, [name]: value}
        }
        //Остальные строки с другим id пропускаем
        return {...row}
      });
    })
  }

  return (
    <div className="App">
      <Form handleSubmit={handleSubmit} />
      <Table tableData={tableData} handleDelete={handleDelete} handleInputChange={handleInputChange} />
    </div>
  );
}

export default App;