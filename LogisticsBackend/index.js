const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const shipmentRoute = require('./routes/shipmentRoute');
const adminRoute = require('./routes/adminRoute');
const driverRoute = require('./routes/driverRoute');
const customerRoute = require('./routes/customerRoute');
const analyticsRoute = require('./routes/analyticsRoute')


app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/shipments', shipmentRoute)

app.use('/api/admin', adminRoute);
app.use('/api/driver', driverRoute);
app.use('/api/customer', customerRoute);

// app.use('/api/analytics', analyticsRoute);



app.get('/', (req, res) => {
    res.send('Welcome to the backend');
});

const PORT = process.env.PORT || 2501;
app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
})