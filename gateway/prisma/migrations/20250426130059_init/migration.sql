-- CreateTable
CREATE TABLE "subscribers" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "authUrl" TEXT,
    "authType" TEXT,
    "apiKey" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "subscribers_apiKey_idx" ON "subscribers"("apiKey");
