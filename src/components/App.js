import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import styled from 'styled-components'; 
import Container from './Container/Container';
import Pages from './Pages/Pages';
import MovieSearch from './MovieSearch/MovieSearch';

import './NavStyles.css';

const StyledNavLink = styled(NavLink)` 
  color: black;
  font-size: 30px;
  margin-left: 30px;
  text-decoration:none;

  &.active {
    color: red;
  }
`;


const App = () => {
  return (
    <div>
      <nav className="nav">
        <StyledNavLink  to="/" activeClassName="active">Home</StyledNavLink>
        <StyledNavLink to="/movies" activeClassName="active">Movies</StyledNavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="/pages/:id/*" element={<Pages />} /> 
        <Route path="/movies" element={<MovieSearch />} />
      </Routes>
    </div>
  );
}

export default App;
