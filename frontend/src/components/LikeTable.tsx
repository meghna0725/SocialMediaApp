import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { GridReadyEvent, GridApi, ColDef, ColumnApi } from "ag-grid-community";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const LikeTable: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/likes');
        setRowData(response.data.likes);
        console.log(response.data.likes);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Column Definitions
  const columnDefs = [
    { headerName: 'Like ID', field: 'like_id' },
    { headerName: 'User ID', field: 'user_id' },
    { headerName: 'Post ID', field: 'post_id' }
  ];

  return (
    <div>
      <div style={{ height: '500px', width: '100%' }}
      className="ag-theme-quartz"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          autoSizeStrategy={{
            type: "fitGridWidth"
          }}
          pagination={true}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          headerHeight={40}
          rowHeight={40}
          rowStyle={{ lineHeight: '40px' }}
        />
      </div>
    </div>
  );
};

export default LikeTable;
