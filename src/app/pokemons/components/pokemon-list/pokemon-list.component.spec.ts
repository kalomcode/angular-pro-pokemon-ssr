import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../interfaces';
import { provideRouter } from '@angular/router';

const pokemonsMock: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemons', pokemonsMock);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('pokemon-card').length).toBe(
      pokemonsMock.length
    );
  });

  it('should render "No hay pokémons"', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const test = compiled.querySelector('div')?.textContent;
    // console.log({ test });

    expect(test).toContain('No hay pokémons');
  });
});
