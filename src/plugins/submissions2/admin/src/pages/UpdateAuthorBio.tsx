import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, Typography, Box, Button, TextInput, Flex } from '@strapi/design-system';
import { ArrowLeft } from '@strapi/icons';
import styled from 'styled-components';

const SocialMediaInput = styled(TextInput)`
  margin-bottom: 1rem;
`;

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

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.neutral0};
  box-shadow: 0 2px 4px rgba(33, 33, 52, 0.1);
  margin-right: 1.5rem;
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

const PageTitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin-bottom: 0.5rem;
`;

const UpdateAuthorBio = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<any>({
    name: 'John Doe',
    avatar: { url: 'https://via.placeholder.com/150' },
    email: 'johndoe@example.com',
  });
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('This is a sample bio for John Doe.');
  const [email, setEmail] = useState('johndoe@example.com');
  const [articles, setArticles] = useState<any[]>([
    { id: 1, title: 'Understanding React Hooks' },
    { id: 2, title: 'Advanced JavaScript Techniques' },
    { id: 3, title: 'Introduction to TypeScript' },
  ]);
  const [socialLinks, setSocialLinks] = useState({
    skype: 'john.doe',
    facebook: 'facebook.com/johndoe',
    twitter: 'twitter.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Commented out fetch logic for static data
    // const fetchAuthor = async () => {
    //   try {
    //     const response = await fetch(`/submissions2/authors/${id}`);
    //     if (!response.ok) throw new Error('Failed to fetch author');
    //     const data = await response.json();
    //     setAuthor(data);
    //     setBio(data.bio);
    //     setEmail(data.email);
    //     setArticles(data.articles);
    //     setSocialLinks(data.socialLinks || {});
    //   } catch (error) {
    //     console.error('Error fetching author:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchAuthor();
  }, [id]);

  const handleUpdateBio = async () => {
    try {
      const response = await fetch(`/submissions2/authors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio, email, socialLinks }),
      });

      if (!response.ok) throw new Error('Failed to update bio');
      alert('Bio updated successfully!');
    } catch (error) {
      console.error('Error updating bio:', error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!author) {
    return <Typography>No author found.</Typography>;
  }

  return (
    <Box padding={8} background="neutral100" shadow="tableShadow" hasRadius>
      <HeaderBox padding={4} marginBottom={6}>
        <Flex justifyContent="flex-start" alignItems="center" gap={4}>
          <BackButton onClick={() => navigate(-1)}>
            <ArrowLeft aria-hidden width="1.5rem" height="1.5rem" />
          </BackButton>
          <Box>
            <PageTitle variant="beta">Author Information</PageTitle>
          </Box>
        </Flex>
      </HeaderBox>
      
      <Flex alignItems="center" marginBottom={6}>
      <Avatar src="https://www.gravatar.com/avatar/?d=mp" alt="Default avatar" /> 
      <Typography variant="alpha" fontWeight="bold" marginLeft={6} fontSize="18px" style={{ textDecoration: 'underline' }}>
        {author?.name}
      </Typography>
        {/* <Avatar src={author?.avatar?.url} alt={author.name} size="L" /> */}
      </Flex>
      <Typography variant="beta" display="flex" fontWeight="bold" marginTop={3} fontSize="14px">
        Bio
      </Typography>
      <TextInput
        label="Bio"
        value={bio}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBio(e.target.value)}
        multiline
        rows={4}
        marginBottom={6}
        style={{ transition: 'border-color 0.3s', borderColor: 'lightgray', padding: '14px' }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'blue')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'lightgray')}
      />
      <Typography variant="beta"  display="flex" fontWeight="bold" marginTop={3} fontSize="14px">
        Email
      </Typography>
      <TextInput
        label="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        marginBottom={6}
        style={{ transition: 'border-color 0.3s', borderColor: 'lightgray', padding: '14px' }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'blue')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'lightgray')}
      />
      <Typography variant="beta" display="flex" fontWeight="bold" marginTop={3} fontSize="14px">
        Social Media Links
      </Typography>
      <SocialMediaInput
        label="Skype"
        value={socialLinks.skype}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, skype: e.target.value })}
        style={{ transition: 'border-color 0.3s', borderColor: 'lightgray', padding: '12px' }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'blue')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'lightgray')}
      />
      <SocialMediaInput
        label="Facebook"
        value={socialLinks.facebook}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, facebook: e.target.value })}
        style={{ transition: 'border-color 0.3s', borderColor: 'lightgray', padding: '12px' }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'blue')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'lightgray')}
      />
      <SocialMediaInput
        label="Twitter"
        value={socialLinks.twitter}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, twitter: e.target.value })}
        style={{ transition: 'border-color 0.3s', borderColor: 'lightgray', padding: '12px' }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'blue')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'lightgray')}
      />
      <SocialMediaInput
        label="LinkedIn"
        value={socialLinks.linkedin}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSocialLinks({ ...socialLinks, linkedin: e.target.value })}
        style={{ transition: 'border-color 0.3s', borderColor: 'lightgray', padding: '12px' }}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'blue')}
        onBlur={(e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = 'lightgray')}
      />
      <Button onClick={handleUpdateBio} variant="success" marginTop={6} style={{ transition: 'background-color 0.3s', padding: '12px 24px' }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = 'darkgreen')}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.backgroundColor = '')}>
        Update Bio
      </Button>
    </Box>
  );
};

export default UpdateAuthorBio;
