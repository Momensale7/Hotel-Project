import React, { useEffect, useState } from 'react';
import {
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';
import LanguageSelector from '../LanguageSwithcer';
import StyledDrawer from './SidebarStyles';
import { menuItems } from '../../constants/sidebar.constant';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTranslation } from 'react-i18next';
import LockIcon from '@mui/icons-material/Lock';
import ChangePass from '../../modules/AdminModules/Authentication/ChangePass/ChangePass';
import { useAppDispatch } from '../../hooks/Hook';
import { logout } from '../../store/auth/AuthSlice';

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, toggleSidebar }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [openChange, setOpenChange] = useState(false);

 

const handleLogout = React.useCallback(() => {
    navigate('/');
    dispatch(logout());
  }, [ navigate, dispatch])

  const anchor = theme.direction === 'rtl' ? 'right' : 'left';

  return (
    <StyledDrawer variant="permanent" open={open} anchor={anchor}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          backgroundColor: theme.custom.blueMain,
          color: theme.custom.liteMain,
          px: [1],
        }}
      >
        <IconButton onClick={toggleSidebar}>
          {open ? (
            <ChevronRightIcon sx={{ color: theme.custom.liteMain }} />
          ) : (
            <ChevronLeftIcon sx={{ color: theme.custom.liteMain }} />
          )}
        </IconButton>
      </Toolbar>
      <Divider />
      <List
        sx={{
          backgroundColor: theme.custom.blueMain,
          color: theme.custom.liteMain,
        }}
      >
        {menuItems.map((item) => (
          <ListItem key={item.route} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.route}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                gap: 2,
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: 'center',
                  color: theme.custom.liteMain,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={t(item.textKey)}
                sx={{ opacity: open ? 1 : 0, textAlign: 'start' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
          <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => {
              setOpenChange(true);
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              gap: 2,
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                color: theme.custom.liteMain,
              }}
            >
              <LockIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('sidebar.change_password')}
              sx={{ opacity: open ? 1 : 0, textAlign: 'start' }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={() => {
              handleLogout();
            }}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              gap: 2,
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: 'center',
                color: theme.custom.liteMain,
              }}
            >
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText
              primary={t('common.logout')}
              sx={{ opacity: open ? 1 : 0, textAlign: 'start' }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: 40,
            bgcolor: 'action.hover',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ThemeToggle />
        </Box>
        <Box
          sx={{
            height: 40,
            bgcolor: 'action.hover',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LanguageSelector />
        </Box>
      </Box>
      <ChangePass
        open={openChange}
        setOpen={() => setOpenChange(false)}/>
    </StyledDrawer>
  );
};

export default Sidebar;
