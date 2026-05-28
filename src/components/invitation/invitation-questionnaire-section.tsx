"use client";

import { useMemo, useState } from "react";

import type { GuestRecord } from "@/lib/invitations";
import { GuestResponseCard } from "@/components/invitation/guest-response-card";

type InvitationQuestionnaireSectionProps = {
  invitationToken: string;
  guests: GuestRecord[];
};

export function InvitationQuestionnaireSection({
  invitationToken,
  guests,
}: InvitationQuestionnaireSectionProps) {
  const sortedGuests = useMemo(
    () => guests.slice().sort((left, right) => left.sortOrder - right.sortOrder),
    [guests],
  );
  const [selectedGuestId, setSelectedGuestId] = useState<number>(
    sortedGuests[0]?.id ?? 0,
  );

  const selectedGuest =
    sortedGuests.find((guest) => guest.id === selectedGuestId) ?? sortedGuests[0];

  if (!selectedGuest) {
    return null;
  }

  return (
    <section className="glass-panel rounded-[32px] border border-[var(--color-border)] bg-[var(--gradient-card)] p-8 shadow-[var(--shadow-soft)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[var(--color-primary)]">
            Анкета гостей
          </p>
          <h2 className="mt-4 text-3xl">Пожалуйста, заполните анкету</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)]">
          Выберите гостя ниже, чтобы открыть его персональную анкету и сохранить
          ответы.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {sortedGuests.map((guest) => {
          const isSelected = guest.id === selectedGuest.id;

          return (
            <button
              key={guest.id}
              type="button"
              onClick={() => setSelectedGuestId(guest.id)}
              className={`rounded-full border px-4 py-3 text-sm font-medium transition ${
                isSelected
                  ? "border-[var(--color-primary)] bg-[rgba(189,22,22,0.12)] text-[var(--color-primary)]"
                  : "border-[var(--color-border)] bg-[rgba(255,255,255,0.34)] text-[var(--color-text)] hover:border-[var(--color-primary)] hover:bg-[rgba(189,22,22,0.06)]"
              }`}
            >
              {guest.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        <GuestResponseCard invitationToken={invitationToken} guest={selectedGuest} />
      </div>
    </section>
  );
}
