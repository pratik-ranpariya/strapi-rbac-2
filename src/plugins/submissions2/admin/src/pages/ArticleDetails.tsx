import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Box, Card, Flex, Divider, Badge } from '@strapi/design-system';
import { ArrowLeft, Pencil, Information } from '@strapi/icons';
import LoaderComponent from '../components/LoaderComponent';
import styled from 'styled-components';

const HeaderBox = styled(Box)`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.neutral100}, ${({ theme }) => theme.colors.neutral0});
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(33, 33, 52, 0.1);
  transition: all 0.2s ease;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};

  &:hover {
    box-shadow: 0 4px 8px rgba(33, 33, 52, 0.15);
  }
`;

const TitleSection = styled(Box)`
  position: relative;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary100}, ${({ theme }) => theme.colors.neutral0});
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.primary200};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.primary600}, ${({ theme }) => theme.colors.primary200});
    border-radius: 8px 8px 0 0;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutral800};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary600};
    background: ${({ theme }) => theme.colors.neutral150};
  }
`;

const MetadataItem = styled(Flex)`
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 8px;
  transition: all 0.2s ease;
  
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${({ theme }) => theme.colors.primary600};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.neutral150};
    transform: translateX(4px);
  }
`;

const StyledCard = styled(Card)`
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(33, 33, 52, 0.1);
  }
`;

const ArticleTitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 2.5rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.neutral800}, ${({ theme }) => theme.colors.primary600});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(33, 33, 52, 0.05);
`;

const PageTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin-bottom: 0.5rem;
`;

const PageSubtitle = styled(Typography)`
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 0.875rem;
`;

const SocialBar = styled(Flex)`
  margin-top: 2rem;
  padding: 1rem;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 8px;
`;

const SocialBarCompact = styled(Flex)`
  gap: 1rem;
  justify-content: flex-end;
  align-items: center;
`;

const SocialIcon = styled.div<{ $color?: string }>`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.$color || '#000'};
  color: white;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.neutral0};
  box-shadow: 0 2px 4px rgba(33, 33, 52, 0.1);
  margin-right: 1.5rem;
`;

// Social Media Icons Components
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 3a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7ZM4 11.5H9v12H4v-12Zm16 0h-4.828v2.062h.044c.673-1.273 2.307-2.062 4.784-2.062v4.062c-2.891 0-4.784 1.074-4.784 3.219V23.5H11v-12h4.828v1.969c.966-1.313 2.778-2.125 4.172-1.969Z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'draft':
      return 'secondary';
    case 'pending_approval':
      return 'warning';
    case 'approved':
      return 'success';
    case 'rejected':
      return 'danger';
    default:
      return 'neutral';
  }
};

const ArticleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/submissions2/contributers/articles/${id}?populate=author.avatar`);
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

  if (loading) return <LoaderComponent />;
  if (!article) return <Typography>No article found.</Typography>;

  return (
    <Box padding={6}>
      <HeaderBox padding={4} marginBottom={6}>
        <Flex justifyContent="flex-start" alignItems="center" gap={4}>
          <BackButton onClick={() => navigate('/plugins/submissions2/contributors')}>
            <ArrowLeft aria-hidden width="1.5rem" height="1.5rem" />
          </BackButton>
          <Box>
            <PageTitle variant="beta">Article Details</PageTitle>
            
          </Box>
        </Flex>
      </HeaderBox>

      <StyledCard padding={6} shadow="tableShadow">
        <TitleSection>
          <Flex alignItems="center">
            {article.author?.avatar?.url ? (
              <Avatar src={article.author.avatar.url} alt={article.author.name || 'Author'} />
            ) : (
              <Avatar src="https://www.gravatar.com/avatar/?d=mp" alt="Default avatar" />
            )}
            <Box>
              <ArticleTitle as="h1">
                {article.title}
              </ArticleTitle>
              <Flex gap={2}>
                <Badge size="M" variant={getStatusColor(article.submissionStatus)}>
                  {article.submissionStatus?.replace(/_/g, ' ').toUpperCase()}
                </Badge>
                <Badge size="M" variant="secondary" gap={2}>
                   <strong>Created At:</strong> {new Date(article.createdAt).toLocaleDateString()}
                </Badge>
              </Flex>
            </Box>
          </Flex>
        </TitleSection>

        <Box paddingY={6}>
          <Typography variant="omega">
            <div dangerouslySetInnerHTML={{ __html: article.description }} />
          </Typography>
        </Box>

        <Divider />

        <Box paddingTop={4}>
          <MetadataItem>
            <Pencil aria-hidden />
            <Typography variant="delta">
              <strong>Category:</strong> {article.category.name}
            </Typography>
          </MetadataItem>
          <MetadataItem>
            <Information aria-hidden />
            <Typography variant="delta">
              <strong>Status:</strong> {article.submissionStatus?.replace(/_/g, ' ')}
            </Typography>
          </MetadataItem>
        </Box>

        <SocialBar>
          <SocialIcon $color="#1877F2" aria-hidden>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon $color="#1DA1F2" aria-hidden>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon $color="#25D366" aria-hidden>
            <WhatsAppIcon />
          </SocialIcon>
          <SocialIcon $color="#0A66C2" aria-hidden>
            <LinkedInIcon />
          </SocialIcon>
          <SocialIcon $color="#FF4500" aria-hidden>
            <RedditIcon />
          </SocialIcon>
          <SocialIcon $color="#333333" aria-hidden>
            <EmailIcon />
          </SocialIcon>
        </SocialBar>
      </StyledCard>
    </Box>
  );
};

export default ArticleDetails;
