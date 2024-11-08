import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/Users';
import UserTable from './components/UserTable';
import SearchBar from './components/SearchBar';
import Posts from './components/Posts';
import Likes from './components/Likes';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import DeleteUser from './components/DeleteUser';
import DeletePost from './components/DeletePost';
import InserttoDB from './components/InserttoDB';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BasicTabs from './components/SelectQueriesTabs';
import DeletefromDB from './components/DeletefromDB';
import UpdateDB from './components/UpdateDB';
import GetStats from './components/GetStats';


ModuleRegistry.registerModules([ClientSideRowModelModule]);


function App() {

  const [showUsers, setShowUsers] = useState(false);
  const [showPosts, setShowPosts] = useState(false);
  const [showComments, setshowComments] = useState(false);
  const [showLikes, setshowLikes] = useState(false);

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  const togglePosts = () => {
    setShowPosts(!showPosts);
  }

  const toggleComments = () => {
    setshowComments(!showComments);
  }

  const toggleLikes = () => {
    setshowLikes(!showLikes);
  }

  return (
    <div className="App">
      <h1>Social Media Management System</h1>
      <h2>View Database</h2>
        <div className='tabs'>
          <BasicTabs />
        </div>
        <div>
          <h2>Insert to Table</h2>
        </div>
          <InserttoDB />
        <div>
          <h2>Delete from Table</h2>
          <DeletefromDB />

        <div>
          <h2>Update Tables</h2>
          <UpdateDB />
        </div>
        </div>
          <h2>Get Stats</h2>
        <div>
          <GetStats />
        </div>

    </div>
  );
}

export default App;
