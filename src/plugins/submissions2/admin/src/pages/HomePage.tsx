import React from 'react';
import { Box, Typography, Flex } from '@strapi/design-system';
import { NavLink, useLocation } from 'react-router-dom';
import { PLUGIN_ID } from '../pluginId';
import Contributors from '../components/Contributors/index.js';
import Editors from '../components/Editors/index.js';
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
  padding: 5px 20px;
  font-size: 1.33rem;
  transition: all 0.2s ease;
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral600};
  border-radius: 4px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.neutral600};
  display: inline-block;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary600};
    color: ${({ theme }) => theme.colors.neutral0};
    border-color: ${({ theme }) => theme.colors.primary600};
  }

  &.active {
    background: ${({ theme }) => theme.colors.primary600};
    color: ${({ theme }) => theme.colors.neutral0};
    border-color: ${({ theme }) => theme.colors.primary600};
  }
`;

const HomePage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderContent = () => {
    if (currentPath === `/plugins/${PLUGIN_ID}/contributors`) {
      return <Contributors />;
    }
    if (currentPath === `/plugins/${PLUGIN_ID}/editors`) {
      return <Editors />;
    }
    return (
      <Box background="neutral0" padding={4} shadow="filterShadow" hasRadius>
        <Typography variant="beta">Welcome to Submissions Plugin</Typography>
        <Box paddingTop={4}>
          <Typography variant="omega">
            Use the navigation links above to manage your contributors and editors.
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box background="neutral100" padding={8}>
      <Box paddingBottom={4}>
        <Typography variant="alpha">Submissions</Typography>
      </Box>

      <Box paddingBottom={4}>
        <nav>
          <Flex gap={4}>
            <StyledNavLink
              to={`/plugins/${PLUGIN_ID}/contributors`}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Contributors
            </StyledNavLink>
            <StyledNavLink
              to={`/plugins/${PLUGIN_ID}/editors`}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              Editors
            </StyledNavLink>
          </Flex>
        </nav>
      </Box>

      {renderContent()}
    </Box>
  );
};

export default HomePage;
