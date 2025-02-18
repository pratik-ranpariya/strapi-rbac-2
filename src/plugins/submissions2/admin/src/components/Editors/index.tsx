import { Box, Typography, Table, Thead, Tbody, Tr, Td, Th, Flex } from '@strapi/design-system';
import { Check, Cross, Loader, More } from '@strapi/icons';
import { Button } from '@strapi/design-system';
import TooltipIconButton from '../TooltipIconButton';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoaderComponent from '../LoaderComponent';

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  author: { name: string };
  category: { name: string };
  status: 'published' | 'draft' | 'pending';
  createdAt: string;
  submissionStatus: 'draft' | 'submitted' | 'pending_approval' | 'approved' | 'rejected';
}

const EditorsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    setLoading(true);
    const articles = await fetch('/submissions2/editors/articles', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await articles.json();

    setArticles(data);
    setLoading(false);
  };
  useEffect(() => {
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

  const truncateText = (text: string, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleApprove = async (id: number) => {
    try {
      const response = await fetch(`/submissions2/editors/articles/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // approvedBy: 'Editor',
          approvalComments: 'Approved by Editor',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve article');
      }

      const data = await response.json();
      console.log('Approved article:', data);

      // Fetch all articles after approval
      await fetchArticles(); // Assuming you have a function to fetch all articles

      // Navigate to the Editors page
      navigate('/plugins/submissions2/editors'); // Adjust the path as necessary
    } catch (error) {
      console.error('Error approving article:', error);
      // Optionally, you can show a notification or alert to the user
    }
  };

  const handleReject = (id: number) => {
    console.log('Rejected article:', id);
  };

  const renderActionButtons = (article: any) => {
    if (article.submissionStatus === 'submitted') {
      return (
        <Flex gap={2}>
          <TooltipIconButton
            onClick={() => handleApprove(article.id)}
            label="Approve"
            variant="success"
          >
            <Check />
          </TooltipIconButton>

          <TooltipIconButton
            onClick={() => handleReject(article.id)}
            label="Reject"
            variant="danger"
          >
            <Cross />
          </TooltipIconButton>
        </Flex>
      );
    }
    return null;
  };

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
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
                      <Button disabled variant={getStatusColor(article?.submissionStatus)}>
                        {article.submissionStatus}
                      </Button>
                    </Td>
                    <Td>{renderActionButtons(article)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </>
  );
};

export default EditorsPage;
