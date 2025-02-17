import { TestBed } from '@angular/core/testing';
import { PokemonsService } from './pokemons.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SimplePokemon } from '../interfaces';
import { catchError } from 'rxjs';

const pokeApiResponseMock = {
  count: 1118,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const pokemonsMock: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const pokemonMock: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonsService);
  });

  beforeEach(() => {
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', () => {
    service.loadPage(1).subscribe((pokemons) => {
      expect(pokemons).toEqual(pokemonsMock);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );

    expect(req.request.method).toBe('GET');

    req.flush(pokeApiResponseMock);
  });

  it('should load a page 5 of SimplePokemons', () => {
    service.loadPage(5).subscribe((pokemons) => {
      expect(pokemons).toEqual(pokemonsMock);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=80'
    );

    expect(req.request.method).toBe('GET');

    req.flush(pokeApiResponseMock);
  });

  it('should load a pokemon by ID', () => {
    service.loadPokemon('1').subscribe((pokemon: any) => {
      expect(pokemon).toEqual(pokemonMock);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/1');

    expect(req.request.method).toBe('GET');

    req.flush(pokemonMock);
  });

  it('should load a pokemon by name', () => {
    service.loadPokemon('bulbasaur').subscribe((pokemon: any) => {
      expect(pokemon).toEqual(pokemonMock);
    });

    const req = httpMock.expectOne(
      'https://pokeapi.co/api/v2/pokemon/bulbasaur'
    );

    expect(req.request.method).toBe('GET');

    req.flush(pokemonMock);
  });

  // Disparar un error
  it('should load a pokemon by name', () => {
    const pokemonName = 'yo-no-existo';
    service
      .loadPokemon(pokemonName)
      .pipe(
        catchError((error) => {
          expect(error.message).toContain('Pokemon not found');
          return [];
        })
      )
      .subscribe();

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('Pokemon not found', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
