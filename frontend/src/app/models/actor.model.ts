export class Actor {
  id: number;
  firstName: string;
  lastName: string;
  birth: Date;
  death: Date;
  image: string;

  constructor(id: number, firstName: string, lastName: string, birth: Date, death: Date, image: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birth = birth;
    this.death = death;
    this.image = image;
  }
}
