import MenuItems from './MenuItems.jsx';

const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  const newDepthLevel = depthLevel + 1;
  const dropdownClass = newDepthLevel > 1 ? 'dropdown-submenu' : '';

  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show' : ''}`}>
      {submenus.map((submenu, index) => (
        <MenuItems item={submenu} key={index} depthLevel={newDepthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;