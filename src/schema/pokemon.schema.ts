import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
    
  @Prop()
  id: number
  
  @Prop()
  name: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  location_area_encounters: string;

  @Prop({type: Boolean, default: false})
  isRemove: boolean;

}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);