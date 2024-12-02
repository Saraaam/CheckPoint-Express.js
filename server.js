const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to check if the request is during working hours (Mon-Fri, 9 AM to 5 PM)
function checkWorkingHours(req, res, next) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
    const currentHour = currentDate.getHours();

    // Working hours: Monday (1) to Friday (5), 9 AM to 5 PM
    if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
        next();
    } else {
        res.status(403).send('The site is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Use middleware to check working hours for all routes
app.use(checkWorkingHours);

// Routes for the pages
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

