-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('free', 'basic');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('not_started', 'in_progress', 'queued', 'finished');

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "document" VARCHAR(14) NOT NULL,
    "logo_url" VARCHAR,
    "plan" "Plan" NOT NULL DEFAULT 'free',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_times" (
    "id" SERIAL NOT NULL,
    "initial" VARCHAR NOT NULL,
    "final" VARCHAR NOT NULL,
    "work_day" TEXT NOT NULL,
    "company_id" TEXT,
    "user_id" TEXT,

    CONSTRAINT "work_times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "cost_per_hour" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_responsable" BOOLEAN NOT NULL DEFAULT false,
    "company_id" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "budget_amount" DOUBLE PRECISION NOT NULL,
    "amount_spent" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_stages" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "estimated_initial_date" TIMESTAMP(3) NOT NULL,
    "estimated_final_date" TIMESTAMP(3) NOT NULL,
    "real_initial_date" TIMESTAMP(3) NOT NULL,
    "real_final_date" TIMESTAMP(3) NOT NULL,
    "status" "ProjectStatus" NOT NULL DEFAULT 'not_started',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "project_stages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "initial_time" TIMESTAMP(3) NOT NULL,
    "final_time" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_stage_id" INTEGER NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_projects" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "work_times_company_id_idx" ON "work_times"("company_id");

-- CreateIndex
CREATE INDEX "work_times_user_id_idx" ON "work_times"("user_id");

-- CreateIndex
CREATE INDEX "users_company_id_idx" ON "users"("company_id");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "projects_companyId_name_idx" ON "projects"("companyId", "name");

-- AddForeignKey
ALTER TABLE "work_times" ADD CONSTRAINT "work_times_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_times" ADD CONSTRAINT "work_times_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stages" ADD CONSTRAINT "project_stages_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_project_stage_id_fkey" FOREIGN KEY ("project_stage_id") REFERENCES "project_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_projects" ADD CONSTRAINT "users_projects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
