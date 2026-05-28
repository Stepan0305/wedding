"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  alcoholOptionLabels,
  type AlcoholOption,
  type GuestRecord,
} from "@/lib/invitations";

type GuestResponseCardProps = {
  invitationToken: string;
  guest: GuestRecord;
};

export function GuestResponseCard({
  invitationToken,
  guest,
}: GuestResponseCardProps) {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<AlcoholOption[]>(
    guest.alcoholPreferences,
  );
  const [comment, setComment] = useState(guest.comment);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const showAlcoholForm = guest.isAlcoholic;
  const alcoholOptions = useMemo(
    () => Object.entries(alcoholOptionLabels) as Array<[AlcoholOption, string]>,
    [],
  );
  const exclusiveOptions = useMemo(
    () => new Set<AlcoholOption>(["no_alcohol", "no_preference"]),
    [],
  );

  function toggleOption(option: AlcoholOption) {
    setSelectedOptions((current) => {
      const isSelected = current.includes(option);

      if (isSelected) {
        return current.filter((value) => value !== option);
      }

      if (exclusiveOptions.has(option)) {
        return [option];
      }

      return [...current.filter((value) => !exclusiveOptions.has(value)), option];
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    startTransition(async () => {
      const response = await fetch(
        `/api/invitations/${invitationToken}/guests/${guest.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            alcoholPreferences: selectedOptions,
            comment,
          }),
        },
      );

      if (!response.ok) {
        setErrorMessage("Не удалось сохранить анкету. Попробуйте еще раз.");
        return;
      }

      setSuccessMessage("Анкета сохранена.");
      router.refresh();
    });
  }

  return (
    <article className="panel-hover glass-panel relative overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-6 shadow-[var(--shadow-soft)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="animate-shimmer-line h-px w-1/3 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)]" />
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(189,22,22,0.18),transparent_68%)]" />

      <div className="flex items-start justify-between gap-4">
        <div className="relative">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-[var(--color-primary)]">
            {showAlcoholForm ? "Анкета гостя" : "Гость приглашения"}
          </p>
          <h3 className="mt-3 text-2xl text-[var(--color-text)]">{guest.name}</h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            !showAlcoholForm
              ? "bg-[rgba(255,255,255,0.34)] text-[var(--color-text-muted)]"
              : guest.isSubmitted
              ? "bg-[rgba(184,138,74,0.18)] text-[var(--color-text)]"
              : "bg-[rgba(189,22,22,0.08)] text-[var(--color-primary)]"
          }`}
        >
          {!showAlcoholForm
            ? "Без алкогольной анкеты"
            : guest.isSubmitted
              ? "Заполнено"
              : "Ожидает ответа"}
        </span>
      </div>

      <div className="relative mt-6">
        {showAlcoholForm ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">
                Предпочтения по алкоголю
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {alcoholOptions.map(([option, label]) => {
                  const isSelected = selectedOptions.includes(option);

                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={isPending}
                      onClick={() => toggleOption(option)}
                      className={`rounded-full border px-3 py-2 text-sm transition ${
                        isSelected
                          ? "border-[var(--color-primary)] bg-[rgba(189,22,22,0.12)] text-[var(--color-primary)]"
                          : "border-[var(--color-border)] bg-[rgba(255,255,255,0.34)] text-[var(--color-text)] shadow-[0_10px_30px_rgba(89,112,153,0.1)]"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor={`guest-comment-${guest.id}`}
                className="text-sm font-medium text-[var(--color-text)]"
              >
                Комментарий
              </label>
              <textarea
                id={`guest-comment-${guest.id}`}
                value={comment}
                disabled={isPending}
                onChange={(event) => setComment(event.target.value)}
                rows={4}
                className="glass-panel mt-3 w-full resize-none rounded-[20px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.32)] px-4 py-3 text-sm leading-7 text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)]"
                placeholder="Здесь можно оставить дополнительный комментарий"
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-accent)] disabled:cursor-wait disabled:opacity-70"
              >
                {isPending ? "Сохраняем..." : guest.isSubmitted ? "Сохранить изменения" : "Сохранить анкету"}
              </button>

              {errorMessage ? (
                <p className="text-sm text-[var(--color-primary)]">{errorMessage}</p>
              ) : null}

              {successMessage ? (
                <p className="text-sm text-[var(--color-text-muted)]">{successMessage}</p>
              ) : null}
            </div>
          </form>
        ) : (
          <>
            <p className="text-sm font-medium text-[var(--color-text)]">Анкета</p>
            <div className="glass-panel mt-3 rounded-[20px] border border-[var(--color-border)] bg-[rgba(255,255,255,0.32)] px-4 py-4 text-sm leading-7 text-[var(--color-text-muted)]">
              Для этого гостя алкогольная анкета не показывается.
            </div>
          </>
        )}
      </div>
    </article>
  );
}
