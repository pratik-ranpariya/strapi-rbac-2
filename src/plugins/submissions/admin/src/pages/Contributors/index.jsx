import React from "react";
import { BaseHeaderLayout, ContentLayout } from "@strapi/design-system";

const Contributors = () => {
  return (
    <div style={{ padding: "8px" }}>
      <BaseHeaderLayout
        title="Contributors"
        subtitle="Manage your contributors"
        as="h2"
      />
      <ContentLayout>
        <p>Contributors page content will go here</p>
      </ContentLayout>
    </div>
  );
};

export default Contributors;
