/*
  Warnings:

  - The primary key for the `Table` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `number` on the `Table` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Table` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Table" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "memberId" TEXT NOT NULL,
    "storeMemberId" TEXT NOT NULL,
    "storeTableId" TEXT NOT NULL
);
INSERT INTO "new_Table" ("id", "memberId", "storeMemberId", "storeTableId") SELECT "id", "memberId", "storeMemberId", "storeTableId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE UNIQUE INDEX "Table_memberId_key" ON "Table"("memberId");
CREATE UNIQUE INDEX "Table_storeMemberId_key" ON "Table"("storeMemberId");
CREATE UNIQUE INDEX "Table_storeTableId_key" ON "Table"("storeTableId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
