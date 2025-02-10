import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

type PageNames = 'about' | 'contact' | 'pricing';

@Injectable({
  providedIn: 'root',
})
export class MetaTagsService {
  private title = inject(Title);
  private meta = inject(Meta);

  setMetaTags(page: PageNames) {
    const setMetaTagsPage: Record<PageNames, () => void> = {
      about: () => this.setAboutMetaTags(),
      contact: () => this.setContactMetaTags(),
      pricing: () => this.setPricingMetaTags(),
    };
    page && setMetaTagsPage[page]();
  }

  private setAboutMetaTags() {
    this.title.setTitle('About Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi About Page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Kalom,Mola,Curso,Angular,PRO',
    });
  }

  private setContactMetaTags() {
    this.title.setTitle('Contact Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Contact Page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'Contact Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Kalom,Mola,Curso,Angular,PRO',
    });
  }

  private setPricingMetaTags() {
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Pricing Page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'Hola,Mundo,Kalom,Mola,Curso,Angular,PRO',
    });
  }
}
