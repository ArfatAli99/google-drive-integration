import { Injectable } from "@nestjs/common";
import { google } from "googleapis";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DriveService {
  private drive;

  constructor(private prisma: PrismaService) {
    this.drive = google.drive({ version: "v3", auth: this.getAuthClient() });
  }

  private getAuthClient() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "path-to-your-service-account-key.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });
    return auth.getClient();
  }

  async listDriveFiles() {
    const res = await this.drive.files.list({
      q: "'your-shared-folder-id' in parents",
      fields: "files(id, name, parents)",
    });
    return res.data.files;
  }

  async getPermissionsList(fileId: string) {
    const res = await this.drive.permissions.list({
      fileId,
      fields: "permissions(id, role, emailAddress)",
    });
    return res.data.permissions;
  }

  async syncFiles() {
    const files = await this.listDriveFiles();
    for (const file of files) {
      await this.prisma.file.upsert({
        where: { id: file.id },
        update: { name: file.name, parentFolderId: file.parents?.[0] },
        create: {
          id: file.id,
          name: file.name,
          parentFolderId: file.parents?.[0],
        },
      });

      const permissions = await this.getPermissionsList(file.id);
      for (const perm of permissions) {
        await this.prisma.permission.upsert({
          where: { id: perm.id },
          update: { userId: perm.emailAddress, role: perm.role },
          create: {
            id: perm.id,
            fileId: file.id,
            userId: perm.emailAddress,
            role: perm.role,
          },
        });
      }
    }
  }
}
