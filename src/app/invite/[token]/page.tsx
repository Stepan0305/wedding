import Image from "next/image";
import { notFound } from "next/navigation";

import { InvitationCountdown } from "@/components/invitation/invitation-countdown";
import { InvitationQuestionnaireSection } from "@/components/invitation/invitation-questionnaire-section";
import { MemoryCameraScene } from "@/components/invitation/memory-camera-scene";
import { getInvitationByToken } from "@/lib/server/invitations-repository";
import { siteContent } from "@/lib/site-content";

type InvitationPageProps = {
  params: Promise<{
    token: string;
  }>;
};

function SceneScrollCue() {
  return (
    <div className="scroll-cue" aria-hidden="true">
      <div className="scroll-cue-line" />
      <div className="scroll-cue-chevron" />
    </div>
  );
}

function SceneSection({
  children,
  showCue = true,
}: {
  children: React.ReactNode;
  showCue?: boolean;
}) {
  return (
    <section className="snap-stage px-5 py-5 sm:px-8 sm:py-6 lg:px-10">
      <div className="snap-stage-inner">{children}</div>
      {showCue ? <SceneScrollCue /> : null}
    </section>
  );
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { token } = await params;
  const invitation = getInvitationByToken(token);

  if (!invitation) {
    notFound();
  }

  return (
    <main className="h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-transparent text-[var(--color-text)] overscroll-y-contain">
      <div className="pointer-events-none fixed inset-0 bg-[url('/images/invitation-background-pattern.png')] bg-cover bg-center bg-no-repeat opacity-60" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(247,250,255,0.68),rgba(238,243,251,0.58),rgba(237,242,248,0.72))]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 h-[42rem] bg-[var(--gradient-hero)]" />
      <div className="pointer-events-none fixed left-[-8rem] top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(189,22,22,0.18),transparent_68%)] blur-3xl animate-float-slow" />
      <div className="pointer-events-none fixed right-[-6rem] top-8 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.28),transparent_60%)] blur-3xl animate-float-delayed" />
      <div className="pointer-events-none fixed inset-x-0 top-[28rem] h-96 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.3),transparent)]" />

      <div className="relative mx-auto w-full max-w-6xl">
        <SceneSection>
          <MemoryCameraScene />
        </SceneSection>

        <SceneSection>
          <section className="story-scene story-scene-curtain-closed">
            <div className="curtain-frame">
              <Image
                src="/images/references/curtain-reference-closed.png"
                alt="Закрытые шторы"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </section>
        </SceneSection>

        <SceneSection>
          <section className="story-scene story-scene-hero-reveal">
            <div className="curtain-frame curtain-frame-open">
              <Image
                src="/images/references/curtain-reference-open.png"
                alt="Открывающиеся шторы"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>

            <div className="hero-reveal-shell">
              <div className="hero-reveal-copy">
                <p className="story-kicker">Свадебное приглашение</p>
                <h2 className="hero-reveal-title">Степан & Елизавета</h2>
                <p className="hero-reveal-message">
                  {invitation.title}, приглашаем вас на свою свадьбу
                </p>
              </div>

              <div className="hero-reveal-photo-wrap">
                <div className="hero-reveal-photo">
                  <Image
                    src="/images/couple-hero.jpg"
                    alt="Степан и Елизавета"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 56vw"
                  />
                </div>
              </div>
            </div>
          </section>
        </SceneSection>

        <SceneSection>
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <article className="panel-hover glass-panel flex min-h-[calc(100svh-4rem)] flex-col rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                  Детали дня
                </p>
                <h2 className="mt-4 text-3xl">Дата, время сбора и обратный отсчет</h2>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="glass-panel rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.36)] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Дата
                  </p>
                  <p className="mt-4 text-xl">{siteContent.eventDate}</p>
                </div>
                <div className="glass-panel rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.36)] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Сбор гостей
                  </p>
                  <p className="mt-4 text-xl">{siteContent.eventTime}</p>
                </div>
                <div className="glass-panel rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.36)] p-5">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-primary)]">
                    Локация
                  </p>
                  <p className="mt-4 text-xl">{siteContent.venueName}</p>
                </div>
              </div>

              <div className="mt-8">
                <InvitationCountdown targetDate={siteContent.countdownTarget} />
              </div>
            </article>

            <article className="panel-hover glass-panel flex min-h-[calc(100svh-4rem)] flex-col rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                  Как добраться
                </p>
                <h2 className="mt-4 text-3xl">Путь до площадки</h2>
              </div>

              <div className="glass-panel mt-8 rounded-[24px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.36)] p-6">
                <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-[var(--color-border)] bg-[rgba(255,255,255,0.24)] text-sm text-[var(--color-text-muted)]">
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(189,22,22,0.08),transparent_42%,rgba(122,164,255,0.12))]" />
                  <div className="absolute inset-6 rounded-[16px] border border-white/30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.36),transparent_38%),linear-gradient(135deg,rgba(255,255,255,0.36),rgba(255,255,255,0.12))]" />
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
                <div className="glass-panel mt-5 rounded-[18px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.3)] px-4 py-4 text-sm leading-7 text-[var(--color-text)]">
                  {siteContent.venueAddress}
                </div>
              </div>
            </article>
          </div>
        </SceneSection>

        <SceneSection>
          <InvitationQuestionnaireSection
            invitationToken={invitation.token}
            guests={invitation.guests}
          />
        </SceneSection>

        <SceneSection showCue={false}>
          <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <article className="panel-hover glass-panel flex min-h-[calc(100svh-4rem)] flex-col justify-center rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
              <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
                Часто задаваемые вопросы
              </p>
              <h2 className="mt-4 text-4xl leading-tight">Все важное в одном месте</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-text-muted)]">
                Здесь собраны ответы на вопросы, которые чаще всего возникают перед
                праздником. Позже мы наполним этот блок вашими финальными формулировками.
              </p>
            </article>

            <div className="grid gap-4">
              {siteContent.faq.map((item) => (
                <article
                  key={item.question}
                  className="panel-hover glass-panel rounded-[28px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.34)] p-6 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-2xl">{item.question}</h3>
                  <p className="mt-4 text-sm leading-8 text-[var(--color-text-muted)]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </SceneSection>
      </div>
    </main>
  );
}
