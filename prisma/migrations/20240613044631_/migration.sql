-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AdminPermission" (
    "adminId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    PRIMARY KEY ("adminId", "permission"),
    CONSTRAINT "AdminPermission_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AdminPermission" ("adminId", "permission") SELECT "adminId", "permission" FROM "AdminPermission";
DROP TABLE "AdminPermission";
ALTER TABLE "new_AdminPermission" RENAME TO "AdminPermission";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
