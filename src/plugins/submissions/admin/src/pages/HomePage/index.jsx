import React from "react";
import {
  // ContentLayout,
  SubNav,
  SubNavHeader,
  SubNavSection,
  SubNavLink,
  Box,
} from "@strapi/design-system";
import { Link, useLocation } from "react-router-dom";
import pluginId from "../../pluginId";

const HomePage = () => {
  const { pathname } = useLocation();

  const links = [
    {
      id: "contributors",
      label: "Contributors",
      to: `/plugins/${pluginId}/contributors`,
    },
    {
      id: "editors",
      label: "Editors",
      to: `/plugins/${pluginId}/editors`,
    },
  ];

  return (
    <Box padding={8}>
      {/* <BaseHeaderLayout
        title="Submissions"
        subtitle="Manage your submissions"
        as="h2"
      /> */}
      {/* <ContentLayout> */}
        <SubNav ariaLabel="Submissions sub nav">
          <SubNavHeader label="Submissions" />
          <SubNavSection label="General">
            {links.map((link) => (
              <SubNavLink
                as={Link}
                key={link.id}
                to={link.to}
                active={pathname === link.to}
              >
                {link.label}
              </SubNavLink>
            ))}
          </SubNavSection>
        </SubNav>
      {/* </ContentLayout> */}
    </Box>
  );
};

HomePage.propTypes = {};

export default HomePage;
