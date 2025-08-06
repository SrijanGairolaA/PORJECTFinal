-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "video" TEXT,
    "img" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostOptions" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "option" TEXT NOT NULL,

    CONSTRAINT "PostOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Votes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Votes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_Votes_B_index" ON "_Votes"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostOptions" ADD CONSTRAINT "PostOptions_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Votes" ADD CONSTRAINT "_Votes_A_fkey" FOREIGN KEY ("A") REFERENCES "PostOptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Votes" ADD CONSTRAINT "_Votes_B_fkey" FOREIGN KEY ("B") REFERENCES "UserDemographic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
