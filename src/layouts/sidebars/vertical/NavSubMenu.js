import React, { useEffect } from 'react';
import { Collapse, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const NavSubMenu = ({ icon, title, items, isUrl, suffixColor, suffix }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = React.useState(true);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (isUrl) {
      setCollapsed(!collapsed);
    }
  }, [location.pathname]);

  // Sort items by path length (longer paths first) to avoid multiple active links
  const sortedItems = [...items].sort((a, b) => b.sort_order - a.sort_order);

  return (
    <NavItem>
      <NavLink className="cursor-pointer gap-3" onClick={toggle}>
        <span className="sidebarIcon">{icon}</span>
        <span className="hide-mini w-100">
          <div className="d-flex align-items-center">
            <span className="d-block">{title}</span>
            <span className="ms-auto">
              <span className={`badge me-2 ${suffixColor}`}>{suffix}</span>
              <i className={`bi fs-8 ${collapsed ? 'bi-chevron-down' : 'bi-chevron-right'}`} />
            </span>
          </div>
        </span>
      </NavLink>

      <Collapse isOpen={collapsed} navbar tag="ul" className="subMenu">
        {sortedItems.map((item) => {
          // Determine active link while preventing multiple highlights
          const isActive =
            location.pathname.startsWith(item.internal_link) &&
            !sortedItems.some(
              (other) =>
                other.internal_link !== item.internal_link &&
                location.pathname.startsWith(other.internal_link) &&
                other.internal_link.length > item.internal_link.length
            );

          return (
            <NavItem key={item.section_title} className={`hide-mini ${isActive ? 'activeLink' : ''}`}>
              <NavLink tag={Link} to={item.internal_link} className="gap-3">
                <span className="sidebarIcon">{item.icon}</span>
                <span className="hide-mini">
                  <span>{item.section_title}</span>
                </span>
              </NavLink>
            </NavItem>
          );
        })}
      </Collapse>
    </NavItem>
  );
};

NavSubMenu.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  icon: PropTypes.node,
  isUrl: PropTypes.bool,
  suffix: PropTypes.any,
  suffixColor: PropTypes.string,
};

export default NavSubMenu;
