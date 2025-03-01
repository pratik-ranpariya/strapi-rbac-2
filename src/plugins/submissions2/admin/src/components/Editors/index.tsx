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
  Loader,
} from '@strapi/design-system';
import { Check, Cross } from '@strapi/icons';
import TooltipIconButton from '../Icons/TooltipIconButton';
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

type LoadingAction = {
  id: number | null;
  type: 'approve' | 'reject' | null;
};

const EditorsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<LoadingAction>({ id: null, type: null });
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
        return 'success600';
      case 'submitted':
        return 'warning500';
      case 'rejected':
        return 'danger600';
      default:
        return 'neutral600';
    }
  };

  const truncateText = (text: string, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleApprove = async (id: number) => {
    try {
      setActionLoading({ id, type: 'approve' });
      const response = await fetch(`/submissions2/editors/articles/${id}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approvalComments: 'Approved by Editor',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to approve article');
      }

      const data = await response.json();
      console.log('Approved article:', data);

      await fetchArticles();
      navigate('/plugins/submissions2/editors');
    } catch (error) {
      alert('Error creating article');
      console.error('Error approving article:', error);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const handleReject = async (id: number) => {
    try {
      setActionLoading({ id, type: 'reject' });
      const response = await fetch(`/submissions2/editors/articles/${id}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          approvalComments: 'Rejected by Editor',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject article');
      }

      const data = await response.json();
      console.log('Rejected article:', data);

      await fetchArticles();
      navigate('/plugins/submissions2/editors');
    } catch (error) {
      console.error('Error rejecting article:', error);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const renderActionButtons = (article: any) => {
    if (article.submissionStatus === 'submitted') {
      return (
        <Flex gap={2}>
          <TooltipIconButton
            onClick={() => handleApprove(article.id)}
            disabled={actionLoading.id === article.id}
            label="Approve"
            variant="success"
          >
            {actionLoading.id === article.id && actionLoading.type === 'approve' ? (
              <Loader small />
            ) : (
              <Check />
            )}
          </TooltipIconButton>

          <TooltipIconButton
            onClick={() => handleReject(article.id)}
            disabled={actionLoading.id === article.id}
            label="Reject"
            variant="danger"
          >
            {actionLoading.id === article.id && actionLoading.type === 'reject' ? (
              <Loader small />
            ) : (
              <Cross />
            )}
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
          <Box padding={8} background="neutral100" overflowX="auto" paddingBottom={0}>
            <Typography variant="alpha" fontWeight="bold">
              Editors Panel
            </Typography>
          </Box>
          <Box padding={8} background="neutral100" overflowX="auto">
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
                      <Typography
                        textColor={getStatusColor(article?.submissionStatus)}
                        fontWeight="bold"
                        style={{
                          textTransform: 'capitalize',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          backgroundColor: `${getStatusColor(article?.submissionStatus)}10`,
                          border: `1px solid ${getStatusColor(article?.submissionStatus)}`,
                        }}
                      >
                        {article.submissionStatus}
                      </Typography>
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
