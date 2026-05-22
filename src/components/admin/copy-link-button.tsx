"use client";

import { useState, useTransition } from "react";

type CopyLinkButtonProps = {
  href: string;
};

export function CopyLinkButton({ href }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleCopy() {
    startTransition(async () => {
      try {
        await navigator.clipboard.writeText(window.location.origin + href);
        setCopied(true);

        window.setTimeout(() => {
          setCopied(false);
        }, 1800);
      } catch {
        setCopied(false);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={isPending}
      className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-xs font-medium text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:bg-[rgba(189,22,22,0.06)] disabled:cursor-wait disabled:opacity-70"
    >
      {copied ? "Ссылка скопирована" : isPending ? "Копируем..." : "Копировать ссылку"}
    </button>
  );
}
