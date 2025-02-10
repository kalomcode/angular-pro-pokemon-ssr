import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MetaTagsService } from '../../shared/services/meta-tags.service';

@Component({
  selector: 'page-about',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  private metaTagsSvc = inject(MetaTagsService);

  ngOnInit(): void {
    this.metaTagsSvc.setMetaTags('about');
  }
}
