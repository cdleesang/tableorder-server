/*
  Warnings:

  - Added the required column `password` to the `Table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signInId` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" TEXT,
    "storeTableId" TEXT,
    "signInId" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Table" ("id", "memberId", "storeTableId") SELECT "id", "memberId", "storeTableId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE UNIQUE INDEX "Table_memberId_key" ON "Table"("memberId");
CREATE UNIQUE INDEX "Table_storeTableId_key" ON "Table"("storeTableId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
