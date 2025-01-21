import React, {useEffect, useState} from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ProfileIcon = ({ direction, toggleModal ,onRouteChange, ...args}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {setDropdownOpen((prevState) => !prevState)};

  const [signout, setSignout ] = useState(false);
  const logout = () => {setSignout(true)}

  useEffect(() => {
    const performSignout = async () => {
      if (signout) {
        const token = window.sessionStorage.getItem('token');
        const response = await fetch('http://localhost:3000/signout',{
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ token })
        })
        const result = await response.json();
        if (result === 'success'){
          window.sessionStorage.removeItem('token');
          onRouteChange('signout');
        }
      }
    }
    
    performSignout()
  }, [signout, onRouteChange])

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
          <DropdownItem onClick={() => logout()}>Sign Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
     
    
  )
  
}

export default ProfileIcon