import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

function westEuropeanDateToMilliseconds(dateString) {
  const arr = dateString.split('.');
  const parsableString = `${arr[1]}/${arr[0]}/${arr[2]}`;
  return new Date(parsableString).getTime();
}

const Table = props => {
  const { tableData, handleDelete, handleEdit } = props;
  return (
    <table>
      <thead>
        <tr>
          <th>Дата (ДД.ММ.ГГ)</th>
          <th>Пройдено км</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {
          tableData
            .sort((a, b) => {
              return westEuropeanDateToMilliseconds(b.date) - westEuropeanDateToMilliseconds(a.date)
            })
              .map(row => {
                return(
                  <tr key={row.id}>
                    <td>
                      <p>{row.date}</p>
                    </td>
                    <td>
                      <p>{row.km}</p>
                    </td>
                    <td>
                      <button name="switch-edit" className="edit" onClick={e => handleEdit(e, row.id)} aria-label='edit'>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="delete" onClick={e => handleDelete(e, row.id)} aria-label='delete'>
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </td>
                  </tr>
                )
              })
        }
      </tbody>
    </table> 
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      km: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  ),
  handleDelete: PropTypes.func.isRequired, 
  handleEdit: PropTypes.func.isRequired,
};

export default Table;