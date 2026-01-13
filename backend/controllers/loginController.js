import LoginModel from '../models/loginModel.js';

const LoginController = {
    login: async (req, res) => {
        
        const { email, password, userType } = req.query;

        console.log(email);

        try {
            const user = await LoginModel.authenticateUser(email, password, userType);

            if (user) {

                res.status(200).json( 
                       { 
                        success: true , 
                        userType: user.type , 
                        fullname: user.name , 
                        email: user.email , 
                        phone: user.phone ,          
                        userId: user.type === 'FARMERS' ? user.farmer_id : user.vet_id
                        });
                
            } else {
                res.status(401).json({ success: false, message: 'incorrect email or password' });
            }

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default LoginController;
