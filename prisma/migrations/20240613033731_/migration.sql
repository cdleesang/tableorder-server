-- CreateTable
CREATE TABLE "AdminPermission" (
    "adminId" TEXT NOT NULL,
    "permission" TEXT NOT NULL,

    PRIMARY KEY ("adminId", "permission"),
    CONSTRAINT "AdminPermission_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
