import {app} from "./app.js"
import 'dotenv/config'
import connectDB from "./db/connection.js"
const port = 3000
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




