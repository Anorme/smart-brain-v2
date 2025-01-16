import React, {useState} from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ProfileIcon = ({ direction, toggleModal ,onRouteChange, ...args}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {setDropdownOpen((prevState) => !prevState)};

  return (
    <div className="pa4 tc">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={dropdownOpen}
        >
        <img
          src="https://img.icons8.com/?size=100&id=zxB19VPoVLjK&format=png&color=000000"
          className="br-100 ba h3 w3 dib" 
          alt="avatar" 
        />
        </DropdownToggle>
        <DropdownMenu
          end  
          className="b--transparent shadow-5"
          style={{marginTop: '25px', backgroundColor: 'rgba(255,255,255,0.5)'}}
          {...args}>
          <DropdownItem onClick={() => toggleModal()}>View Profile</DropdownItem>
          <DropdownItem onClick={() => onRouteChange('signout')}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
     
    
  )
  
}

export default ProfileIcon