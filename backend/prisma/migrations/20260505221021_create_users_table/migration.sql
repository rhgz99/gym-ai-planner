/*
  Warnings:

  - You are about to drop the column `experiencie` on the `user_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `session_lenght` on the `user_profiles` table. All the data in the column will be lost.
  - Added the required column `experience` to the `user_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_length` to the `user_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profiles" DROP COLUMN "experiencie",
DROP COLUMN "session_lenght",
ADD COLUMN     "experience" VARCHAR(20) NOT NULL,
ADD COLUMN     "session_length" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "users" (
    "user_id" UUID NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "password" VARCHAR(254) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
