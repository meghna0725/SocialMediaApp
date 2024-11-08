import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import SearchBar from './SearchBar';
import UserTable from './UserTable';
import CommentTable from './CommentsTable';
import LikeTable from './LikeTable';
import FollowersTable from './FollowersTable';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Users" {...a11yProps(0)} />
          <Tab label="Posts" {...a11yProps(1)} />
          <Tab label="Comments" {...a11yProps(2)} />
          <Tab label="Likes" {...a11yProps(3)} />
          <Tab label="Followers" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <UserTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <p>Type in '%' to view all posts or enter a keyword to search all posts</p>
        <SearchBar />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CommentTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <LikeTable />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <FollowersTable />
      </CustomTabPanel>
    </Box>
  );
}
