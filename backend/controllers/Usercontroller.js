import User from '../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pkg from 'jsonwebtoken';
const { JsonWebTokenError } = pkg;
import dotenv from 'dotenv';
import { where } from 'sequelize';

dotenv.config();
const registeruser = async (req,res) => {
    try {
        const { name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({message:'all fiels are required'});

        }
        const existingUser = await User.findOne({where: {email}});
        if (existingUser){
            return res.status(400).json({message:'user already exist'});

        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({message:'user registered successsfully', user: { id: user.id,name: user.name,email:user.email}});

    } catch(error) {
        console.status(500).json({message:'server error'});
    }
};
 

const logginUser = async (req,res) => {
    try{
        const {email,password}=req.body;

        if(!email || !password) {
            return res.status(400).json({message:'email and password are required'});
        }
        const user=await User.findOne({where:{email}});
        if(!user) {
            return res.status(401).json({message:'invalid credentials'});

        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(401).json({message:'invalid credentials'});
        }
         
        const token = jwt.sign(
            { id:user.id,email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.status(200).json({message:'login successful',token, user: {id: user.id,name:user.name,email:user.email}});

    } catch(error) {
        console.error('login error:',error.message);
        res.status(500).json({message: 'server error'});
    }
};
export { registeruser,logginUser};
