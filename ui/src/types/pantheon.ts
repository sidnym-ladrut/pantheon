/////////////////////
// Interface Types //
/////////////////////

/*******************************/
/* Internal Types (React only) */
/*******************************/

// export interface Key {
//   key: string;
// }

// export interface Board {
//   name: string;
//   desc: string;
//   tags: string[];
//   image: string;
//   host: string;
// }

/****************************/
/* Scry Types (Urbit->React) */
/****************************/

export interface ScryKey {
  key: string;
}

export interface ScryTag {
  id: string;
  name: string;
  slatename: string;
}

export interface ScryFile {
  cid: string;
  name: string;
  tags: ScryTag[];
}

export interface ScryFiles {
  [key: string]: ScryFile;
}

/*****************************/
/* Poke Types (React->Urbit) */
/*****************************/

export interface PokeKey extends ScryKey {}

// export interface PokeBoard {
//   name: string;
//   desc: string;
//   tags: string[];
//   image: string;
//   axis: Axis;
// }
//
// export interface PokeJoin {
//   host: string;
//   name: string;
// }

/////////////////
// Other Types //
/////////////////

export type GalleryMode = "simple" | "detail";
export type PrivacySetting = "protected" | "private"; // "public"

export interface FieldOption {
  readonly label: string;
  readonly value: string;
}