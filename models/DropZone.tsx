"use client";

import { UploadService } from "../lib/upload_service";

export default class DropZone {
  public async update(image: File) {
    if (image instanceof File) {
      const picture_name = await UploadService.handleUpload(image);
      if (picture_name !== undefined && picture_name !== "") {
        return picture_name;
      }
    }
  }
}
