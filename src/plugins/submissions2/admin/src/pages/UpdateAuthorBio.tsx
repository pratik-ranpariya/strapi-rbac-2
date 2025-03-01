import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader, Typography, Box, Button, TextInput, Select } from '@strapi/design-system';

const UpdateAuthorBio = () => {
  const { id } = useParams<{ id: string }>(); // Get the author ID from the URL
  const [author, setAuthor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState('');
  const [users, setUsers] = useState<any[]>([]); // State for users
  const [approvedBy, setApprovedBy] = useState<string>(''); // State for approvedBy

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await fetch(`/submissions2/authors/${id}`);
        if (!response.ok) throw new Error('Failed to fetch author');
        const data = await response.json();
        setAuthor(data);
        setBio(data.bio); // Set the initial bio
        setApprovedBy(data.approvedBy ? data.approvedBy.id : ''); // Set the initial approvedBy
      } catch (error) {
        console.error('Error fetching author:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/users-permissions/users'); // Fetch users from users-permissions
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data); // Set the users state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAuthor();
    fetchUsers();
  }, [id]);

  const handleUpdateBio = async () => {
    try {
      const response = await fetch(`/submissions2/authors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio, approvedBy }), // Include approvedBy in the update
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
    <Box padding={6}>
      <Typography variant="alpha" fontWeight="bold" marginBottom={2}>
        Update Bio for {author.name}
      </Typography>
      <TextInput
        label="Bio"
        value={bio}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBio(e.target.value)}
        multiline
        rows={4}
        marginBottom={2}
      />

      <Button onClick={handleUpdateBio}>Update Bio</Button>
    </Box>
  );
};

export default UpdateAuthorBio;
