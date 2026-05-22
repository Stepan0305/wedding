import { notFound } from "next/navigation";

import { InvitationQuestionnaireSection } from "@/components/invitation/invitation-questionnaire-section";
import { getInvitationByToken } from "@/lib/server/invitations-repository";
import { siteContent } from "@/lib/site-content";

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
    <main className="h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-[var(--color-background)] text-[var(--color-text)] overscroll-y-contain">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[var(--gradient-hero)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(189,22,22,0.18),transparent_68%)] blur-2xl animate-float-slow" />
      <div className="pointer-events-none absolute right-[-4rem] top-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(184,138,74,0.18),transparent_65%)] blur-3xl animate-float-delayed" />
      <div className="pointer-events-none absolute inset-x-0 top-[32rem] h-80 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.45),transparent)]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-5 sm:px-8 lg:px-10">
        <section className="snap-stage py-5 sm:py-6">
          <div className="snap-stage-inner overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-glow)] backdrop-blur-md">
            <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:px-10 lg:py-12">
            <div>
              <p className="text-xs uppercase tracking-[0.45em] text-[var(--color-primary)]">
                Свадебное приглашение
              </p>
              <h1 className="mt-6 max-w-3xl text-5xl leading-[0.92] sm:text-6xl lg:text-7xl">
                Степан
                <span className="mx-3 inline-block text-[var(--color-gold)]">&</span>
                Елизавета
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] sm:text-xl text-balance">
                {siteContent.greeting}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[siteContent.eventDate, siteContent.eventTime, siteContent.venueName].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-[var(--color-border)] bg-white/70 px-5 py-3 text-sm shadow-[0_14px_35px_rgba(189,22,22,0.06)]"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="panel-hover rounded-[24px] border border-[var(--color-border)] bg-white/60 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Формат
                  </p>
                  <p className="mt-4 text-xl">Частное приглашение</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                    Эта страница открывается только по персональной ссылке.
                  </p>
                </div>
                <div className="panel-hover rounded-[24px] border border-[var(--color-border)] bg-white/60 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Атмосфера
                  </p>
                  <p className="mt-4 text-xl">Романтичная и торжественная</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                    Здесь мы позже усилим настроение финальным текстом и медиа.
                  </p>
                </div>
                <div className="panel-hover rounded-[24px] border border-[var(--color-border)] bg-white/60 p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Ответ
                  </p>
                  <p className="mt-4 text-xl">Отдельно для каждого гостя</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-text-muted)]">
                    Внутри одной ссылки можно собрать несколько персональных анкет.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[22rem] overflow-hidden rounded-[28px] border border-white/40 bg-[linear-gradient(180deg,rgba(189,22,22,0.18),rgba(255,255,255,0.35))] p-6 shadow-[var(--shadow-soft)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_35%),radial-gradient(circle_at_70%_75%,rgba(184,138,74,0.35),transparent_25%)]" />
              <div className="animate-float-slow absolute left-8 top-8 h-28 w-28 rounded-full border border-white/45 bg-[radial-gradient(circle,rgba(255,255,255,0.62),rgba(255,255,255,0.08))] backdrop-blur-sm" />
              <div className="animate-float-delayed absolute bottom-12 right-8 h-40 w-40 rounded-full border border-[rgba(255,255,255,0.35)] bg-[radial-gradient(circle,rgba(184,138,74,0.18),rgba(255,255,255,0.08))] backdrop-blur-sm" />
              <div className="animate-pulse-glow absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(189,22,22,0.18),transparent_72%)] blur-xl" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-[var(--color-primary)]">
                    Для вас
                  </p>
                  <p className="mt-4 max-w-xs text-3xl leading-tight">{invitation.title}</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-[22px] border border-white/45 bg-white/50 p-4 backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
                      Акцентный блок
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                      Здесь позже может появиться фотография, объемная композиция или
                      тонкий 3D-акцент с дорогим плавным движением.
                    </p>
                  </div>
                  <p className="max-w-sm text-sm leading-7 text-[var(--color-text-muted)]">
                    Сейчас этот экран уже держит нужное настроение, а дальше мы можем
                    сделать его еще богаче за счет motion и реального контента.
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="snap-stage py-5 sm:py-6">
          <div className="snap-stage-inner grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <article className="panel-hover rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                О дне
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)] text-balance">
                {siteContent.story}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[22px] border border-[var(--color-border)] bg-white/65 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Настроение
                  </p>
                  <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                    Мягкий свет, торжественность, любимые люди и ощущение большого красивого дня.
                  </p>
                </div>
                <div className="rounded-[22px] border border-[var(--color-border)] bg-white/65 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Подача
                  </p>
                  <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
                    Здесь удобно держать эмоцию и полезную информацию в одном спокойном ритме.
                  </p>
                </div>
              </div>
            </article>

            <article className="panel-hover rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                Детали
              </p>
              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-sm text-[var(--color-text-muted)]">Дата</dt>
                  <dd className="mt-1 text-xl">{siteContent.eventDate}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-text-muted)]">Время сбора</dt>
                  <dd className="mt-1 text-xl">{siteContent.eventTime}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-text-muted)]">Локация</dt>
                  <dd className="mt-1 text-xl">{siteContent.venueName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-[var(--color-text-muted)]">Адрес</dt>
                  <dd className="mt-1 text-base leading-7 text-[var(--color-text)]">
                    {siteContent.venueAddress}
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section className="snap-stage py-5 sm:py-6">
          <div className="snap-stage-inner grid gap-8 lg:grid-cols-[1fr_1fr]">
            <article className="panel-hover rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                Как добраться
              </p>
              <div className="mt-6 rounded-[24px] border border-[var(--color-border)] bg-white/70 p-6">
                <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-[var(--color-border)] bg-[rgba(189,22,22,0.05)] text-sm text-[var(--color-text-muted)]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(189,22,22,0.08),transparent_42%,rgba(184,138,74,0.12))]" />
                  <div className="absolute inset-6 rounded-[16px] border border-white/60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.45),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.52),rgba(255,255,255,0.18))]" />
                  <div className="relative text-center">
                    <p>Здесь будет карта и кнопка построения маршрута</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                      placeholder map
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
                  {siteContent.routeDetails}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm">
                    Кнопка маршрута
                  </div>
                  <div className="rounded-full border border-[var(--color-border)] bg-white/80 px-4 py-2 text-sm">
                    Адрес площадки
                  </div>
                </div>
              </div>
            </article>

            <article className="panel-hover rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                Правила и пожелания
              </p>
              <div className="mt-6 grid gap-4">
                <div className="rounded-[24px] border border-[var(--color-border)] bg-white/70 p-6">
                  <h3 className="text-xl">Дресс-код</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {siteContent.dressCode}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[var(--color-border)] bg-white/70 p-6">
                  <h3 className="text-xl">Пожелания</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
                    {siteContent.wishes}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="snap-stage py-5 sm:py-6">
          <div className="snap-stage-inner">
            <InvitationQuestionnaireSection
              invitationToken={invitation.token}
              guests={invitation.guests}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
