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
} from '@strapi/design-system';
import { useNavigate } from 'react-router-dom';

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
      <Typography variant="alpha" fontWeight="bold" marginBottom={6}>
        Add New Article
      </Typography>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Box marginBottom={4}>
          <TextInput
            label="Title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            required
          />
        </Box>
        <Box marginBottom={4}>
          <Textarea
            label="Description"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            required
          />
        </Box>
        <Box marginBottom={4}>
          <SingleSelect
            label="Author"
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
        </Box>
        <Box marginBottom={4}>
          <SingleSelect
            label="Category"
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
        </Box>
        <Box marginTop={4}>
          <Button
            type="button"
            variant="secondary"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, true)}
          >
            Save as Draft
          </Button>
          <Button type="submit" variant="success" style={{ marginLeft: '10px' }}>
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddArticle;
