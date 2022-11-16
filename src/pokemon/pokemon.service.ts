import { Body, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../schema/pokemon.schema';
import { CreatePokemonDto } from './dto/create-pokemon-dto';

@Injectable()
export class PokemonService {
    constructor(
        @InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>,
        private readonly httpService: HttpService,
    ) { }
    
    getAllPokemonFromApi = async () => {
        const path = `${process.env.pokeapi}/pokemon/?limit=30`;
        const { data } = await firstValueFrom(
            this.httpService.get<Pokemon[]>(path).pipe(
                catchError((error) => {
                    throw 'An error happened!';
                }),
            ),
        );
        return data
    }
    getPokemonByIdNameFromApi = async (query: string) => {
        const path = `${process.env.pokeapi}/pokemon/${query}`;
        const { data } = await firstValueFrom(
            this.httpService.get<Pokemon[]>(path).pipe(
                catchError((error) => {
                    throw 'An error happened!';
                }),
            ),
        );
        return data
    }

    getAllPokemon = async () => {
        try {
            const pokemons = await this.pokemonModel.find({isRemove: false})
            return pokemons
        } catch (e) {
            return e
        }
    }

    getPokemonByIdName = async (query: string) => {
        try {
            console.log(query);
            const pokemon = await this.pokemonModel.findOne({id: query})
            return pokemon
        } catch (e) {
            return e
        }
    }

    async createPokemon (createPokemonDto: CreatePokemonDto) {
        try {
            const pokemon = new this.pokemonModel(createPokemonDto);
            return await pokemon.save()
          } catch(e) {
            return e
          }
    }

    async updatePokemon (createPokemonDto: CreatePokemonDto) {
        try {
            if (!createPokemonDto.id) {
                throw new Error("You need to select one ID pokemon");
            }
            await this.pokemonModel.updateOne({id: createPokemonDto.id}, {$set: {
                name: createPokemonDto.name,
                height: createPokemonDto.height,
                weight: createPokemonDto.weight,
                location_area_encounters: createPokemonDto.location_area_encounters
            }});
            return true
          } catch(e) {
            return e
          }
    }

    async deletePokemon (createPokemonDto: CreatePokemonDto) {
        try {
            if (!createPokemonDto.id) {
                throw new Error("You need to select one ID pokemon");
            }
            await this.pokemonModel.updateOne({id: createPokemonDto.id}, {$set: {isRemove: true}});
            return true
          } catch(e) {
            return e
          }
    }
}
