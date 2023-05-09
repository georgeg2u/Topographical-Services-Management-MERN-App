import PropTypes from 'prop-types';
// hooks
import useActiveLink from '../../../../../src/hooks/useActiveLink';

//
import { NavItem } from './NavItem';

// ----------------------------------------------------------------------

export default function NavList({ item }) {
  const { path } = item;
  const { active, isExternalLink } = useActiveLink(path, false);

  return (
      <NavItem
        item={item}
        active={active}
        isExternalLink={isExternalLink}
      />

  );
}

NavList.propTypes = {
  item: PropTypes.object,
};

