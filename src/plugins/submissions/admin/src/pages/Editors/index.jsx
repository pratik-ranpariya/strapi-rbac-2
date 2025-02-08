import React from "react";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system";

const Editors = () => {
  return (
    <div style={{ padding: "8px" }}>
      <BaseHeaderLayout
        title="Editors"
        subtitle="Manage your editors"
        as="h2"
      />
      <ContentLayout>
        <p>Editors page content will go here</p>
      </ContentLayout>
    </div>
  );
};

export default Editors;
