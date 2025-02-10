import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent /* implements OnInit */ /* , OnDestroy */ {
  private pokemonSvc = inject(PokemonsService);
  pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  public loadOnPageChange = effect(
    () => {
      this.loadPokemons(this.currentPage());
    },
    { allowSignalWrites: true }
  );

  // isLoading = signal(true);

  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  // ngOnInit(): void {
  //   this.loadPokemons();
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 5000);
  // }

  loadPokemons(page = 0) {
    this.pokemonSvc
      .loadPage(page)
      .pipe(tap(() => this.title.setTitle(`Pokemons SSR - Page ${page}`)))
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }
}
