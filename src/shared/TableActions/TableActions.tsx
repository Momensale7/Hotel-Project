import React, { useState, useCallback } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import ViewDataModal from '../ViewDataModal/ViewDataModal';
import { TableActionProps } from '../../Interfaces/props.interface';
import { RoomFacility } from '../../Interfaces/facilities.interface';
import { Ad } from '../../Interfaces/ads.interfaces';
import { useTranslation } from 'react-i18next';

export default function TableActions({ handleDeleteItem, item, route, handleEditItem, handleEditAd }: TableActionProps) {
  const theme = useTheme();
  const { t,i18n } = useTranslation();
  
  
  // Memoize state variables to avoid unnecessary renders
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openviewModal, setViewOpen] = useState(false);

  const open = Boolean(anchorEl);

  // Memoize functions to avoid creating new function instances on every render
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  
  const handleCloseViewModal = useCallback(() => {
    setViewOpen(false);
    handleClose();
  }, [handleClose]);

  const handleView = useCallback(() => {
    setViewOpen(true);
  }, []);

  const handleDelete = useCallback(() => {
    handleClose();
    if ('roomNumber' in item) {
      if (item.roomNumber) handleDeleteItem(item._id, item.roomNumber);
    } else if ('user' in item) {
      if (item.user && item.user.userName) handleDeleteItem(item._id, item.user.userName);
    }
    else if ('name' in item) {
      if (item.name) handleDeleteItem(item._id, item.name);
    }
  }, [handleClose, item, handleDeleteItem]);

  return (
    <>
      <Box component={'div'} className="table-actions">
        <IconButton onClick={handleClick} sx={{ color: 'inherit' }}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          sx={{ width: 200 }}
          id="table-actions-menu"
          aria-labelledby="table-actions-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                width: '174px',
                borderRadius: '20px',
                backgroundColor: theme.palette.background.paper,
                left:i18n.language === 'ar' ? '80vw' : '16px',
              },
            },
          }}
        >
          <MenuItem
            onClick={handleView}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon>
              <VisibilityIcon sx={{ color: '#203FC7' }} />
            </ListItemIcon>
            <ListItemText primary={t('tableActions.view')} />
          </MenuItem>
          {route && (
            <MenuItem
              component={Link}
              to={route}
              onClick={handleClose}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>
                <EditIcon sx={{ color: '#203FC7' }} />
              </ListItemIcon>
              <ListItemText primary={t('tableActions.edit')} />
            </MenuItem>
          )}
          {handleEditItem && (
            <MenuItem
              onClick={() => {
                handleEditItem(item as RoomFacility);
                handleClose();
              }}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>
                <EditIcon sx={{ color: '#203FC7' }} />
              </ListItemIcon>
              <ListItemText primary={t('tableActions.edit')} />
            </MenuItem>
          )}
          {handleEditAd && (
            <MenuItem
              onClick={() => {
                handleEditAd(item as Ad);
                handleClose();
              }}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>
                <EditIcon sx={{ color: '#203FC7' }} />
              </ListItemIcon>
              <ListItemText primary={t('tableActions.edit')} />
            </MenuItem>
          )}
          {'email' in item || (
            <MenuItem
              onClick={handleDelete}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemIcon>
                <DeleteIcon sx={{ color: '#203FC7' }} />
              </ListItemIcon>
              <ListItemText primary={t('tableActions.delete')} />
            </MenuItem>
          )}
        </Menu>
      </Box>
      <ViewDataModal open={openviewModal} handleClose={handleCloseViewModal} data={item} />
    </>
  );
}