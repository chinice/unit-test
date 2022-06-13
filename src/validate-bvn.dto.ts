import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class ValidateBvnDTO {
  @ApiProperty({
    example: 12345678901,
  })
//   @IsNotEmpty()
//   @IsNumber()
//   @Length(11)
  bvn: any;
}
