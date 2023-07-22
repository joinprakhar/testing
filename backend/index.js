const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const UserModel = require('./model/user');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://test:test@cluster1.c4qdavl.mongodb.net/?retryWrites=true&w=majority')
        console.log(`database connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

connectDB()



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('file'), (req, res) => {
    UserModel.create({ image: req.file.filename })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})

app.get('/getimage', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use('/uploads', express.static('/var/data/uploads'));
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    );
} else {
    const __dirname = path.resolve();
    app.use('/Images', express.static(path.join(__dirname, '/public/Images')))
    //app.use(express.static('public'))
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}


app.listen(3001, (req, res) => {
    console.log('server listening on 3001')
});



