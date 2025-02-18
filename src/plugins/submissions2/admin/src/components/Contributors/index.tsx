import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, Typography, Flex, Box } from '@strapi/design-system';
import { Upload, Cross, Trash, Plus } from '@strapi/icons';
import { useNavigate } from 'react-router-dom';
import TooltipIconButton from '../TooltipIconButton';
import { LinkButton } from '@strapi/design-system';
import LoaderComponent from '../LoaderComponent';
import { Loader } from '@strapi/design-system';

interface Article {
  id: number;
  title: string;
  description: string;
  author: { name: string };
  category: { name: string };
  status: 'published' | 'draft' | 'pending';
  createdAt: string;
  submissionStatus?: 'draft' | 'submitted' | 'pending_approval' | 'approved' | 'rejected';
}

type LoadingAction = {
  id: number | null;
  type: 'submit' | 'delete' | null;
};

const ContributorsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<LoadingAction>({ id: null, type: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const articles = await fetch('/submissions2/contributers/allArticles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await articles.json();

      setArticles(data);
      setLoading(false);
    };
    fetchArticles();
  }, []);

  const getStatusColor = (status: Article['status'] | Article['submissionStatus']) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'success600';
      case 'draft':
        return 'warning600';
      case 'rejected':
        return 'danger600';
      case 'approved':
        return 'success600';
      default:
        return 'neutral600';
    }
  };

  const handleSubmit = async (id: number) => {
    try {
      setActionLoading({ id, type: 'submit' });
      const token = sessionStorage.getItem('jwtToken');
      const response = await fetch(`/submissions2/contributers/articles/update/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionStatus: 'submitted',
        }),
      });

      if (!response.ok) throw new Error('Failed to create article');

      navigate('/plugins/submissions2/contributors');
    } catch (error) {
      alert('Error creating article');
      console.error('Error creating article:', error);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const handleCancel = (id: number) => {
    console.log('Cancel article:', id);
  };

  const handleDelete = async (id: number) => {
    try {
      setActionLoading({ id, type: 'delete' });
      console.log('Delete article:', id);
    } catch (error) {
      alert('Error deleting article');
      console.error('Error deleting article:', error);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const renderActionButtons = (article: Article) => {
    switch (article?.submissionStatus?.toLowerCase()) {
      case 'draft':
        return (
          <Flex gap={2}>
            <TooltipIconButton
              onClick={() => handleSubmit(article.id)}
              disabled={actionLoading.id === article.id}
              label="Submit"
              variant="success"
            >
              {actionLoading.id === article.id && actionLoading.type === 'submit' ? 
                <Loader /> : <Upload />
              }
            </TooltipIconButton>
            <TooltipIconButton
              onClick={() => handleDelete(article.id)}
              disabled={actionLoading.id === article.id}
              label="Delete"
              variant="danger"
            >
              {actionLoading.id === article.id && actionLoading.type === 'delete' ? 
                <Loader /> : <Trash />
              }
            </TooltipIconButton>
          </Flex>
        );
      case 'submitted':
        return (
          <Flex gap={2}>
            <TooltipIconButton
              onClick={() => handleCancel(article.id)}
              label="Cancel"
              variant="danger"
            >
              <Cross />
            </TooltipIconButton>
          </Flex>
        );
      case 'approved':
        return (
          <Flex gap={2}>
            <TooltipIconButton
              onClick={() => handleDelete(article.id)}
              label="Delete"
              variant="danger"
            >
              <Trash />
            </TooltipIconButton>
          </Flex>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" padding={6} maxWidth="100%">
        <Typography variant="alpha" fontWeight="bold">
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

      <Box padding={6} background="neutral100">
  {loading ? (
    <LoaderComponent />
  ) : (
    <Box 
      style={{
        width: '100%',
        maxWidth: '1350px',
        maxHeight: '500px',
        overflowY: 'auto',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        margin: '0 auto',
        display: 'block'
      }}
    >
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
              <Typography variant="sigma">Submission Status</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Created At</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Actions</Typography>
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
                <Typography textColor="neutral800">{article.author.name}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{article.category.name}</Typography>
              </Td>
              <Td>
                <Typography
                  textColor={getStatusColor(article?.submissionStatus)}
                  fontWeight="bold"
                  style={{
                    textTransform: 'capitalize',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    backgroundColor: `${getStatusColor(article?.submissionStatus)}`,
                    border: `1px solid ${getStatusColor(article?.submissionStatus)}`,
                  }}
                >
                  {article?.submissionStatus}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
              </Td>
              <Td>
                <Flex gap={2}>{renderActionButtons(article)}</Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )}
</Box>
    </>
  );
};

export default ContributorsPage;
