import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Edit as EditIcon, Delete as DeleteIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../firebase';

export default function AdminDashboard() {
  const [tabIndex, setTabIndex] = useState(0);
  const [rows, setRows] = useState({ payments: [], cartItems: [], orders: [] });
  const [loading, setLoading] = useState(false);
  const [editDialog, setEditDialog] = useState({
    open: false,
    collection: '',
    rowData: null,
    tempData: {},
  });

  const theme = useTheme();
  const auth = getAuth();

  // Fetch all collections
  const fetchAll = async () => {
    setLoading(true);
    const [pSnap, cSnap, oSnap] = await Promise.all([
      getDocs(collection(db, 'payments')),
      getDocs(collection(db, 'cartItems')),
      getDocs(collection(db, 'orders')),
    ]);

    setRows({
      payments: pSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      cartItems: cSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      orders: oSnap.docs.map(d => ({ id: d.id, ...d.data() })),
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (col, id) => {
    await deleteDoc(doc(db, col, id));
    fetchAll();
  };

  const openEdit = (col, row) => {
    setEditDialog({ open: true, collection: col, rowData: row, tempData: row });
  };

  const closeEdit = () => setEditDialog({ ...editDialog, open: false });

  const saveEdit = async () => {
    const { collection: col, rowData, tempData } = editDialog;
    const docRef = doc(db, col, rowData.id);
    await updateDoc(docRef, tempData);
    closeEdit();
    fetchAll();
  };

  // Define columns for each type
  const columnDefs = {
    payments: [
      { field: 'email', headerName: 'Email', flex: 1, editable: false },
      { field: 'fullName', headerName: 'Full Name', flex: 1, editable: false },
      {
        field: 'total',
        headerName: 'Total',
        flex: 0.5,
        type: 'number',
      },
      {
        field: 'paymentMethod',
        headerName: 'Method',
        width: 150,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        renderCell: params => (
          <>
            <IconButton onClick={() => openEdit('payments', params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete('payments', params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
        width: 120,
      },
    ],
    cartItems: [
      { field: 'name', headerName: 'Item', flex: 1 },
      {
        field: 'quantity',
        headerName: 'Qty',
        type: 'number',
        width: 80,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        renderCell: params => (
          <>
            <IconButton onClick={() => openEdit('cartItems', params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete('cartItems', params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
        width: 120,
      },
    ],
    orders: [
      { field: 'email', headerName: 'Email', flex: 1 },
      { field: 'total', headerName: 'Total', type: 'number', width: 120 },
      {
        field: 'actions',
        headerName: 'Actions',
        renderCell: params => (
          <>
            <IconButton onClick={() => openEdit('orders', params.row)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete('orders', params.row.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        ),
        width: 120,
      },
    ],
  };

  const currentKey = ['payments', 'cartItems', 'orders'][tabIndex];
  const currentRows = rows[currentKey] || [];

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4" color="pink">Admin Dashboard</Typography>
        <Button startIcon={<LogoutIcon />} color="error" variant="outlined" onClick={() => signOut(auth)}>Logout</Button>
      </Box>

      <AppBar position="static" color="default">
        <Tabs value={tabIndex} onChange={(e, v) => setTabIndex(v)} indicatorColor="secondary">
          <Tab label="Payments" />
          <Tab label="Cart Items" />
          <Tab label="Confirmed Orders" />
        </Tabs>
      </AppBar>

      <Box mt={2} height={400}>
        <DataGrid
          rows={currentRows}
          columns={columnDefs[currentKey]}
          loading={loading}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
        />
      </Box>

      <Dialog open={editDialog.open} onClose={closeEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit {editDialog.collection}</DialogTitle>
        <DialogContent>
          {Object.entries(editDialog.tempData || {}).map(([key, value]) => {
            if (['id', 'userId', 'cart'].includes(key)) return null;
            return (
              <TextField
                key={key}
                margin="dense"
                label={key}
                fullWidth
                value={value}
                onChange={e => setEditDialog({
                  ...editDialog,
                  tempData: { ...editDialog.tempData, [key]: e.target.value },
                })}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit}>Cancel</Button>
          <Button onClick={saveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
