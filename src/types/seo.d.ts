// ref. https://github.com/jonasmerlin/astro-seo/blob/main/src/SEO.astro

interface Link extends HTMLLinkElement {
  prefetch: boolean;
  crossorigin: string;
  sizes: string;
  color: string;
}

interface Meta extends HTMLMetaElement {
  property: string;
}

interface Props {
  title?: string;
  description?: string;
  canonical?: string;
  nofollow?: boolean;
  noindex?: boolean;
  openGraph?: {
    basic: {
      title: string;
      type: string;
      image: string;
      url?: string;
    };
    optional?: {
      audio?: string;
      description?: string;
      determiner?: string;
      locale?: string;
      localeAlternate?: string[];
      siteName?: string;
      video?: string;
    };
    image?: {
      url?: string;
      secureUrl?: string;
      type?: string;
      width?: number;
      height?: number;
      alt?: string;
    };
    article?: {
      publishedTime?: string;
      modifiedTime?: string;
      expirationTime?: string;
      authors?: string[];
      section?: string;
      tags?: string[];
    };
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
  };
  extend?: {
    link?: Partial<Link>[];
    meta?: Partial<Meta>[];
  };
}

declare module "astro-seo" {
  export function SEO(_props: Props): JSX.Element;
}
