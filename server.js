const express = require('express');
const cors = require('cors');
const app = express();
const product = require('./routers/productRouter');


app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.listen(3000, () => {'Server is running on port 3000'
    console.log('Server is running on port 3000');
});

app.use("/api", product);


app.get('/', (req, res) => {
    res.send('Hello World Văn Thành');
});

app.get('/hello', (req, res) => {
    res.send('Hello Thànhành');
})