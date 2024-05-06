import { useState } from 'react';
import { Box, Container, SimpleGrid, Button, Input, useToast } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const NoteCard = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="lg" bg="white">
    <Box mb={2}>{note.text}</Box>
    <Button leftIcon={<FaEdit />} size="sm" colorScheme="blue" onClick={() => onEdit(note)}>Edit</Button>
    <Button leftIcon={<FaTrash />} size="sm" colorScheme="red" ml={2} onClick={() => onDelete(note.id)}>Delete</Button>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const toast = useToast();

  const addNote = () => {
    if (!newNote.trim()) {
      toast({
        title: 'Error',
        description: 'Note cannot be empty',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newNoteObj = { id: Date.now(), text: newNote };
    setNotes([...notes, newNoteObj]);
    setNewNote('');
    toast({
      title: 'Success',
      description: 'Note added',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: 'Deleted',
      description: 'Note has been deleted',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const editNote = (editedNote) => {
    const updatedNotes = notes.map(note => {
      if (note.id === editedNote.id) {
        return { ...note, text: editedNote.text };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <Container maxW="container.xl" p={5}>
      <Box mb={4} display="flex" alignItems="center">
        <Input placeholder="Add a new note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <Button leftIcon={<FaPlus />} ml={2} colorScheme="teal" onClick={addNote}>Add</Button>
      </Box>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {notes.map(note => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;