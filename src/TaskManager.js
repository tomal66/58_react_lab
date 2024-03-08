import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, List, ListItem, ListItemText, IconButton, Box } from '@mui/material';


function TaskManager() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', id: null });

  const handleClickOpen = () => {
    setCurrentTask({ title: '', description: '', id: null }); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (currentTask.id === null) {
      // Add a new task
      setTasks([...tasks, { ...currentTask, id: Math.random() }]);
    } else {
      // Update an existing task
      setTasks(tasks.map(task => (task.id === currentTask.id ? currentTask : task)));
    }
    setOpen(false);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setOpen(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Task
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentTask.id ? 'Edit Task' : 'New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={currentTask.title}
            onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={currentTask.description}
            onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
      <List>
        {tasks.map((task) => (
          <ListItem
            sx={{ mb: 2, boxShadow: 3, p: 2, borderRadius: '4px', position: 'relative', backgroundColor: 'background.paper' }}
            key={task.id}
            secondaryAction={
                <Box>
                <Button variant="contained" color="primary" onClick={() => handleEdit(task)} sx={{ mr: 1 }}>
                    Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(task.id)} sx={{ mr: 1 }}>
                    Delete
                </Button>
              </Box>
            }
          >
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TaskManager;
