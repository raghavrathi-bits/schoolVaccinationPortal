import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/manageStudents', label: 'Add/Manage Students' },
    { path: '/manageDrives', label: 'Manage Drives' },
    { path: '/reports', label: 'Reports' },
  ];

  return (
    <div className="menu-section" role="navigation">
      <div className="menu-header" role="heading" aria-level="1">
        <h2>Navigate</h2>
      </div>
      <div className="menu-buttons" role="group">
        {menuItems.map(item => (
          <div
            key={item.path}
            role="button"
            className={`menu-button${location.pathname === item.path ? ' active' : ''}`}
            value={item.label}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
