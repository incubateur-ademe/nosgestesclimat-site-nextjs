-- The integrations API (API tokens, mapping files, email whitelist) is removed.
-- Drop its tables and enum, and drop the `apiToken` value of the verification
-- code usage enum: no feature creates these codes anymore. Existing rows with
-- usage `apiToken` are deleted (they expire within 24 hours regardless).

-- DropTable
DROP TABLE "ngc"."IntegrationWhitelist";

-- DropTable
DROP TABLE "ngc"."IntegrationApiScope";

-- DropEnum
DROP TYPE "ngc"."ApiScopeName";

-- AlterEnum
-- PostgreSQL cannot delete an enum value in place, so recreate the type.
DELETE FROM "ngc"."VerificationCode" WHERE "usage" = 'apiToken';

CREATE TYPE "ngc"."VerificationCodeUsage_new" AS ENUM ('login', 'newsletter');

ALTER TABLE "ngc"."VerificationCode" ALTER COLUMN "usage" DROP DEFAULT;
ALTER TABLE "ngc"."VerificationCode" ALTER COLUMN "usage" TYPE "ngc"."VerificationCodeUsage_new" USING ("usage"::text::"ngc"."VerificationCodeUsage_new");
ALTER TABLE "ngc"."VerificationCode" ALTER COLUMN "usage" SET DEFAULT 'login';

DROP TYPE "ngc"."VerificationCodeUsage";
ALTER TYPE "ngc"."VerificationCodeUsage_new" RENAME TO "VerificationCodeUsage";
