import { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Td, Th, Typography, Flex, Box } from '@strapi/design-system';
import { Upload, Cross, Trash, Plus } from '@strapi/icons';
import { useNavigate } from 'react-router-dom';
import TooltipIconButton from '../TooltipIconButton';
import { LinkButton } from '@strapi/design-system';
import LoaderComponent from '../LoaderComponent';
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

const ContributorsPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
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
            <TooltipIconButton
              onClick={() => handleSubmit(article.id)}
              label="Submit"
              variant="success"
            >
              <Upload />
            </TooltipIconButton>
            <TooltipIconButton
              onClick={() => handleDelete(article.id)}
              label="Delete"
              variant="danger"
            >
              <Trash />
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
              {articles.length > 0 &&
                articles.map(
                  (article: Article) => (
                    console.log('article', article),
                    (
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
                            textColor={
                              article.status === 'published'
                                ? 'success600'
                                : article.status === 'draft'
                                  ? 'neutral600'
                                  : 'warning600'
                            }
                            fontWeight="bold"
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
                    )
                  )
                )}
            </Tbody>
          </Table>
        )}
      </Box>
    </>
  );
};

export default ContributorsPage;
