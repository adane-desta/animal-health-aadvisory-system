
import UserQuestionModel from '../models/userQuestion.js';
const UserQuestion = {

    acceptUserQuestion: async (req, res) => {
        try {
            const { questionData } = req.body;
            const question = UserQuestionModel.acceptUserQuestion(questionData);
            res.status(200).json({question});
        }catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getUserQuestion: async (req , res) => {
       try{
          const userQuestion = await UserQuestionModel.getUserQuestion();
          res.status(200).json(userQuestion)
       }catch (error) {
         res.status(500).json({ error: "can not serve your request sorry check your browser setting or try again later /@addo" });
       }

    },

    deleteUserQuestion: async (req, res) => {

        try {

            const { question_id } = req.params;

            await  UserQuestionModel.deleteUserQuestion(question_id);
            
            res.status(200).json();
    
          }catch (error){
            res.status(500).json({error: error.message});
          }
    }
    
}
export default UserQuestion;