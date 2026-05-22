export type AlcoholOption =
  | "no_alcohol"
  | "champagne"
  | "wine"
  | "strong_alcohol"
  | "cocktails"
  | "no_preference";

export type GuestRecord = {
  id: number;
  name: string;
  sortOrder: number;
  isAlcoholic: boolean;
  alcoholPreferences: AlcoholOption[];
  comment: string;
  isSubmitted: boolean;
  submittedAt: string | null;
  updatedAt: string;
};

export type InvitationGroup = {
  id: number;
  token: string;
  title: string;
  guests: GuestRecord[];
  createdAt: string;
  updatedAt: string;
};

export type AdminGuestRecord = GuestRecord & {
  groupTitle: string;
  token: string;
};

export type SeedGuest = {
  name: string;
  sortOrder: number;
  isAlcoholic: boolean;
};

export type SeedInvitationGroup = {
  token: string;
  title: string;
  guests: SeedGuest[];
};

export const alcoholOptionLabels: Record<AlcoholOption, string> = {
  no_alcohol: "Не пью алкоголь",
  champagne: "Шампанское",
  wine: "Вино",
  strong_alcohol: "Крепкий алкоголь",
  cocktails: "Коктейли",
  no_preference: "Без разницы",
};

export const adminSecret = "host-view";
