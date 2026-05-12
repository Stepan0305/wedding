import { notFound } from "next/navigation";

import { GuestResponseCard } from "@/components/invitation/guest-response-card";
import { getInvitationByToken } from "@/lib/mock-data";

type InvitationPageProps = {
  params: Promise<{
    token: string;
  }>;
};

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { token } = await params;
  const invitation = getInvitationByToken(token);

  if (!invitation) {
    notFound();
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[var(--gradient-hero)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
        <section className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-glow)] backdrop-blur-md">
          <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-10 lg:py-12">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-primary)]">
                Свадебное приглашение
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl leading-none sm:text-6xl lg:text-7xl">
                Степан
                <span className="mx-3 inline-block text-[var(--color-gold)]">&</span>
                Елизавета
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] sm:text-xl">
                {invitation.greeting}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full border border-[var(--color-border)] bg-white/70 px-5 py-3 text-sm">
                  {invitation.eventDate}
                </div>
                <div className="rounded-full border border-[var(--color-border)] bg-white/70 px-5 py-3 text-sm">
                  {invitation.eventTime}
                </div>
                <div className="rounded-full border border-[var(--color-border)] bg-white/70 px-5 py-3 text-sm">
                  {invitation.venueName}
                </div>
              </div>
            </div>

            <div className="relative min-h-[18rem] rounded-[28px] border border-white/40 bg-[linear-gradient(180deg,rgba(189,22,22,0.18),rgba(255,255,255,0.35))] p-6 shadow-[var(--shadow-soft)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_35%),radial-gradient(circle_at_70%_75%,rgba(184,138,74,0.35),transparent_25%)]" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-primary)]">
                    Для вас
                  </p>
                  <p className="mt-4 max-w-xs text-3xl leading-tight">{invitation.title}</p>
                </div>
                <p className="max-w-sm text-sm leading-7 text-[var(--color-text-muted)]">
                  Здесь позже может появиться акцентный визуальный блок с фотографией,
                  легким 3D-эффектом или атмосферной анимацией.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
              О дне
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
              {invitation.story}
            </p>
          </article>

          <article className="rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
              Детали
            </p>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-sm text-[var(--color-text-muted)]">Дата и время</dt>
                <dd className="mt-1 text-xl">{invitation.eventDate + ", " + invitation.eventTime}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-text-muted)]">Локация</dt>
                <dd className="mt-1 text-xl">{invitation.venueName}</dd>
              </div>
              <div>
                <dt className="text-sm text-[var(--color-text-muted)]">Адрес</dt>
                <dd className="mt-1 text-base leading-7 text-[var(--color-text)]">
                  {invitation.venueAddress}
                </dd>
              </div>
            </dl>
          </article>
        </section>

        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                Тайминг
              </p>
              <h2 className="mt-4 text-3xl">Ритм свадебного дня</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
              Финальные времена и описания мы позже подменим на реальные. Пока этот блок
              задает композицию и настроение страницы.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-4">
            {invitation.timeline.map((item) => (
              <article
                key={item.time + item.title}
                className="rounded-[24px] border border-[var(--color-border)] bg-white/70 p-5"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-primary)]">
                  {item.time}
                </p>
                <h3 className="mt-4 text-xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <article className="rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
              Как добраться
            </p>
            <div className="mt-6 rounded-[24px] border border-[var(--color-border)] bg-white/70 p-6">
              <div className="flex h-56 items-center justify-center rounded-[18px] border border-dashed border-[var(--color-border)] bg-[rgba(189,22,22,0.05)] text-sm text-[var(--color-text-muted)]">
                Здесь будет карта и кнопка построения маршрута
              </div>
              <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
                {invitation.routeDetails}
              </p>
            </div>
          </article>

          <article className="rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
              Правила и пожелания
            </p>
            <div className="mt-6 grid gap-4">
              <div className="rounded-[24px] border border-[var(--color-border)] bg-white/70 p-6">
                <h3 className="text-xl">Дресс-код</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  {invitation.dressCode}
                </p>
              </div>
              <div className="rounded-[24px] border border-[var(--color-border)] bg-white/70 p-6">
                <h3 className="text-xl">Пожелания</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                  {invitation.wishes}
                </p>
              </div>
            </div>
          </article>
        </section>

        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                Анкеты гостей
              </p>
              <h2 className="mt-4 text-3xl">Персональные ответы внутри одного приглашения</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
              На следующем шаге мы заменим этот демонстрационный вид на реальную форму с
              сохранением и редактированием данных.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {invitation.guests
              .slice()
              .sort((left, right) => left.sortOrder - right.sortOrder)
              .map((guest) => (
                <GuestResponseCard key={guest.id} guest={guest} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}
