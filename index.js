require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config()
app.use(express.json())
app.use(cors())


const UserRouter = require("./routes/user.routes")
app.use("/api/v1", UserRouter)



const URI = process.env.DB_URI
mongoose.connect(URI)

.then(()=>{
    console.log("Connected to DB successful");
    
})
.catch((err)=>{
    console.log(err);
    console.log("Cannot connect to DB at this time!");
})




const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => {
    console.log(`Server connected to ${PORT}`);
});

server.on("error", (err) => {
    console.log("Cannot connect to server:", err.message);
});