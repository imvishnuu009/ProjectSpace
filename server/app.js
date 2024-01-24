const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const passportLocalMongoose = require('passport-local-mongoose');
const Project = require('./models/projectSchema');
const User = require('./models/userSchema');
const app = express();
const bcrypt = require('bcrypt')
const path = require('path');
// import mime from 'mime';



const port = process.env.PORT || 3001;

app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// Connect to  MongoDB Altas using Mongoose
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;
const secretKey = process.env.SECRET_KEY;


mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB Atlas database connection established successfully');
});

connection.on('error', (err) => {
  console.error('Error connecting to MongoDB Atlas:', err);
});
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 100 MB (adjust as needed)
    },
});
// passport.use(User.createStrategy());

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser())
// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const tokenWithoutBearer = token.slice(7); // Remove 'Bearer ' from the token
    jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
        if (err) {
            if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: 'Invalid token' });
            } else if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            } else {
                return res.status(403).json({ error: 'Forbidden' });
            }
        }

        req.user = user;
        next();
    });
}
app.get('/getprofile/:userId',async(req,res)=>{
    try{
    const Userid= req.params.userId;
    const user = await User.findOne(Userid);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Send the user data (excluding sensitive information like password)
    res.json({
        Name: user.Name,
        Email: user.Email,
        univName: user.univName,
        username: user.username,
        // Exclude password for security reasons
    });
} catch (error) {
    console.error('Error fetching user data', error);
    res.status(500).json({ error: 'Internal server error' });
}
})

// Add this route to get user profile data
app.get('/getUserProfile', verifyToken, async (req, res) => {
    try {
        // Assuming req.user contains the user information from the token
        const user = await User.findOne({ username: req.user.username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send the user data (excluding sensitive information like password)
        res.json({
            Name: user.Name,
            Email: user.Email,
            univName: user.univName,
            username: user.username,
            // Exclude password for security reasons
        });
    } catch (error) {
        console.error('Error fetching user data', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get("/protected", verifyToken, (req, res) => {
    res.json({ message: "This route is protected!" });
});

// Registration
// Registration
app.post('/register', async (req, res) => {
    try {
        const { Name, Email, univName, username, password } = req.body;

        // Check if the username already exists in the database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // If the username is not present, create a new user
        const user = new User({ Name, Email, univName, username, password: hashedPassword });
        await user.save();

        const token = user.generateAuthToken();
        res.json({ message: 'User registered successfully!', username, token });
    } catch (error) {
        console.error('Error in registration', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Login
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });

        res.json({ message: 'Login successful', username, token });
    } catch (error) {
        console.error('Error in login', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Logout route
// In your Express server
const invalidatedTokens = [];

app.get('/logout', verifyToken, (req, res) => {
    const token = req.headers['authorization'];

    // Check if the token is already invalidated
    if (invalidatedTokens.includes(token)) {
        return res.status(401).json({ error: 'Token already invalidated' });
    }

    // Add the token to the blacklist
    invalidatedTokens.push(token);

    // You can perform additional actions here if needed

    res.json({ message: 'Logout successful' });
});


app.post('/projectUpload', upload.single('file'), verifyToken, async (req, res) => {
    try {
        // Extract user information from the token
        const user = await User.findOne({ username: req.user.username });

        const {
            title,
            description,
            tags,
        } = req.body;

        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const project = new Project({
            title,
            description,
            universityname: user.univName,
            author: user.username,
            uploadDate: new Date(),
            tags,
            email: user.Email,
            files: [{
                filename: file.originalname,
                mimetype: file.mimetype,
                size: file.size,  // Use file.size to get the size of the file
                data: file.buffer.toString('base64'),
            }],
        });

        await project.save();
        res.json({ message: 'The Project is saved' });
    } catch (error) {
        console.error('Error in project upload', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get("/search", async (req, res) => {
    try {
      const { searchQuery } = req.query; // Get the search query from the request
  
      // Perform the search using your database and search logic
      const results = await searchProjectsAndAccounts(searchQuery);
  
      res.json(results); // Send the results back as JSON
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving search results');
    }
  });
// Example using Mongoose for a MongoDB database
async function searchProjectsAndAccounts(searchQuery) {
    // Construct MongoDB queries for projects and accounts, using appropriate operators
    const projectResults = await Project.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { tags: { $in: [searchQuery] } }
      ]
    });
  
    const accountResults = await User.find({
      username: { $regex: searchQuery, $options: 'i' }
    });
  
    // Combine and format results as needed
    return [...projectResults, ...accountResults]; // Combine arrays
  }
    
app.get("/getprojects", verifyToken, async (req, res) => {
    try {
        // Retrieve the username from the verified token
        const username = req.user.username;
        // Find projects based on the username, with optional sorting and filtering
        const projects = await Project.find({ author: username })
            .sort({ uploadDate: -1 }) // Sort by upload date in descending order
            .select({ title: 1, description: 1, uploadDate: 1, tags: 1 }); // Select specific fields

        res.json(projects);
    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({ message: "Failed to retrieve projects" });
    }
});
app.get(`/getproject/:projectId`, async (req, res) => {
    const projectId = req.params.projectId;
    try {
        // 1. Retrieve project details from the database
        const project = await Project.findById(projectId); // Assuming a Mongoose model named 'Project'

        // 2. Validate project existence
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        // 4. Send project details as a response
        res.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




app.post('/projectUpdate/:projectId', verifyToken, async (req, res) => {
    const updateFields = {
        title: 'New title',
        description: 'Updated description',
        tags: ['new tag1', 'new tag2'],
        uploadDate: Date.now(),
        files: [{
            filename: 'UpdatedFileName',
            mimetype: 'UpdatedMimeType',
            size: Buffer.length,
            data: Buffer.from('UpdatedData'),
        }],
    };

    try {
        const projectId = req.params.projectId;
        const projectUpdate = req.body;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        Object.assign(project, projectUpdate);
        await project.save();
        res.status(201).json({ message: 'Project is updated successfully' });
    } catch (error) {
        console.error('Error in project update', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

Project.schema.pre('remove', async function (next) {
    const filesToDelete = this.files || [];

    for (const file of filesToDelete) {
        const filePath = file.filePath;
        try {
            await fs.unlink(filePath);
            console.log(`File ${file.filename} deleted successfully`);
        } catch (error) {
            console.error(`Error deleting file ${file.filename}:`, error);
        }
    }

    next();
});

app.delete("/projectDelete/:projectId", async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(401).json({ error: "Project not found" });
        }

        await project.deleteOne();
        res.status(201).json({ message: "Project deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.error("Problem!", error);
    }
});
app.get("/downloadProject/:projectId", async (req, res) => {
    try {
        const projectId = req.params.projectId;

        // Validate projectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({ error: "Invalid project ID" });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        const fileName = project.files[0].filename;
        console.log(project.files[0].filename)
        const fileBuffer = Buffer.from(project.files, 'base64');
        const mimeType = mime.getType(filePath); // Get MIME type
        res.setHeader('Content-Type', mimeType);
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.send(fileBuffer);

    } catch (error) {
        console.error("Error in download route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.get("/", (req, res) => {
    res.status(201).send("Hi, I'm working");

});