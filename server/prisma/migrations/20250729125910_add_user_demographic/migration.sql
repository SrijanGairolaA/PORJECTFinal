-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'transgender');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(191) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "password_reset_token" TEXT,
    "token_send_at" TIMESTAMP(3),
    "refreshToken" TEXT NOT NULL,
    "refresh_created_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDemographic" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "religion" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "UserDemographic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserDemographic_userId_key" ON "UserDemographic"("userId");

-- AddForeignKey
ALTER TABLE "UserDemographic" ADD CONSTRAINT "UserDemographic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
