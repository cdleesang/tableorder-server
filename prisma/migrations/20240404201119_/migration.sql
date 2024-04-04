/*
  Warnings:

  - You are about to drop the column `storeMemberId` on the `Table` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" TEXT NOT NULL,
    "storeTableId" TEXT NOT NULL
);
INSERT INTO "new_Table" ("id", "memberId", "storeTableId") SELECT "id", "memberId", "storeTableId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE UNIQUE INDEX "Table_memberId_key" ON "Table"("memberId");
CREATE UNIQUE INDEX "Table_storeTableId_key" ON "Table"("storeTableId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
