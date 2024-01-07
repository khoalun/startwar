export interface SecretLocation {
  id: number;
  lat: number;
  long: number;
}

export interface SecretLocationWithDistance extends SecretLocation {
  distance: number;
}

export interface Identity {
  id: number;
  name: string;
  height: number;
  mass: number;
  gender: string;
  homeworld: string;
  wiki: string;
  image: string;
  born: number;
  died: number;
  diedLocation: string;
  species: string;
  hairColor: string;
  eyeColor: string;
  skinColor: string;
  cybernetics: string;
  affiliations: string[];
  masters: string[] | string;
  apprentices: string[];
  formerAffiliations: string[];
}
