"use client";

import { useEffect, useMemo, useState } from "react";

type InvitationCountdownProps = {
  targetDate: string;
};

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdownState(targetDate: string): CountdownState {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const difference = Math.max(target - now, 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export function InvitationCountdown({ targetDate }: InvitationCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() =>
    getCountdownState(targetDate),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownState(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const countdownItems = useMemo(
    () => [
      { label: "дней", value: countdown.days },
      { label: "часов", value: countdown.hours },
      { label: "минут", value: countdown.minutes },
      { label: "секунд", value: countdown.seconds },
    ],
    [countdown],
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {countdownItems.map((item) => (
        <div
          key={item.label}
          className="rounded-[22px] border border-[var(--color-border)] bg-white/80 px-4 py-5 text-center shadow-[0_14px_35px_rgba(189,22,22,0.06)]"
        >
          <div className="text-3xl font-medium text-[var(--color-text)] sm:text-4xl">
            {String(item.value).padStart(2, "0")}
          </div>
          <div className="mt-2 text-xs uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
