import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';



export default function DataGridTable(props) {

const [rows, setRows] = React.useState(props.rows);
const [deletedRows, setDeletedRows] =  React.useState([]);

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'nome', headerName: 'Nome', width: 150 },
  {
    field: 'idade',
    headerName: 'idade',
    type: 'text',
    width: 70,
  },
];



    // const rows = props.rows


    React.useEffect(() => {
      setRows(props.rows)
    }, [props])
    const handleRowSelection = (e) => {
      setDeletedRows([...deletedRows, ...rows.filter((r) => r.id === e.data.id)]);
    };
    
    const handlePurge = () => {
      setRows(
        rows.filter((r) => deletedRows.filter((sr) => sr.id === r.id).length < 1)
      );
    };

  return (
    <div style={{ height: 280, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={20} checkboxSelection onSelectionChange={newSelection => {
            console.log(newSelection.rowIds)

            // **** The following line breaks the page upon selection **** 
            // currentlySelected(newSelection)
          }} />
    </div>
  );
}