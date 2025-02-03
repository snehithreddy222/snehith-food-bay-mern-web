import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://snehithreddy022:katkuri222@cluster0.dqm2noq.mongodb.net/food-del').then(() => console.log("DB Connected"));
}