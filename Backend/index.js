const Blog=require("./model")
const express = require("express");
const cors = require("cors");
const { connectdb } = require("./connection");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());

app.post("/post",async(req,res)=>{
  const{
    title,content,img_url
  }=req.body
  try{
const newBlog=new Blog({title,content,img_url});
const savedBlog=newBlog.save()
res.status(201).json({message:"Blog posted successfully"})

  }catch(error){res.status(500).json({error:error.message})}
})


app.get("/get", async (req, res) => {
  try {
    let data = await Blog.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.put("/update/:id",async(req,res)=>{
   const{
    title,content,img_url
  }=req.body
  try{const updatedBlog=await Blog.findByIdAndUpdate(req.params.id,{title,content,img_url})
res.status(200).json({message:"updated successfully"})

  }
  catch(error){
    res.status(500).json({error:error.message})
  }
})

app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    
res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
});
app.listen(PORT, () => {
  connectdb()
  console.log(`${PORT} is up and running`);
});
