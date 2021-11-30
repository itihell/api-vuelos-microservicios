import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VueloTDO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly piloto: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly avion: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destino: string;
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly fecha: Date;
}
