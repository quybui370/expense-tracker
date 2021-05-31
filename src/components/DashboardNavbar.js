import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import GitHubIcon from '@material-ui/icons/GitHub';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => (
  <AppBar
    elevation={0}
    {...rest}
  >
    <Toolbar>
      <RouterLink to="/">
        <Logo width="40px" />
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      <Hidden lgDown>
        <Tooltip title="Github repository">
          <a href="https://github.com/quybui370/expense-tracker" target="_blank" style={{color: '#fff'}}>
            <IconButton color="inherit">
              <GitHubIcon />
            </IconButton>
          </a>
        </Tooltip>
      </Hidden>
      <Hidden lgUp>
        <IconButton
          color="inherit"
          onClick={onMobileNavOpen}
        >
          <MenuIcon />
        </IconButton>
      </Hidden>
    </Toolbar>
  </AppBar>
);

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
