import React from "react";
import { Box, Typography } from "@strapi/design-system";
import { NavLink, useLocation } from "react-router-dom";
import pluginId from "../../pluginId";
import Contributors from "../Contributors";
import Editors from "../Editors";

const HomePage = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const renderContent = () => {
    if (currentPath === `/plugins/${pluginId}/contributors`) {
      return <Contributors />;
    }
    if (currentPath === `/plugins/${pluginId}/editors`) {
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
          <Box paddingBottom={2}>
            <NavLink 
              to={`/plugins/${pluginId}/contributors`} 
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                color: '#4945FF',
                textDecoration: 'none',
                marginRight: '16px',
                fontSize: '18px'
              })}
            >
              Contributors
            </NavLink>
            <NavLink 
              to={`/plugins/${pluginId}/editors`} 
              style={({ isActive }) => ({
                fontWeight: isActive ? 'bold' : 'normal',
                color: '#4945FF',
                textDecoration: 'none',
                marginRight: '16px',
                fontSize: '18px'
              })}
            >
              Editors
            </NavLink>
          </Box>
        </nav>
      </Box>

      {renderContent()}
    </Box>
  );
};

export default HomePage;
