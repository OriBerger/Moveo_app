import { Schema, model } from 'mongoose';

// Define the schema for a code block
const codeBlockSchema = new Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    code: { type: String, required: true },
  },
  { collection: 'codeblocks' }
);

// Create a model for the code block schema
const CodeBlock = model('CodeBlocks', codeBlockSchema);

export default CodeBlock;
