const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${PORT}`);
        console.log('Database connected');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
});
