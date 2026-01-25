import {
  IsArray,
  IsEmail,
  IsInt,
  IsMongoId,
  IsPhoneNumber,
  Min,
} from 'class-validator';

export class TicketDto {
  @IsMongoId()
  film: string;
  @IsMongoId()
  session: string;
  @IsInt()
  @Min(1)
  row: number;
  @IsInt()
  @Min(1)
  seat: number;
}

export class PostOrderDto {
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  @IsArray()
  tickets: TicketDto[];
}
