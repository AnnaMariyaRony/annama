 import mongoose from "mongoose"
export const connectdb=async()=>{
mongoose
  .connect("mongodb+srv://annamariyarony:annamariyarony@cluster0.vscnt28.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0"
   
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });}
