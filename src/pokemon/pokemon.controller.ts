import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly httpService: HttpService) { }

  @Get()
  async getPokemons() {
    const path = `${process.env.pokeapi}/pokemon/?limit=30`;
    const { data } = await firstValueFrom(
        this.httpService.get<any[]>(path).pipe(
          catchError((error) => {
            throw 'An error happened!';
          }),
        ),
      );
    return data
  }

  @Get('/:idName')
  async getPokemon(@Param('idName') query: string) {
    const path = `${process.env.pokeapi}/pokemon/${query}`;
    const { data } = await firstValueFrom(
        this.httpService.get<any[]>(path).pipe(
          catchError((error) => {
            throw 'An error happened!';
          }),
        ),
      );
    return data
  }
}
