export type Side = "left" | "right";

export interface Party {
  id: string;
  handle: string;
  name: string;
  side: Side;
}

export const PARTIES: Party[] = [
  { id: "psoe", handle: "PSOE", name: "PSOE", side: "left" },
  { id: "podemos", handle: "Podemos", name: "Podemos", side: "left" },
  { id: "pp", handle: "PPopular", name: "PP", side: "right" },
  { id: "vox", handle: "vox_es", name: "VOX", side: "right" },
];

export const SIDE_LABEL: Record<Side, string> = {
  left: "Izquierda",
  right: "Derecha",
};

export interface CongressParty {
  id: string;
  name: string;
  seats: number;
  vote: string;
  side: Side;
}

export const CONGRESS_2023: CongressParty[] = [
  { id: "psoe", name: "PSOE", seats: 121, vote: "31,7%", side: "left" },
  { id: "sumar", name: "Sumar", seats: 31, vote: "12,3%", side: "left" },
  { id: "erc", name: "ERC", seats: 7, vote: "1,9%", side: "left" },
  { id: "ehbildu", name: "EH Bildu", seats: 6, vote: "1,4%", side: "left" },
  { id: "bng", name: "BNG", seats: 1, vote: "0,5%", side: "left" },
  { id: "pp", name: "PP", seats: 137, vote: "33,1%", side: "right" },
  { id: "vox", name: "VOX", seats: 33, vote: "12,4%", side: "right" },
  { id: "junts", name: "Junts", seats: 7, vote: "1,6%", side: "right" },
  { id: "pnv", name: "PNV", seats: 5, vote: "1,1%", side: "right" },
  { id: "upn", name: "UPN", seats: 1, vote: "0,2%", side: "right" },
];

export const TOTAL_SEATS = 350;
export const MAJORITY = 176;
export const OTHER_SEATS = 28;
