import React, { useEffect, useState } from 'react';
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
  Button,
  Loader,
} from '@strapi/design-system';
import { Upload, Cross, Trash, ArrowDown, Plus } from '@strapi/icons';
import { useNavigate } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';
import TooltipIconButton from '../TooltipIconButton';
import { LinkButton } from '@strapi/design-system';
import { FormattedMessage } from 'react-intl';

interface Article {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
  status: 'published' | 'draft' | 'pending';
  createdAt: string;
  submissionStatus?: 'draft' | 'submitted' | 'approved';
}

const ContributorsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sample dummy data
  const dummyArticles: Article[] = [
    {
      id: 1,
      title: "Getting Started with Strapi",
      description: "A comprehensive guide to building your first Strapi application",
      author: "John Doe",
      category: "Tutorials",
      status: "published",
      createdAt: "2024-03-15T10:00:00.000Z",
      submissionStatus: "approved"
    },
    {
      id: 2,
      title: "Advanced Strapi Plugins",
      description: "Learn how to create custom plugins in Strapi",
      author: "Jane Smith",
      category: "Development",
      status: "draft",
      createdAt: "2024-03-14T15:30:00.000Z",
      submissionStatus: "draft"
    },
    {
      id: 3,
      title: "Content Modeling Best Practices",
      description: "Tips and tricks for effective content modeling in Strapi",
      author: "Mike Johnson",
      category: "Best Practices",
      status: "pending",
      createdAt: "2024-03-13T09:45:00.000Z",
      submissionStatus: "submitted"
    }
  ];

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setArticles(dummyArticles);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: Article['status'] | Article['submissionStatus']) => {
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

  const handleSubmit = (id: number) => {
    console.log('Submit article:', id);
  };

  const handleCancel = (id: number) => {
    console.log('Cancel article:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete article:', id);
  };

  const renderActionButtons = (article: Article) => {
    switch (article?.submissionStatus?.toLowerCase()) {
      case 'draft':
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
      case 'submitted':
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
      case 'approved':
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
      <Flex justifyContent="space-between" alignItems="center" margin={6}>
        <Typography variant="alpha" fontWeight="bold" margin={6}>
          Contributor Articles
        </Typography>
        <LinkButton
          onClick={() => navigate('/plugins/submissions2/add-article')}
          startIcon={<Plus />}
          size="S"
        >
          Add Article
        </LinkButton>
      </Flex>

      <Box padding={8} background="neutral100">
        {loading ? (
          <Flex justifyContent="center" alignItems="flex-start" padding={6}>
            <Loader>Loading content...</Loader>
          </Flex>
        ) : (
          <Table colCount={6} rowCount={articles.length}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">Title</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Description</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Author</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Category</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Status</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Created At</Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {articles.map((article: Article) => (
                <Tr key={article.id}>
                  <Td>
                    <Typography textColor="neutral800">{article.title}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {article.description.length > 50 
                        ? `${article.description.substring(0, 50)}...` 
                        : article.description}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{article.author}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{article.category}</Typography>
                  </Td>
                  <Td>
                    <Typography
                      textColor={
                        article.status === 'published' 
                          ? 'success600' 
                          : article.status === 'draft' 
                            ? 'neutral600' 
                            : 'warning600'
                      }
                      fontWeight="bold"
                    >
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </Typography>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default ContributorsPage;
