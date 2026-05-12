export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 text-[var(--color-text)]">
      <div className="max-w-xl rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-10 text-center shadow-[var(--shadow-soft)]">
        <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
          Частное приглашение
        </p>
        <h1 className="mt-5 text-4xl">Эта страница доступна только по персональной ссылке</h1>
        <p className="mt-5 text-sm leading-7 text-[var(--color-text-muted)]">
          Свадебный сайт не имеет публичной главной страницы. Для просмотра приглашения
          нужна персональная ссылка, а для служебного раздела — отдельный скрытый маршрут.
        </p>
      </div>
    </main>
  );
}
