import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const pokemonMock: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', pokemonMock);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(pokemonMock);
  });

  it('should render the pokemon name and image correctly', () => {
    const imgEl = compiled.querySelector('img') as HTMLImageElement;
    const imgSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonMock.id}.png`;

    expect(imgEl.src).toBe(imgSrc);

    expect(compiled.textContent?.trim()).toBe(pokemonMock.name);
  });

  it('should have the proper ng-reflect-router-link', () => {
    const divLink = compiled.querySelector('div') as HTMLDivElement;

    expect(divLink.getAttribute('ng-reflect-router-link')).toBe(
      `/pokemon,${pokemonMock.name}`
    );
  });
});
