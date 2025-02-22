import React, { useEffect, useState } from 'react';
import { Box, Typography, Flex } from '@strapi/design-system';
import { NavLink, useLocation } from 'react-router-dom';
import { PLUGIN_ID } from '../pluginId';
import Contributors from '../components/Contributors/index.js';
import Editors from '../components/Editors/index.js';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';

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
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('jwtToken'));

  const getLoggedInUser = () => {
    return token ? jwtDecode(token) : null;
  };

  useEffect(() => {
    const user = getLoggedInUser();
    if (user && (user as any).id) {
      setUserId((user as any).id);
    }
  }, [token]);

  useEffect(() => {
    if (userId) {
      const fetchLoggedInUser = async () => {
        try {
          const response = await fetch(`/submissions2/current-user?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          console.log('Data', data);
          setLoggedInUser(data);
        } catch (error) {
          console.error('Error fetching logged in user:', error);
        }
      };

      fetchLoggedInUser();
    }
  }, [userId, token]);

  console.log('Logged In User', loggedInUser?.role?.name);

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
            {loggedInUser?.role?.name === 'Contributor' ||
              (loggedInUser?.role?.name === 'Authenticated' && (
                <StyledNavLink
                  to={`/plugins/${PLUGIN_ID}/contributors`}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Contributors
                </StyledNavLink>
              ))}
            {loggedInUser?.role?.name === 'Editor' ||
              (loggedInUser?.role?.name === 'Authenticated' && (
                <StyledNavLink
                  to={`/plugins/${PLUGIN_ID}/editors`}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  Editors
                </StyledNavLink>
              ))}
          </Flex>
        </nav>
      </Box>

      {renderContent()}
    </Box>
  );
};

export default HomePage;
