-- AddForeignKey
ALTER TABLE "ngc"."VerifiedUser" ADD CONSTRAINT "VerifiedUser_id_fkey" FOREIGN KEY ("id") REFERENCES "ngc"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
