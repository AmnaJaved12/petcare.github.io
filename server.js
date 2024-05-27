const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Caretips = require('./models/petModel');
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public')) 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://amnajaved132001:rDvz7FWXpEqDAPDQ@bolly-hit-db.lpmj3kf.mongodb.net/petcare')
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        // Define routes if something added in CRUD /data can be run to see the updated data
        // Route to fetch data
        app.get('/data', async (req, res) => {
            try {
                const data = await Caretips.find({});
                console.log('Retrieved data:', data);
                res.json(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Error fetching data');
            }
        });

        // Route to fetch titles
        app.get('/titles', async (req, res) => {
            try {
                // Fetch only the 'Title' field from the 'caretips' collection
                const data = await Caretips.find({}, 'Title');
                console.log('Retrieved data:', data);
                res.json(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Error fetching data');
            }
        });
        // Route to get multiple column from database
        app.get('/descriptions', async (req, res) => {
            try {
                // Fetch 'Title' and 'Description' fields from the 'caretips' collection
                const data = await Caretips.find({}, 'Title Description');
                console.log('Retrieved data:', data);
                res.json(data);
            } catch (err) {
                console.error('Error fetching data:', err);
                res.status(500).send('Error fetching data');
            }
        });
        // CODING for CRUD operations starts here
         // Create a new caretip
         app.post('/caretips', async (req, res) => {
            const caretip = new Caretips(req.body);
            try {
            await caretip.save();
            res.status(201).send(caretip);
            } catch (err) {
            res.status(400).send(err);
            }
        });
        
        // Get all caretips
        app.get('/caretips', async (req, res) => {
            try {
            const caretips = await Caretips.find();
            res.status(200).send(caretips);
            } catch (err) {
            res.status(500).send(err);
            }
        });
        
        // Get a caretip by ID
        app.get('/caretips/:id', async (req, res) => {
            try {
            const caretip = await Caretips.findById(req.params.id);
            if (!caretip) {
                return res.status(404).send();
            }
            res.status(200).send(caretip);
            } catch (err) {
            res.status(500).send(err);
            }
        });
        
        // Update a caretip by ID
        app.patch('/caretips/:id', async (req, res) => {
            try {
            const caretip = await Caretips.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!caretip) {
                return res.status(404).send();
            }
            res.status(200).send(caretip);
            } catch (err) {
            res.status(400).send(err);
            }
        });
        
        // Delete a caretip by ID
        app.delete('/caretips/:id', async (req, res) => {
            try {
            const caretip = await Caretips.findByIdAndDelete(req.params.id);
            if (!caretip) {
                return res.status(404).send();
            }
            res.status(200).send(caretip);
            } catch (err) {
            res.status(500).send(err);
            }
        });
          

                
//Page rendering routes
        //To Execute the website run node server in terminal and then in browser type this "http://localhost:5000/homepage"
        app.get("/caretype", (req, res) => {
            res.render('Caretype'); 
        });
        app.get("/about", (req, res)=>{
            res.render(`About`)
        });
        app.get("/homepage", (req, res)=>{
            res.render(`homepage`)
        });
        app.get("/contactus", (req, res)=>{
            res.render(`ContactUs`)
        });
        app.get("/faq", (req, res)=>{
            res.render(`FAQ`)
        });
        app.get("/description", (req, res)=>{
            res.render(`Description`)
        });
        app.get("/crud", (req, res)=>{
            res.render(`Crud`)
        });
        


        // Start the server
        app.listen(5000, () => {
            console.log("Server is running on 5000");
        });
    })
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
