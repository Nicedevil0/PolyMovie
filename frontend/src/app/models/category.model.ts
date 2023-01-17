export class Category {
  code: string;
  label: string;
  image: string;

  constructor(code: string, label: string, image: string) {
    this.code = code;
    this.label = label;
    this.image = image;
  }
}
