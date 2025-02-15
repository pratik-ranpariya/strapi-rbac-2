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
} from '@strapi/design-system';
import { Upload, Cross, Trash, ArrowDown } from '@strapi/icons';
import { useNavigate } from 'react-router-dom';
import * as Tooltip from '@radix-ui/react-tooltip';
import TooltipIconButton from '../TooltipIconButton';

const ContributorsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/submissions2/editors/allArticles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }

        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

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

  const handleSubmit = (id: string) => {
    console.log('Submit article:', id);
  };

  const handleCancel = (id: string) => {
    console.log('Cancel article:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Delete article:', id);
  };

  const renderActionButtons = (article: any) => {
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
        <Button variant="primary" onClick={() => navigate('/plugins/submissions2/add-article')}>
          Add Article
        </Button>
      </Flex>

      <Box padding={8} background="neutral100">
        {loading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Table colCount={5} rowCount={articles.length}>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Title</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Author</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Categories</Typography>
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
              {articles.map((article: any) => (
                <Tr key={article.id}>
                  <Td>
                    <Typography textColor="neutral800">{article.id}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{article.title}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{article.author?.name}</Typography>
                  </Td>
                  <Td>
                    <Typography textColor="neutral800">{article.category?.name}</Typography>
                  </Td>
                  <Td>
                    <Badge variant={getStatusColor(article.submissionStatus)}>
                      {article.submissionStatus || 'Draft'}
                    </Badge>
                  </Td>
                  <Td>
                    <Flex gap={2}>
                      <TooltipIconButton
                        variant="success"
                        disabled={false}
                        onClick={() => handleDelete(article.id)}
                        label={'Submit'}
                        showBorder={true}
                      >
                        <Upload />
                      </TooltipIconButton>

                      <TooltipIconButton
                        variant="danger"
                        disabled={false}
                        onClick={() => handleDelete(article.id)}
                        label={'Submit'}
                        showBorder={true}
                      >
                        <Cross />
                      </TooltipIconButton>
                      <TooltipIconButton
                        variant="danger"
                        disabled={false}
                        onClick={() => handleDelete(article.id)}
                        label={'Trash'}
                        showBorder={true}
                      >
                        <Trash />
                      </TooltipIconButton>
                    </Flex>
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
