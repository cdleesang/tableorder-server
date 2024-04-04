-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "memberId" TEXT NOT NULL,
    "storeMemberId" TEXT NOT NULL,
    "number" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Table_memberId_key" ON "Table"("memberId");

-- CreateIndex
CREATE UNIQUE INDEX "Table_storeMemberId_key" ON "Table"("storeMemberId");
