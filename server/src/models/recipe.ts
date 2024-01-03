import { Schema, model } from "mongoose";

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    imgPath: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    steps: {
        type: [{
            title: String,
            instructions: [String],
        }],
        required: true,
    },
    notes: {
        type: [String],
        required: true,
    },
});

RecipeSchema.index({
    name: 'text',
    description: 'text',
    ingredients: 'text',
    steps: 'text',
    notes: 'text'
});

const Recipe = model('recipes', RecipeSchema);

export default Recipe;