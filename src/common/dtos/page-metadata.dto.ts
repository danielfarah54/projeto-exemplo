import { PageMetadataDtoParameters } from '../interfaces/pagination.interface';

export class PageMetadataDto {
  readonly page: number;
  readonly take: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasNextPage: boolean;
  readonly pageToken?: string;

  constructor({ pageOptionsDto, itemCount }: PageMetadataDtoParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasNextPage = this.page < this.pageCount;
  }
}
