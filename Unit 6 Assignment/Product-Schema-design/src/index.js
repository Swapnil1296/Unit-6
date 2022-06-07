require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRouter = require('./Routes/userRoute');
const brandRouter = require('./Routes/brandRoutes');
const productRouter = require('./Routes/productRoutes');


const Db = require('./configs/db');

const app = express();
app.use(express.json());
app.use(cors());

// router for every operation to be performed;
app.use('/api/user', userRouter);     // http://localhost:8080/api/user
app.use('/api/brand', brandRouter);
app.use('/api/products', productRouter);    //http://localhost:8080/api/products


const port = process.env.PORT || 8989;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
