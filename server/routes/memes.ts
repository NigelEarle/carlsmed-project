import express, { Router } from 'express';
import multer from 'multer';
import {
  handleGetMemes,
  handleGetSingleMeme,
  handleCreateMeme,
  handleDeleteMeme
} from './handlers/memes';

const router: Router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.route('/')
.get(handleGetMemes)
.post(upload.single('image'), handleCreateMeme);

router.route('/:id')
.get(handleGetSingleMeme)
.delete(handleDeleteMeme);

export default router;
