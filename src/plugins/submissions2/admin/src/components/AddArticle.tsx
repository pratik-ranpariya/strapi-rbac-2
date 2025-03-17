'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  TextInput,
  Box,
  Typography,
  SingleSelect,
  SingleSelectOption,
  Flex,
  Loader,
} from '@strapi/design-system';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for the editor
import { Drag } from '@strapi/icons';
import { Editor } from '@tinymce/tinymce-react';
import MyEditor from './MyEditor/MyEditor';

// import MyEditor from './MyEditor/MyEditor';

const FormBox = styled(Box)`
  background: ${({ theme }) => theme.colors.neutral100};
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

const StyledButton = styled(Button)`
  min-width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditorWrapper = styled(Box)`
  position: relative;
  min-height: 200px;
  resize: vertical;
  overflow: hidden;
`;

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  cursor: ns-resize;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutral400};

  &:hover {
    color: ${({ theme }) => theme.colors.neutral600};
  }
`;

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(
    '<p>This is the initial content of the editor.</p>'
  );
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contributorUsers, setContributorUsers] = useState([]);
  const [editorUsers, setEditorUsers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [editorHeight, setEditorHeight] = useState(200);

  const [token, setToken] = useState(sessionStorage.getItem('jwtToken'));
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    const startY = e.pageY;
    const startHeight = editorHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.pageY - startY;
      const newHeight = Math.max(200, startHeight + deltaY); // Minimum height of 200px
      setEditorHeight(newHeight);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const fetchAuthorsAndCategories = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const [authorsResponse, categoriesResponse, contributorUsersResponse, editorUsersResponse] =
          await Promise.all([
            fetch('/submissions2/authors', { method: 'GET', headers }),
            fetch('/submissions2/categories', { method: 'GET', headers }),
            fetch('/submissions2/contributor-users', { method: 'GET', headers }),
            fetch('/submissions2/editor-users', { method: 'GET', headers }),
          ]);

        setAuthors(await authorsResponse.json());
        setCategories(await categoriesResponse.json());
        setContributorUsers(await contributorUsersResponse.json());
        setEditorUsers(await editorUsersResponse.json());
      } catch (error) {
        console.error('Error fetching authors or categories:', error);
      }
    };

    fetchAuthorsAndCategories();
  }, []);

  console.log('contributorUsers', contributorUsers);
  console.log('editorUsers', editorUsers);
  console.log('description', description);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    isDraft = false
  ) => {
    e.preventDefault();

    try {
      if (isDraft) {
        setIsSavingDraft(true);
      } else {
        setIsSubmitting(true);
      }

      const token = sessionStorage.getItem('jwtToken');
      const response = await fetch('/submissions2/contributers/articles/submit', {
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
          submissionStatus: isDraft ? 'draft' : 'submitted',
        }),
      });

      if (!response.ok) throw new Error('Failed to create article');
      navigate('/plugins/submissions2/contributors');
    } catch (error) {
      alert('Error creating article');
      console.error('Error creating article:', error);
    } finally {
      setIsSavingDraft(false);
      setIsSubmitting(false);
    }
  };

  // Define toolbar and init variables
  const editorToolbar =
    'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help';

  const editorInit = {
    height: 500,
    menubar: false,
    plugins: [
      'advlist',
      'autolink',
      'lists',
      'link',
      'image',
      'charmap',
      'preview',
      'anchor',
      'searchreplace',
      'visualblocks',
      'code',
      'fullscreen',
      'insertdatetime',
      'media',
      'table',
      'code',
      'help',
      'wordcount',
    ],
    toolbar: editorToolbar,
    content_style:
      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; direction: ltr; }',
  };

  return (
    <Box padding={8} background="neutral100">
      <Typography variant="alpha" fontWeight="bold" marginBottom={10}>
        Add New Article
      </Typography>
      {/* <MyEditor /> */}
      <FormBox background="neutral100">
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
            {/* <Editor
              apiKey="n15ae8d2re2q2wq4zlssiym24dwkwil12srmdq7c3e4nr073"
              initialValue={description}
              onEditorChange={(content) => setDescription(content)}
              init={editorInit}
            /> */}
            <MyEditor description={description} setDescription={setDescription} />
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
            <StyledButton
              type="button"
              variant="secondary"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e, true)}
              disabled={isSavingDraft || isSubmitting}
            >
              {isSavingDraft ? <Loader small /> : 'Save as Draft'}
            </StyledButton>
            <StyledButton type="submit" variant="success" disabled={isSavingDraft || isSubmitting}>
              {isSubmitting ? <Loader small /> : 'Submit'}
            </StyledButton>
          </Flex>
        </form>
      </FormBox>
    </Box>
  );
};

const styles = `
  .ql-editor {
    min-height: 150px;
    height: calc(100% - 42px) !important;
    overflow-y: auto;
  }

  .ql-container {
    height: calc(100% - 42px) !important;
  }

  .quill {
    height: 100%;
  }
`;

export default AddArticle;
