/*
  Warnings:

  - You are about to drop the `SimulationState` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ngc"."SimulationState" DROP CONSTRAINT "SimulationState_simulationId_fkey";

-- DropTable
DROP TABLE "ngc"."SimulationState";
