CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateIndex
CREATE INDEX "cars_brand_idx" ON "cars" USING GIN ("brand" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "cars_model_idx" ON "cars" USING GIN ("model" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "cars_color_idx" ON "cars" USING GIN ("color" gin_trgm_ops);
