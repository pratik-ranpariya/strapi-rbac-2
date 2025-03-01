import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, Typography, Box, Card } from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import LoaderComponent from '../components/LoaderComponent';
const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the article ID from the URL
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/submissions2/contributers/articles/${id}`);
        if (!response.ok) throw new Error('Failed to fetch article');
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <LoaderComponent />;
  }

  if (!article) {
    return <Typography>No article found.</Typography>;
  }

  return (
    <Box padding={6}>
      <Box
        padding={2}
        width="50%"
        backgroundColor="neutral100"
        gap={2}
        mr={5}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Typography
          variant="alpha"
          fontWeight="bold"
          cursor="pointer"
          marginRight={5}
          onClick={() => navigate('/plugins/submissions2/contributors')}
        >
          <ArrowLeft />
        </Typography>
        <Typography variant="alpha" fontWeight="bold">
          Article Details
        </Typography>
      </Box>
      <Card padding={4} shadow="medium">
        <Typography variant="alpha" fontWeight="bold" marginBottom={5}>
          {article.title}
        </Typography>
        <Typography variant="p" marginBottom={2} marginTop={5}>
          <div dangerouslySetInnerHTML={{ __html: article.description }} />
        </Typography>
        {/* <Typography variant="sigma" marginBottom={1}>
          <strong>Author:</strong> {article.author.name}
        </Typography> */}
        <Typography variant="sigma" marginBottom={1}>
          <strong>Category:</strong> {article.category.name}
        </Typography>
        <Typography variant="sigma" marginBottom={1}>
          <strong>Status:</strong> {article.submissionStatus}
        </Typography>
        <Typography variant="sigma">
          <strong>Created At:</strong> {new Date(article.createdAt).toLocaleDateString()}
        </Typography>
      </Card>
    </Box>
  );
};

export default ArticleDetails;
