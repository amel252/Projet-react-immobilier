import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        avatar: {
            type: String,
            default: "https://randomuser.me/api/portraits/men/22.jpg",
        },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model("User", userSchema);
export default User;
