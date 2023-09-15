import { Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  uploadFilePost(createFileDto) {
    return 'This action adds a new file';
  }
}
