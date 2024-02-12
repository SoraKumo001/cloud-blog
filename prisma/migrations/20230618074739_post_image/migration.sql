-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "cardId" TEXT;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "FireStore"("id") ON DELETE SET NULL ON UPDATE CASCADE;
