import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components'; 
import Container from './Container/Container';
import Pages from './Pages/Pages';

const StyledNavLink = styled(NavLink)` 
  color: white;
  font-size:30px;
  margin-left: 30px;

  &.active {
    color: orange;
  }
`;

const App = () => {
  return (
    <div>
      <nav>
        <StyledNavLink to="/" activeClassName="active">Home</StyledNavLink>
        <StyledNavLink to="/movies" activeClassName="active">Movies</StyledNavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/pages/:id" element={<Pages />} />
      </Routes>
    </div>
  );
}

export default App;
