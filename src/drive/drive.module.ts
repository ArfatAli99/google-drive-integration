// src/drive/drive.module.ts
import { Module } from "@nestjs/common";
import { DriveService } from "./drive.service";
import { DriveController } from "./drive.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DriveService],
  controllers: [DriveController],
})
export class DriveModule {}
