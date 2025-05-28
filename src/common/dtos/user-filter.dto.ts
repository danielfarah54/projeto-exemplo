import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { PageOptionsDto } from './page-options.dto';

export class UserFilterDto extends PageOptionsDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  searchTerm?: string;
}
