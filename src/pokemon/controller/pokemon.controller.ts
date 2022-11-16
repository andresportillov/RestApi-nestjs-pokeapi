import { Controller, Get, Put, Post, Delete, Param, Body, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CreatePokemonDto } from '../dto/create-pokemon-dto';
import { PokemonService } from '../pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly httpService: HttpService,
    private pokemonService: PokemonService,
  ) { }

  @Get('/from-api')
  async getPokemonsFromApi() {
    return this.pokemonService.getAllPokemonFromApi()
  }

  @Get('/from-api/:idName')
  async getPokemonFromApi(@Param('idName') query: string) {
    return this.pokemonService.getPokemonByIdNameFromApi(query)
  }

  @Get('/')
  async getPokemons() {
    return this.pokemonService.getAllPokemon()
  }

  @Get('/:idName')
  async getPokemon(@Param('idName') query: string) {
    return this.pokemonService.getPokemonByIdName(query)
  }

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.createPokemon(createPokemonDto)
  }

  @Put()
  async update(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.updatePokemon(createPokemonDto)
  }

  @Put('/delete')
  async delete(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.deletePokemon(createPokemonDto)
  }
}
