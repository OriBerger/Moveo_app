import { Router } from 'express';
import {
    createCodeBlock,
    getCodeBlock,
    getCodeBlocks,
    updateCodeBlock
} from '../controller/codeBlockController';

const router = Router();
// Route to get all code blocks
router.get('/codeblocks', (req, res) => getCodeBlocks(req, res));

// Route to get a single code block by ID
router.get('/codeblocks/:id', (req, res) => getCodeBlock(req, res));

// Route to create a new code block
router.post('/codeblocks', (req, res) => createCodeBlock(req, res));

// Route to update a code block by ID
router.put('/codeblocks/:id', (req, res) => updateCodeBlock(req, res));

export default router;
