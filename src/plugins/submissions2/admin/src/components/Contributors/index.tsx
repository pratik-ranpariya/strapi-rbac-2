import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  Flex,
  Box,
  Modal,
  Button,
} from '@strapi/design-system';
import { Upload, Cross, Trash, Plus, Pencil } from '@strapi/icons';
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
  submissionStatus?:
    | 'draft'
    | 'submitted'
    | 'canceled'
    | 'pending_approval'
    | 'approved'
    | 'rejected';
}

type LoadingAction = {
  id: number | null;
  type: 'submit' | 'delete' | 'cancel' | null;
};

const ContributorsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<LoadingAction>({ id: null, type: null });
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('jwtToken'));
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

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

  useEffect(() => {
    fetchArticles();
  }, []);

  //Method to get the color of the button based on the status of the article

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

  // Submit an article for approval

  const handleSubmit = async (id: number) => {
    try {
      setActionLoading({ id, type: 'submit' });
      // const token = sessionStorage.getItem('jwtToken');
      const response = await fetch(`/submissions2/contributers/articles/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionStatus: 'submitted',
        }),
      });

      if (!response.ok) throw new Error('Failed to create article');

      fetchArticles();
      navigate('/plugins/submissions2/contributors');
    } catch (error) {
      alert('Error creating article');
      console.error('Error creating article:', error);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  // Once submitted and is not appropved or rejected, the user can cancel the submission

  const handleCancel = async (id: number) => {
    try {
      setActionLoading({ id, type: 'cancel' });
      const response = await fetch(`/submissions2/contributers/articles/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          submissionStatus: 'canceled',
        }),
      });

      if (!response.ok) throw new Error('Failed to cancel article');

      fetchArticles();
      navigate('/plugins/submissions2/contributors');
    } catch (error) {
      alert('Error canceling article');
      console.error('Error canceling article:', error);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  //Approved articles , if user wants to delete the article, the user can delete the article

  const handleDelete = async (id: number) => {
    try {
      setActionLoading({ id, type: 'delete' });
      const response = await fetch(`/submissions2/contributers/articles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete article');
      fetchArticles();
      navigate('/plugins/submissions2/contributors');
    } catch (error) {
      alert('Error deleting article');
      console.error('Error deleting article:', error);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const handleDeleteConfirmation = (id: number) => {
    setArticleToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    console.log('articleToDelete', articleToDelete);
    setLoading(true);
    setIsModalOpen(false);
    if (articleToDelete !== null) {
      await handleDelete(articleToDelete);
      setArticleToDelete(null);
    }
    setLoading(false);
  };

  const handleEdit = async (id: number) => {
    navigate(`edit-article/${id}`);
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
              {actionLoading.id === article.id && actionLoading.type === 'submit' ? (
                <Flex justifyContent="center" alignItems="center">
                  <Loader small />
                </Flex>
              ) : (
                <Upload />
              )}
            </TooltipIconButton>
            <TooltipIconButton
              onClick={() => handleDeleteConfirmation(article.id)}
              disabled={actionLoading.id === article.id}
              label="Delete"
              variant="danger"
            >
              {actionLoading.id === article.id && actionLoading.type === 'delete' ? (
                <Loader />
              ) : (
                <Trash />
              )}
            </TooltipIconButton>
            <TooltipIconButton
              onClick={() => handleEdit(article.id)}
              disabled={actionLoading.id === article.id}
              label="Edit"
              variant="warning"
            >
              {actionLoading.id === article.id && actionLoading.type === 'delete' ? (
                <Loader />
              ) : (
                <Pencil />
              )}
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
              onClick={() => handleDeleteConfirmation(article.id)}
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
          // </Box>
        )}
      </Box>

      <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Delete Article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Typography>Are you sure you want to delete this article?</Typography>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Close>
              <Button variant="tertiary">Cancel</Button>
            </Modal.Close>
            <Button variant="danger" onClick={confirmDelete}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default ContributorsPage;
