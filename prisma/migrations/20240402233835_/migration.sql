/*
  Warnings:

  - Added the required column `storeTableId` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "memberId" TEXT NOT NULL,
    "storeMemberId" TEXT NOT NULL,
    "storeTableId" TEXT NOT NULL,
    "number" INTEGER NOT NULL
);
INSERT INTO "new_Table" ("id", "memberId", "number", "storeMemberId") SELECT "id", "memberId", "number", "storeMemberId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE UNIQUE INDEX "Table_memberId_key" ON "Table"("memberId");
CREATE UNIQUE INDEX "Table_storeMemberId_key" ON "Table"("storeMemberId");
CREATE UNIQUE INDEX "Table_storeTableId_key" ON "Table"("storeTableId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
