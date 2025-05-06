-- CreateTable
CREATE TABLE "Memes" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "meme_url" VARCHAR(255) NOT NULL,
    "originalImageName" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Memes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Memes_meme_url_key" ON "Memes"("meme_url");
