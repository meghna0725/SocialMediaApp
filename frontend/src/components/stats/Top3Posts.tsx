import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { GridReadyEvent, GridApi, ColDef, ColumnApi } from "ag-grid-community";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";

const Top3Posts: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://0.0.0.0:8000/top3posts');
        setRowData(response.data.top3posts);
        console.log(response.data.top3posts);
      } catch (error) {
        console.error('Error fetching top 3 posts:', error);
      }
    };

    fetchUsers();
  }, []);

  // Column Definitions
  const columnDefs = [
    { headerName: 'Post ID', field: 'post_id' },
    { headerName: 'User ID', field: 'user_id' },
    { headerName: 'Timestamp', field: 'post_timestamp' },
    { headerName: 'Content', field: 'content' },
    { headerName: 'Likes Count', field: 'likes_count' },
    { headerName: 'Comments Count', field: 'comments_count' }
  ];

  return (
    <div>
      <div id="myGrid" style={{ height: '300px', width: '100%' }}
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

export default Top3Posts;
