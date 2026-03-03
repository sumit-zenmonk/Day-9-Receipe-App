"use client"

import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReciepeListComp from '@/component/dashboard-comp/receipe-list/page';
import FavoriteListComp from '@/component/dashboard-comp/favorite-list/page';

export default function PermanentDrawer() {
  const [activeTab, setActiveTab] = useState<string>('My-Reciepe');

  const renderContent = () => {
    switch (activeTab) {
      case 'Favorite-List': return <FavoriteListComp />;
      default: return <ReciepeListComp />;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
      >
        <List>
          {
            [
              { text: "Favorite-List", icon: <FavoriteIcon /> },
              { text: "My-Reciepe", icon: <FavoriteIcon /> }
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  onClick={() => setActiveTab(item.text)}
                  selected={activeTab === item.text}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Drawer>

      <Box component="main">
        {renderContent()}
      </Box>
    </Box>
  );
}
