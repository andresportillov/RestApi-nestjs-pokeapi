import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonController } from './pokemon/controller/pokemon.controller';
import { HttpModule } from '@nestjs/axios'; 
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { PokemonService } from './pokemon/pokemon.service';

@Module({
  imports: [
    HttpModule, 
    ConfigModule.forRoot(), 
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb://127.0.0.1:27017/pokemons?directConnection=true',
      }),
    }),
    // MongooseModule.forRoot('mongodb://127.0.0.1:27017/pokemons?directConnection=true', {
    //   connectionName: 'pokemons'
    // }),
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
