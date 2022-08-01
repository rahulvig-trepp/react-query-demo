import React, { useEffect, useState } from 'react';
import './App.css';
import { Typography, Button, Box, Tab, Tabs } from '@mui/material';
import SearchAppBar from './components/SearchAppBar';
import axios from 'axios'
import { CryptoList } from './components/CryptoList';
import { Portfolio } from './components/Portfolio';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const queryClient = new QueryClient()

function App() {
  const [view, setView] = useState('list');
  const handleChange = (event: any, view: any) => {
    setView(view)
  }

  const views: any = {
    'list': <><h1>Top 100 Cryptos</h1><Portfolio/><CryptoList/></>,
    // 'portfolio': <><h1>Your Portfolio</h1>/>
  }
  
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <SearchAppBar />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={view} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Watchlist"  value={'list'}/>
              <Tab label="Portfolio" value={'portfolio'}/>
            </Tabs>
            {views[view]}
          </Box>
        </Box>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
