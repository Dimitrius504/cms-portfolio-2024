import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "You must provide a first name"],
        maxlength: [25, "Your name cannot exceed 25 characters"]
    },
    lastName: {
        type: String,
        required: [true, "You must provide a last name"],
        maxlength: [25, "Your last name cannot exceed 25 characters"]
    },
    nickname: {
        type: String,
        required: [true, "You must provide a nickname"],
        maxlength: [25, "Your nickname cannot exceed 25 characters"]
    },
    email: {
        type: String,
        required: [true, "Must be a valid email"],
        unique: true,
        maxlength: [75, "Your email cannot exceed 75 characters"],
        match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
    },
    image: {
        type: String,
        required: false,
    },
    actions: {
        type: Array,
        required: false,
        default: [],
    },
    companyInfo: {
        companyName: {
            type: String,
            required: [true, "Company name is required"],
            maxlength: [100, "Company name cannot exceed 100 characters"]
        },
        companyAddress: {
            type: String,
            required: false,
            maxlength: [255, "Company address cannot exceed 255 characters"]
        }
    },
    contactInfo: {
        phoneNumber: {
            type: String,
            required: false,
            match: [/^\+?[\d\s]{3,}$/, "Please enter a valid phone number"]
        }
    },
    adminRequested: {
        type: String,
        required: true,
        enum: ["NO", "AWAITING", "CONFIRMED"],
        default: "AWAITING"
    }
}, {
    timestamps: true,
});

adminSchema.plugin(passportLocalMongoose, {
    usernameField: "email",
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
