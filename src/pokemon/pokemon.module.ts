import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './controller/pokemon.controller';
import { Pokemon, PokemonSchema } from '../schema/pokemon.schema';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'; 
import { PokemonService } from './pokemon.service';

@Module({
  imports: [ConfigModule, HttpModule, MongooseModule.forFeature(
    [
        { name: Pokemon.name, schema: PokemonSchema }
    ])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}