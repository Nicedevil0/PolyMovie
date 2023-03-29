export class Actor {
  id: number;
  firstName: string;
  lastName: string;
  birth: Date | string;
  death?: Date | string;
  image: string;

  constructor(id: number, firstName: string, lastName: string, image: string, birth: Date | string, death?: Date | string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birth = birth;
    this.death = death;
    this.image = image;
  }
}
