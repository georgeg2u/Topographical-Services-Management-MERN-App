import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link } from '@mui/material';
//
import { StyledNavItem } from './styles';

// ----------------------------------------------------------------------

export const NavItem = forwardRef(
  ({ item, isExternalLink, ...other }, ref) => {
    const { title, path} = item;

    const renderContent = (
      <StyledNavItem
        ref={ref}
        disableRipple
        {...other}
      >
        {title}
      </StyledNavItem>
    );

    // ExternalLink
    if (isExternalLink) {
      return (
        <Link href={path} target="_blank" rel="noopener" color="inherit" underline="none">
          {renderContent}
        </Link>
      );
    }

    // Default
    return (
      <Link component={RouterLink} to={path} color="inherit" underline="none">
        {renderContent}
      </Link>
    );
  }
);

NavItem.propTypes = {
  active: PropTypes.bool,
  isExternalLink: PropTypes.bool,
  item: PropTypes.object,
  open: PropTypes.bool,
  subItem: PropTypes.bool,
};
