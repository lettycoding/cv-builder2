import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import router from './Routes/userroute.js';
 

const app=express();

app.use(cors());
app.use(express.json());

app.use('/api',router);
const PORT = process.env.PORT || 5000 ;

(async () => {
    try{
        await sequelize.authenticate();
        console.log('database connected succesfully.');
        await sequelize.sync();

        app.listen(PORT,() => {
            console.log(`Server running on port ${PORT}`);

        });

    } catch (error) {
        console.error('unable to start server:',error);
    }
})();