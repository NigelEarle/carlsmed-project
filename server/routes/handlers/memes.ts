import express, { Request, Response } from 'express';
import prisma from '../../db/db';
import { deleteImageFromS3, shipImageBufferToS3 } from '../../helpers/aws';
import logger from '../../helpers/logger';
import { statusCodes } from '../../helpers/constants';

async function handleGetMemes(req: Request, res: Response) {
  const memes = await prisma.memes.findMany({ orderBy: {createdAt: 'asc'} });
  logger.info(`Query all products; length of products returned ${memes.length}`);
  res.status(statusCodes.OK).json(memes);
};

async function handleGetSingleMeme(req: Request, res: Response) {
  const { id } = req.params;
  const meme_id: number = parseInt(id);
  
  logger.info(`Query for meme with id: ${id}`);
  const meme = await prisma.memes.findUnique({
    where: { id: meme_id }
  });
  if (!meme) {
    logger.info(`Meme id: ${id} not found`);
    res.status(statusCodes.NOT_FOUND).json({ message: 'Meme Not Found' });
  };
  logger.info(`Meme id: ${id} found; result: ${meme}`);
  res.status(statusCodes.OK).json(meme);
}

async function handleCreateMeme(req: Request, res: Response) {
  const { name, title, description } = req.body;
  const meme_url = await shipImageBufferToS3(req.file);
  logger.info(`Meme URL saved in AWS: ${meme_url}`);

  logger.info(`Creating meme in DB; name: ${req.file?.originalname}`);
  const meme = await prisma.memes.create({
    data: {
      title,
      meme_url,
      originalImageName: req?.file?.originalname || '',
      description,
    }
  });
  logger.info(`Meme successfully created; result: ${meme}}`)
  res.status(statusCodes.CREATED).json(meme);
};

async function handleDeleteMeme(req: Request, res: Response) {
  const { id } = req.params;
  const meme_id: number = parseInt(id);
  logger.info(`Quering for meme with id: ${id}`);
  const meme = await prisma.memes.findUnique({
    where: { id: meme_id }
  });

  if (meme) {
    await deleteImageFromS3(meme);
    logger.info(`Deleting meme with id: ${id}`);
    await prisma.memes.delete({
      where: { id: meme_id }
    });
    logger.info(`Meme successfully delete: ${id}`);
    res.status(statusCodes.NO_CONTENT).send();
    return;
  }
  logger.info(`Meme with id: ${meme_id} not found`);
  res.status(statusCodes.NOT_FOUND);
};

export {
  handleGetMemes,
  handleGetSingleMeme,
  handleCreateMeme,
  handleDeleteMeme,
}
