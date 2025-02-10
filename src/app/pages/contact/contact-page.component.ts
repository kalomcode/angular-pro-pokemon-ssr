import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MetaTagsService } from '../../shared/services/meta-tags.service';

@Component({
  selector: 'page-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPageComponent implements OnInit {
  private metaTagsSvc = inject(MetaTagsService);

  ngOnInit(): void {
    this.metaTagsSvc.setMetaTags('contact');
  }
}
