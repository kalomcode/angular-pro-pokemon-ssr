import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { MetaTagsService } from '../../shared/services/meta-tags.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'page-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent {
  private metaTagsSvc = inject(MetaTagsService);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      document.title = 'Pricing Page';
    }

    // this.metaTagsSvc.setMetaTags('pricing');
  }
}
