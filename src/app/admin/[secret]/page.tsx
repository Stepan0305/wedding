import { adminSecret, alcoholOptionLabels, getAllGuests } from "@/lib/mock-data";

type AdminPageProps = {
  params: Promise<{
    secret: string;
  }>;
};

export default async function AdminPage({ params }: AdminPageProps) {
  const { secret } = await params;

  if (secret !== adminSecret) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-6 text-[var(--color-text)]">
        <div className="max-w-lg rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-10 text-center shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
            Служебный маршрут
          </p>
          <h1 className="mt-5 text-3xl">Эта ссылка неактивна</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">
            Для первой версии админка будет открываться только по заранее известному
            непубличному пути.
          </p>
        </div>
      </main>
    );
  }

  const guests = getAllGuests().sort((left, right) => {
    if (left.groupTitle === right.groupTitle) {
      return left.sortOrder - right.sortOrder;
    }

    return left.groupTitle.localeCompare(right.groupTitle, "ru");
  });

  const totals = Object.entries(alcoholOptionLabels).map(([key, label]) => ({
    key,
    label,
    total: guests.reduce(
      (count, guest) =>
        guest.alcoholPreferences.includes(key as keyof typeof alcoholOptionLabels)
          ? count + 1
          : count,
      0,
    ),
  }));

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 py-6 text-[var(--color-text)] sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface)] p-8 shadow-[var(--shadow-soft)]">
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
            Админка
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl">Ответы гостей</h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--color-text-muted)]">
                Это первая версия служебной страницы: она показывает список гостей,
                комментарии и быструю сводку по алкогольным предпочтениям.
              </p>
            </div>
            <div className="rounded-[24px] border border-[var(--color-border)] bg-white/70 px-5 py-4 text-sm text-[var(--color-text-muted)]">
              Секретный путь: <span className="font-medium text-[var(--color-text)]">/admin/{adminSecret}</span>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {totals.map((item) => (
            <article
              key={item.key}
              className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5 shadow-[var(--shadow-soft)]"
            >
              <p className="text-sm leading-6 text-[var(--color-text-muted)]">{item.label}</p>
              <p className="mt-4 text-4xl">{item.total}</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-[32px] border border-[var(--color-border)] bg-[var(--color-surface-strong)] shadow-[var(--shadow-soft)]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-[rgba(189,22,22,0.06)] text-left text-sm text-[var(--color-text-muted)]">
                  <th className="px-5 py-4 font-medium">Группа</th>
                  <th className="px-5 py-4 font-medium">Гость</th>
                  <th className="px-5 py-4 font-medium">Статус</th>
                  <th className="px-5 py-4 font-medium">Алкоголь</th>
                  <th className="px-5 py-4 font-medium">Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.id} className="align-top">
                    <td className="border-t border-[var(--color-border)] px-5 py-4">
                      <div className="min-w-48">
                        <p className="font-medium">{guest.groupTitle}</p>
                        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                          /invite/{guest.token}
                        </p>
                      </div>
                    </td>
                    <td className="border-t border-[var(--color-border)] px-5 py-4">{guest.name}</td>
                    <td className="border-t border-[var(--color-border)] px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          guest.isSubmitted
                            ? "bg-[rgba(184,138,74,0.18)]"
                            : "bg-[rgba(189,22,22,0.08)] text-[var(--color-primary)]"
                        }`}
                      >
                        {guest.isSubmitted ? "Заполнено" : "Нет ответа"}
                      </span>
                    </td>
                    <td className="border-t border-[var(--color-border)] px-5 py-4">
                      <div className="flex min-w-48 flex-wrap gap-2">
                        {guest.alcoholPreferences.length > 0 ? (
                          guest.alcoholPreferences.map((option) => (
                            <span
                              key={option}
                              className="rounded-full border border-[var(--color-border)] bg-white px-3 py-1 text-xs"
                            >
                              {alcoholOptionLabels[option]}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-[var(--color-text-muted)]">Пока пусто</span>
                        )}
                      </div>
                    </td>
                    <td className="border-t border-[var(--color-border)] px-5 py-4 text-sm leading-7 text-[var(--color-text-muted)]">
                      {guest.comment || "Комментарий отсутствует"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
