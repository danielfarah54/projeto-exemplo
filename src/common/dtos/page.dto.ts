import { IsArray } from 'class-validator';

import { PageMetadataDto } from '@/common/dtos/page-metadata.dto';

export class PageDto<T> {
  @IsArray()
  readonly data: T[];
  readonly pageMetadata: PageMetadataDto;

  constructor(data: T[], pageMetadata: PageMetadataDto) {
    this.data = data;
    this.pageMetadata = pageMetadata;
  }
}
