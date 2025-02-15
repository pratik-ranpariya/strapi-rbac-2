import {
  Box,
  Typography,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Flex,
  IconButton,
} from '@strapi/design-system';
import { Check, Cross, More } from '@strapi/icons';
import { Button } from '@strapi/design-system';

const EditorsPage = () => {
  // Static data
  const articles = [
    {
      id: 1,
      title: 'Getting Started with Strapi',
      description:
        'Learn how to build a blog using Strapi as your headless CMS. This comprehensive guide will walk you through the basics.',
      slug: 'getting-started-with-strapi',
      status: 'Submitted',
    },
    {
      id: 2,
      title: 'Advanced Strapi Techniques',
      description:
        'Dive deep into advanced Strapi features including custom controllers, policies, and middleware configurations.',
      slug: 'advanced-strapi-techniques',
      status: 'Approved',
    },
    {
      id: 3,
      title: 'Building E-commerce with Strapi',
      description:
        'A complete guide to building an e-commerce platform using Strapi as the backend service.',
      slug: 'building-ecommerce-with-strapi',
      status: 'Rejected',
    },
    {
      id: 4,
      title: 'Strapi Authentication Guide',
      description:
        'Understanding authentication methods in Strapi including JWT, OAuth, and custom providers.',
      slug: 'strapi-authentication-guide',
      status: 'Submitted',
    },
    {
      id: 5,
      title: 'Content Modeling Best Practices',
      description:
        'Learn the best practices for modeling your content structure in Strapi for optimal performance and scalability.',
      slug: 'content-modeling-best-practices',
      status: 'Approved',
    },
    {
      id: 6,
      title: 'Strapi Plugin Development',
      description:
        'A comprehensive guide to creating custom plugins for Strapi to extend its functionality.',
      slug: 'strapi-plugin-development',
      status: 'Submitted',
    },
    {
      id: 7,
      title: 'Media Management in Strapi',
      description:
        'Learn how to effectively manage media files, handle uploads, and configure providers in Strapi.',
      slug: 'media-management-strapi',
      status: 'Approved',
    },
    {
      id: 8,
      title: 'Strapi API Development',
      description:
        'Master the art of building robust APIs with Strapi, including custom endpoints and data manipulation.',
      slug: 'strapi-api-development',
      status: 'Rejected',
    },
    {
      id: 9,
      title: 'Strapi Deployment Strategies',
      description:
        'Explore different deployment options and best practices for hosting Strapi applications.',
      slug: 'strapi-deployment-strategies',
      status: 'Submitted',
    },
    {
      id: 10,
      title: 'Strapi Security Best Practices',
      description:
        'Essential security measures and configurations to protect your Strapi application.',
      slug: 'strapi-security-best-practices',
      status: 'Approved',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'success';
      case 'submitted':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'neutral';
    }
  };

  const truncateText = (text: string, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleApprove = (id: number) => {
    console.log('Approved article:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejected article:', id);
  };

  const renderActionButtons = (article: any) => {
    if (article.status === 'Submitted') {
      return (
        <Flex gap={2}>
          <IconButton
            onClick={() => handleApprove(article.id)}
            label="Approve"
            noBorder
            variant="success"
          >
            <Check />
          </IconButton>

          <IconButton
            onClick={() => handleReject(article.id)}
            label="Reject"
            noBorder
            variant="danger"
          >
            <Cross />
          </IconButton>
        </Flex>
      );
    }
    return null;
  };

  return (
    <>
      <Typography variant="alpha" fontWeight="bold" marginBottom={6}>
        Editors Panel
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
                  <Typography textColor="neutral800">{article.title}</Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {truncateText(article.description)}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">{article.slug}</Typography>
                </Td>
                <Td>
                  <Button disabled variant={getStatusColor(article.status)}>
                    {article.status}
                  </Button>
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

export default EditorsPage;
