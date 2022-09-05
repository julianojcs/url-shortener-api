import crypto from 'crypto';

export type ShortenerInterface = {
  id: string,
  url: string,
  shortURL: string,
  createdAt: Date
}

export type urlProps = {
  url: string;
};

export type dateProps = {
  date: Date;
};

export type shortURLProps = {
  shortURL: string;
};
/**
 * Shortener entity
 * @constructor
 * @param {string} url - The url to be shortened.
 */
export class Shortener {
  public props: Required<ShortenerInterface>;

  private constructor(url: string) {
    if (!url) {
      //@ts-expect-error used for ORM
      this.props = {};
      return;
    }
    const today = new Date().toLocaleDateString('en-US');
    this.props = {
      id: crypto.randomUUID(),
      url: url,
      shortURL: this.createShortURL(),
      createdAt: new Date(today)
    };
  }

  static create(props: urlProps): Shortener {
    return new Shortener(props.url);
  }

  get id() {
    return this.props.id;
  }
  private set id(value: string) {
    if (!this.props.id) this.props.id = value;
  }

  get url() {
    return this.props.url;
  }
  private set url(value: string) {
    if (!this.props.url) this.props.url = value;
  }

  get shortURL() {
    return this.props.shortURL;
  }
  private set shortURL(value: string) {
    if (!this.props.shortURL) this.props.shortURL = value;
  }

  get createdAt() {
    return this.props.createdAt;
  }
  private set createdAt(value: Date) {
    if (!this.props.createdAt) this.props.createdAt = value;
  }

  createShortURL() {
    return `${process.env.URL}${Math.random().toString(36).substring(5)}`;
  }

  toJSON() {
    return this.props;
  }
}



