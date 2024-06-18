// src/drive/drive.controller.ts
import { Controller, Post, Body } from "@nestjs/common";
import { DriveService } from "./drive.service";

@Controller("webhook")
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Post()
  async handleWebhook(@Body() body: any) {
    await this.driveService.processWebhook(body);
  }
}
