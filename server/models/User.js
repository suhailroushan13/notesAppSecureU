import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 40
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
    },
    password: {
        type: String,
        required: true
    }
});

const userModel = mongoose.model("User", userSchema, "users");

// Note Schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        maxlength: 50
    },
    created: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

noteSchema.index({ owner: 1, title: 1 }, { unique: true });

const noteModel = mongoose.model("Note", noteSchema, "notes");

export { userModel, noteModel };
