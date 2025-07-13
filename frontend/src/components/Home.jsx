import { useEffect, useState } from "react";
import axios from "axios";
import {Card,CardMedia,CardContent,Typography,Button,Grid,Box,Dialog,DialogTitle, DialogContent, TextField, DialogActions,} from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({title: "",content: "",img_url: "",});
const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/get");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
useEffect(() => { fetchBlogs();}, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleOpen = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      img_url: blog.img_url,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateBlog = async () => {
    try {
      await axios.put(
        `http://localhost:3001/update/${selectedBlog._id}`,
        formData
      );
      fetchBlogs(); 
      handleClose();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div>
      <Box p={5}>
        <Grid container spacing={3}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} md={4} key={blog._id}>
              <Card>
                <CardMedia component="img"height="180"image={blog.img_url} alt={blog.title} sx={{objectFit:"contain"}} />
                <CardContent>
                    <Typography variant="subtitle2" color="textSecondary">
                    {blog.title }
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {blog.content}
                  </Typography>
                  <Box display="flex" gap={1} mt={2}>
                    <Button variant="contained" size="small" color="secondary" onClick={() => handleDelete(blog._id)} > DELETE</Button>
                    <Button variant="contained" size="small"sx={{ backgroundColor: "#9c27b0" }}onClick={() => handleOpen(blog)}  > UPDATE  </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Update Blog</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Title" name="title" fullWidth value={formData.title} onChange={handleChange}
          />
          <TextField margin="dense" label="Content" name="content" fullWidth multiline rows={4}  value={formData.content}  onChange={handleChange} />
          <TextField margin="dense" label="Image URL" name="img_url" fullWidth value={formData.img_url} onChange={handleChange}/>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateBlog} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;