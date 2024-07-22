import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper } from '@mui/material';

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
  const [isChanged, setIsChanged] = useState(false);
  const saveTimeout = useRef(null);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/employees');
      setData(response.data);
      setOriginalData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to save changes
  const saveData = async () => {
    try {
      const updatedData = [...data];
      console.log('Saving data:', updatedData);
      await axios.patch('http://localhost:8080/api/employees/batch', updatedData);
      setOriginalData(updatedData);
      setIsChanged(false);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Function to save new row
  const saveNewRow = async () => {
    try {
      console.log('Saving new row:', newRow);
      await axios.post('http://localhost:8080/api/employees', newRow);
      setNewRow({ name: '', address: '', city: '', religion: '', age: '' }); // Reset new row
      fetchData(); // Refresh data after adding new row
      console.log('New row saved successfully!');
    } catch (error) {
      console.error('Error saving new row:', error);
    }
  };

  const handleChange = (e, rowIndex, columnId) => {
    const newData = [...data];
    newData[rowIndex][columnId] = e.target.value;
    setData(newData);
    setIsChanged(true);
    console.log('Data changed:', newData);

    // Clear the existing timeout if there is one
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    // Set a new timeout to save the data after 5 seconds of inactivity
    saveTimeout.current = setTimeout(() => {
      saveData();
    }, 5000);
  };

  const handleNewRowChange = (e, columnId) => {
    setNewRow({
      ...newRow,
      [columnId]: e.target.value
    });
    console.log('New row changed:', { ...newRow, [columnId]: e.target.value });

    // Clear the existing timeout if there is one
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    // Set a new timeout to save the new row after 5 seconds of inactivity
    saveTimeout.current = setTimeout(() => {
      saveNewRow();
    }, 5000);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/${id}`);
      fetchData(); // Refresh data after delete
      console.log('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
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
                    color="secondary"
                    onClick={() => handleDelete(row.id)}
                    size="small"
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
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveNewRow}
                  size="small"
                >
                  Save
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataTable;
