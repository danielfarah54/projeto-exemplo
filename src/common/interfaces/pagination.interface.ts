import { PageOptionsDto } from '@/common/dtos/page-options.dto';

export interface PageMetadataDtoParameters {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
  pageToken?: string;
}
