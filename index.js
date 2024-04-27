const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const {registerUser, loginUser} = require('./controllers/auth')
require('dotenv').config();
const {dashBoardData} = require('./controllers/dashboard')
const {getUserData, getUserSocials} = require('./controllers/getUserData')
const {saveSocials, saveProfile, saveLinks} = require('./controllers/saveItems')
const {loadSocials, loadLinks} = require('./controllers/loadPrevious')

mongoose.set('strictQuery',false);

app.use(cors());
app.use(express.json());



mongoose.connect("mongodb+srv://linktree:linktree@cluster0.jruzmgu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log(`mongoBD Connebted`);
})
.catch(err=>{
console.log(err.message);
})

app.get('/', (req,res)=>{
    res.send("hello");
})



app.post('/api/register', registerUser)
app.post('/api/login', loginUser)

app.post('/data/dashboard', dashBoardData)

app.get('/get/:handle', getUserData)

// app.get('/get/socials/:handle', getUserSocials)

app.post("/save/socials", saveSocials);
app.post("/save/profile", saveProfile);
app.post("/save/links", saveLinks);
app.post("/load/socials", loadSocials);
app.post("/load/links", loadLinks);



const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})

