import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'nome', headerName: 'Nome', width: 130 },
  {
    field: 'idade',
    headerName: 'idade',
    type: 'text',
    width: 90,
  },
];



export default function DataGridTable(props) {

    const rows = props.rows


  return (
    <div style={{ height: 280, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={3} checkboxSelection onSelectionChange={newSelection => {
            console.log(newSelection.rowIds)

            // **** The following line breaks the page upon selection **** 
            // currentlySelected(newSelection)
          }} />
    </div>
  );
}