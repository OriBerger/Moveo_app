import { Request, Response } from 'express';
import CodeBlock from '../models/CodeBlock';

// Get all code blocks
export const getCodeBlocks = async (req: Request, res: Response): Promise<void> => {
  try {
    const codeBlocks = await CodeBlock.find();
    res.status(200).json(codeBlocks); 
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch code blocks', error: err });
  }
};

// Get a single code block by ID
export const getCodeBlock = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const codeBlock = await CodeBlock.findById(id);
    if (!codeBlock) {
      res.status(404).json({ message: 'Code block not found' });
      return;
    }
    res.status(200).json(codeBlock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch code block', error: err });
  }
};

// Create a new code block
export const createCodeBlock = async (req: Request, res: Response): Promise<void> => {
  const { title, code } = req.body;
  try {
    const newCodeBlock = new CodeBlock({ title, code });
    await newCodeBlock.save();  // <-- Saves to MongoDB
    res.status(201).json(newCodeBlock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create code block', error: err });
  }
};

// Update a code block by ID
export const updateCodeBlock = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, code } = req.body;
  try {
    const updatedCodeBlock = await CodeBlock.findByIdAndUpdate(id, { title, code }, { new: true });
    if (!updatedCodeBlock) {
      res.status(404).json({ message: 'Code block not found' });
      return;
    }
    res.status(200).json(updatedCodeBlock);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update code block', error: err });
  }
};
