import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [newRow, setNewRow] = useState({
    name: '',
    address: '',
    city: '',
    religion: '',
    age: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/employees')
      .then(response => {
        setData(response.data);
        setOriginalData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSave = () => {
    const updatedData = [...data, newRow];

    axios.patch('http://localhost:8080/api/employees/batch', updatedData)
      .then(response => {
        axios.get('http://localhost:8080/api/employees')
          .then(response => {
            setData(response.data);
            setOriginalData(response.data);
            setNewRow({
              name: '',
              address: '',
              city: '',
              religion: '',
              age: ''
            });
            alert('Data saved and refreshed successfully!');
          })
          .catch(error => console.error('Error fetching updated data:', error));
      })
      .catch(error => console.error('Error saving data:', error));
  };

  const handleChange = (e, rowIndex, columnId) => {
    const newData = [...data];
    newData[rowIndex][columnId] = e.target.value;
    setData(newData);
  };

  const handleNewRowChange = (e, columnId) => {
    setNewRow({
      ...newRow,
      [columnId]: e.target.value
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/employees/${id}`)
      .then(response => {
        setData(data.filter(item => item.id !== id));
        alert('Data deleted successfully!');
      })
      .catch(error => console.error('Error deleting data:', error));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleSave}>
        Savings
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Religion</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>
                  <TextField
                    value={row.name}
                    onChange={(e) => handleChange(e, rowIndex, 'name')}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.address}
                    onChange={(e) => handleChange(e, rowIndex, 'address')}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.city}
                    onChange={(e) => handleChange(e, rowIndex, 'city')}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.religion}
                    onChange={(e) => handleChange(e, rowIndex, 'religion')}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.age}
                    onChange={(e) => handleChange(e, rowIndex, 'age')}
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="number"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDelete(row.id)}
                    size="small"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>New</TableCell>
              <TableCell>
                <TextField
                  value={newRow.name}
                  onChange={(e) => handleNewRowChange(e, 'name')}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={newRow.address}
                  onChange={(e) => handleNewRowChange(e, 'address')}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={newRow.city}
                  onChange={(e) => handleNewRowChange(e, 'city')}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={newRow.religion}
                  onChange={(e) => handleNewRowChange(e, 'religion')}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={newRow.age}
                  onChange={(e) => handleNewRowChange(e, 'age')}
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="number"
                />
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
