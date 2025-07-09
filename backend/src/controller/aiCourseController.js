import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});


const generateGeminiResponse = async (req,res) => {
  const{prompt}=req.body;
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response.text(); 
    res.json({success:true, response})
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Gemini generation failed', error: error.message }); // ❗You forgot this!
  }
};

export default generateGeminiResponse;
