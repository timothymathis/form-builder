import React from 'react';
import {
  Navbar,
  NavbarBrand
} from 'reactstrap';

export default ({title}) => {
  return (
    <Navbar light color="light" fixed="top">
      <NavbarBrand>{title}</NavbarBrand>
    </Navbar>
  );
};
