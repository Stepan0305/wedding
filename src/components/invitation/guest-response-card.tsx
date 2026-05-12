import { alcoholOptionLabels, type GuestRecord } from "@/lib/invitations";

type GuestResponseCardProps = {
  guest: GuestRecord;
};

export function GuestResponseCard({ guest }: GuestResponseCardProps) {
  return (
    <article className="panel-hover relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="animate-shimmer-line h-px w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)]" />
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(189,22,22,0.18),transparent_68%)]" />

      <div className="flex items-start justify-between gap-4">
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-primary)]">
            Анкета гостя
          </p>
          <h3 className="mt-3 text-2xl text-[var(--color-text)]">{guest.name}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            guest.isSubmitted
              ? "bg-[rgba(184,138,74,0.18)] text-[var(--color-text)]"
              : "bg-[rgba(189,22,22,0.08)] text-[var(--color-primary)]"
          }`}
        >
          {guest.isSubmitted ? "Заполнено" : "Ожидает ответа"}
        </span>
      </div>

      <div className="relative mt-6">
        <p className="text-sm font-medium text-[var(--color-text)]">Предпочтения по алкоголю</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {guest.alcoholPreferences.length > 0 ? (
            guest.alcoholPreferences.map((option) => (
              <span
                key={option}
                className="rounded-full border border-[var(--color-border)] bg-white/70 px-3 py-2 text-sm text-[var(--color-text)] shadow-[0_10px_30px_rgba(189,22,22,0.06)]"
              >
                {alcoholOptionLabels[option]}
              </span>
            ))
          ) : (
            <span className="text-sm text-[var(--color-text-muted)]">
              Здесь позже появится выбор гостя.
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-[var(--color-border)] pt-6">
        <p className="text-sm font-medium text-[var(--color-text)]">Комментарий</p>
        <p className="mt-3 text-sm leading-7 text-[var(--color-text-muted)]">
          {guest.comment || "Комментарий пока не добавлен."}
        </p>
      </div>
    </article>
  );
}
