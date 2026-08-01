-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "brand" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "year" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "mileage" INTEGER NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "vin" VARCHAR(17) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_vin_key" ON "cars"("vin");
