-- AlterTable
ALTER TABLE "_CategoryToPost" ADD CONSTRAINT "_CategoryToPost_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CategoryToPost_AB_unique";

-- AlterTable
ALTER TABLE "_FireStoreToPost" ADD CONSTRAINT "_FireStoreToPost_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_FireStoreToPost_AB_unique";
