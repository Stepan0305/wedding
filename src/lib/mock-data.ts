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
  alcoholPreferences: AlcoholOption[];
  comment: string;
  isSubmitted: boolean;
  submittedAt: string | null;
  updatedAt: string;
};

export type InvitationGroup = {
  token: string;
  title: string;
  greeting: string;
  story: string;
  venueName: string;
  eventDate: string;
  eventTime: string;
  venueAddress: string;
  routeDetails: string;
  dressCode: string;
  wishes: string;
  timeline: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  guests: GuestRecord[];
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

export const invitationMocks: Record<string, InvitationGroup> = {
  demo: {
    token: "demo",
    title: "Анна, Дмитрий и София",
    greeting: "Дорогие наши, мы будем счастливы разделить с вами этот день.",
    story:
      "Здесь позже появится ваш живой текст о свадьбе, настроении дня и приглашении к общему празднику. Пока это плейсхолдер, который помогает собрать правильный ритм и плотность страницы.",
    venueName: "Загородный клуб «Плейсхолдер»",
    eventDate: "20 сентября 2026",
    eventTime: "15:30",
    venueAddress: "Точный адрес появится позже",
    routeDetails:
      "Здесь будет краткая и понятная инструкция по маршруту, парковке, трансферу или важным ориентирам для гостей.",
    dressCode:
      "Мы добавим финальные рекомендации по образам позже. Пока здесь живет мягкий плейсхолдер для будущего дресс-кода.",
    wishes:
      "Этот блок можно использовать для пожеланий по подаркам, цветам, детям, организационным мелочам и любым важным деталям.",
    timeline: [
      {
        time: "15:30",
        title: "Сбор гостей",
        description: "Легкий welcome, первые объятия и время перевести дыхание.",
      },
      {
        time: "16:00",
        title: "Церемония",
        description: "Главный момент дня, после которого начнется праздник.",
      },
      {
        time: "17:00",
        title: "Ужин и тосты",
        description: "Неспешная часть вечера, разговоры и любимые люди рядом.",
      },
      {
        time: "19:00",
        title: "Танцы и вечер",
        description: "Больше музыки, света, движения и настоящего свадебного настроения.",
      },
    ],
    guests: [
      {
        id: 1,
        name: "Анна",
        sortOrder: 1,
        alcoholPreferences: ["champagne", "cocktails"],
        comment: "С радостью буду с вами. Если что-то изменится, напишу лично.",
        isSubmitted: true,
        submittedAt: "2026-05-11T16:45:00.000Z",
        updatedAt: "2026-05-11T16:45:00.000Z",
      },
      {
        id: 2,
        name: "Дмитрий",
        sortOrder: 2,
        alcoholPreferences: ["strong_alcohol"],
        comment: "",
        isSubmitted: true,
        submittedAt: "2026-05-11T17:10:00.000Z",
        updatedAt: "2026-05-11T17:10:00.000Z",
      },
      {
        id: 3,
        name: "София",
        sortOrder: 3,
        alcoholPreferences: [],
        comment: "",
        isSubmitted: false,
        submittedAt: null,
        updatedAt: "2026-05-11T12:00:00.000Z",
      },
    ],
  },
};

export const getInvitationByToken = (token: string) => invitationMocks[token] ?? null;

export const getAllGuests = () =>
  Object.values(invitationMocks).flatMap((group) =>
    group.guests.map((guest) => ({
      groupTitle: group.title,
      token: group.token,
      ...guest,
    })),
  );
