import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  IconButton,
  Flex,
  Badge,
  Box,
} from "@strapi/design-system";
import { Upload, Cross, Trash } from "@strapi/icons";

const ContributorsPage = () => {
  const articles = [
    {
      id: 1,
      title: "Getting Started with Strapi",
      description:
        "Learn how to build a blog using Strapi as your headless CMS. This comprehensive guide will walk you through the basics.",
      slug: "getting-started-with-strapi",
      status: "Draft",
    },
    {
      id: 2,
      title: "Advanced Strapi Techniques",
      description:
        "Dive deep into advanced Strapi features including custom controllers, policies, and middleware configurations.",
      slug: "advanced-strapi-techniques",
      status: "Submitted",
    },
    {
      id: 3,
      title: "Building E-commerce with Strapi",
      description:
        "A complete guide to building an e-commerce platform using Strapi as the backend service.",
      slug: "building-ecommerce-with-strapi",
      status: "Approved",
    },
    {
      id: 4,
      title: "Strapi Authentication Guide",
      description:
        "Understanding authentication methods in Strapi including JWT, OAuth, and custom providers.",
      slug: "strapi-authentication-guide",
      status: "Draft",
    },
    {
      id: 5,
      title: "Content Modeling Best Practices",
      description:
        "Learn the best practices for modeling your content structure in Strapi for optimal performance and scalability.",
      slug: "content-modeling-best-practices",
      status: "Submitted",
    },
    {
      id: 6,
      title: "Strapi Plugin Development",
      description:
        "A comprehensive guide to creating custom plugins for Strapi to extend its functionality.",
      slug: "strapi-plugin-development",
      status: "Approved",
    },
    {
      id: 7,
      title: "Media Management in Strapi",
      description:
        "Learn how to effectively manage media files, handle uploads, and configure providers in Strapi.",
      slug: "media-management-strapi",
      status: "Draft",
    },
    {
      id: 8,
      title: "Strapi API Development",
      description:
        "Master the art of building robust APIs with Strapi, including custom endpoints and data manipulation.",
      slug: "strapi-api-development",
      status: "Submitted",
    },
    {
      id: 9,
      title: "Strapi Deployment Strategies",
      description:
        "Explore different deployment options and best practices for hosting Strapi applications.",
      slug: "strapi-deployment-strategies",
      status: "Draft",
    },
    {
      id: 10,
      title: "Strapi Security Best Practices",
      description:
        "Essential security measures and configurations to protect your Strapi application.",
      slug: "strapi-security-best-practices",
      status: "Approved",
    },
  ];
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/plugins/submissions/getArticles",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }

        const data = await response.json();
        console.log("Articles:", data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";
      case "submitted":
        return "warning";
      case "draft":
        return "secondary";
      default:
        return "neutral";
    }
  };

  const handleSubmit = (id) => {
    console.log("Submit article:", id);
  };

  const handleCancel = (id) => {
    console.log("Cancel article:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete article:", id);
  };

  const renderActionButtons = (article) => {
    switch (article.status.toLowerCase()) {
      case "draft":
        return (
          <Flex gap={2}>
            <IconButton
              onClick={() => handleSubmit(article.id)}
              label="Submit"
              noBorder
              variant="success"
            >
              <Upload />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(article.id)}
              label="Delete"
              noBorder
              variant="danger"
            >
              <Trash />
            </IconButton>
          </Flex>
        );
      case "submitted":
        return (
          <Flex gap={2}>
            <IconButton
              onClick={() => handleCancel(article.id)}
              label="Cancel"
              noBorder
              variant="danger"
            >
              <Cross />
            </IconButton>
          </Flex>
        );
      case "approved":
        return (
          <Flex gap={2}>
            <IconButton
              onClick={() => handleDelete(article.id)}
              label="Delete"
              noBorder
              variant="danger"
            >
              <Trash />
            </IconButton>
          </Flex>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Typography variant="alpha" fontWeight="bold" marginBottom={6}>
        Contributor Article Management
      </Typography>
      <Box padding={8} background="neutral100">
        <Table colCount={6} rowCount={articles.length}>
          <Thead>
            <Tr>
              <Th>
                <Typography variant="sigma">ID</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Title</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Description</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Slug</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Status</Typography>
              </Th>
              <Th>
                <Typography variant="sigma">Actions</Typography>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {articles.map((article) => (
              <Tr key={article.id}>
                <Td>
                  <Typography textColor="neutral800">{article.id}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {article.title}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {article.description}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{article.slug}</Typography>
                </Td>
                <Td>
                  <Badge variant={getStatusColor(article.status)}>
                    {article.status}
                  </Badge>
                </Td>
                <Td>{renderActionButtons(article)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default ContributorsPage;
