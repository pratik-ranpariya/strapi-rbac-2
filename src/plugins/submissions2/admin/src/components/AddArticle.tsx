import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
  Button,
  TextInput,
  Textarea,
  Box,
  Typography,
  SingleSelect,
  SingleSelectOption,
  Flex,
} from '@strapi/design-system';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormBox = styled(Box)`
  background: white;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(33, 33, 52, 0.1);
  padding: 24px;
`;

const FieldLabel = styled(Typography)`
  color: #32324d;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 8px;
`;

const FieldHint = styled(Typography)`
  color: #666687;
  font-size: 0.75rem;
  margin-top: 4px;
`;

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const [authorsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/users', { method: 'GET', headers }),
          fetch('/api/categories', { method: 'GET', headers }),
        ]);

        setAuthors(await authorsResponse.json());
        setCategories(await categoriesResponse.json());
      } catch (error) {
        console.error('Error fetching authors or categories:', error);
      }
    };

    fetchAuthorsAndCategories();
  }, []);

  const getLoggedInUser = () => {
    const token = sessionStorage.getItem('jwtToken');
    return token ? jwtDecode(token) : null;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    isDraft = false
  ) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem('jwtToken');
      const response = await fetch('/submissions2/editors/articles/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          author,
          category,
          submissionStatus: isDraft ? 'draft' : 'pending',
        }),
      });

      if (!response.ok) throw new Error('Failed to create article');
      navigate('/contributors');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  useEffect(() => {
    const user = getLoggedInUser();
    if (user) console.log('Logged in user:', user);
  }, []);

  return (
    <Box padding={8} background="neutral100">
      <Typography variant="alpha" fontWeight="bold" marginBottom={10}>
        Add New Article
      </Typography>
      <FormBox>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box marginBottom={4} marginTop={5}>
            <FieldLabel>Title</FieldLabel>
            <TextInput
              placeholder="Enter the title of your article"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
            />
            <FieldHint>A clear and descriptive title for your article</FieldHint>
          </Box>
          <Box marginBottom={4}>
            <FieldLabel>Description</FieldLabel>
            <Textarea
              placeholder="Write a detailed description of your article"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              required
              style={{ minHeight: '120px' }}
            />
            <FieldHint>Provide a comprehensive description of your article's content</FieldHint>
          </Box>
          <Box marginBottom={4}>
            <FieldLabel>Author</FieldLabel>
            <SingleSelect
              placeholder="Choose an author"
              value={author}
              onChange={(value: string) => setAuthor(value)}
              required
            >
              <SingleSelectOption value="" disabled>
                Select an Author
              </SingleSelectOption>
              {authors && authors.length > 0 ? (
                authors.map((author: any) => (
                  <SingleSelectOption key={author.id} value={author.id}>
                    {author.name}
                  </SingleSelectOption>
                ))
              ) : (
                <SingleSelectOption value="" disabled>
                  No authors found
                </SingleSelectOption>
              )}
            </SingleSelect>
            <FieldHint>Select the author of this article</FieldHint>
          </Box>
          <Box marginBottom={4}>
            <FieldLabel>Category</FieldLabel>
            <SingleSelect
              placeholder="Choose a category"
              value={category}
              onChange={(value: string) => setCategory(value)}
              required
            >
              <SingleSelectOption value="" disabled>
                Select a Category
              </SingleSelectOption>
              {categories && categories.length > 0 ? (
                categories.map((category: any) => (
                  <SingleSelectOption key={category.id} value={category.id}>
                    {category.name}
                  </SingleSelectOption>
                ))
              ) : (
                <SingleSelectOption value="" disabled>
                  No categories found
                </SingleSelectOption>
              )}
            </SingleSelect>
            <FieldHint>Select the most appropriate category for your article</FieldHint>
          </Box>
          <Flex gap={4} justifyContent="flex-end" paddingTop={4}>
            <Button
              type="button"
              variant="secondary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, true)}
            >
              Save as Draft
            </Button>
            <Button 
              type="submit" 
              variant="success"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </FormBox>
    </Box>
  );
};

export default AddArticle;
