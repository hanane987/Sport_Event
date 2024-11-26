import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Register a participant
export const registerParticipant = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Ensure the email doesn't already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new participant
    const participant = new User({
      email,
      password,
      role: 'Participant',
    });

    await participant.save();

    return res.status(201).json({
      message: 'Participant registered successfully',
      user: { id: participant._id, email: participant.email, role: participant.role },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }



};
export const loginparticipant =  async(req,res)=>{

    const {email,password}=req.body;

    try{

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'not foun'});
        }

        const ismatch = await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(401).json({message:'invalid credantial'});
        }

        const token =jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'3h'}
        );

        return res.status(200).json({
            message:'login success',
            token,
            user:{id:user._id,email:user.email,role:user.role},
        }); 
    }catch(error){
        return res.status(500).json({message:'server error',message:error.message});
       
    }

};