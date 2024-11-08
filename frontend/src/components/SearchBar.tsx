import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { GridReadyEvent, GridApi, ColDef, ColumnApi } from "ag-grid-community";


const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [rowData, setRowData] = useState<any[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/search_posts/', {
        params: {
          keyword: query
        }
      });
      setRowData(response.data.posts);
      console.log(rowData);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  // Column Definitions
  const columnDefs = [
    { headerName: 'Post ID', field: 'post_id' },
    { headerName: 'User ID', field: 'user_id' },
    { headerName: 'Timestamp', field: 'post_timestamp' },
    { headerName: 'Content', field: 'content' },
    { headerName: 'Like Count', field: 'likes_count' },
    { headerName: 'Comment Count', field: 'comments_count' }
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Search Posts..."
        value={query}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ height: '500px', width: '100%' }}
      className="ag-theme-quartz"
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          autoSizeStrategy={{
            type: "fitGridWidth"
          }}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          pagination={true}
          headerHeight={40}
          rowHeight={40}
          rowStyle={{ lineHeight: '40px' }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
