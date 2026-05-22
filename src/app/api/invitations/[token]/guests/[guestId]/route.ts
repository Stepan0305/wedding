import { NextResponse } from "next/server";

import {
  alcoholOptionLabels,
  type AlcoholOption,
} from "@/lib/invitations";
import { updateGuestResponse } from "@/lib/server/invitations-repository";

type RouteContext = {
  params: Promise<{
    token: string;
    guestId: string;
  }>;
};

type RequestBody = {
  alcoholPreferences?: unknown;
  comment?: unknown;
};

const allowedAlcoholOptions = new Set<AlcoholOption>(
  Object.keys(alcoholOptionLabels) as AlcoholOption[],
);
const exclusiveAlcoholOptions = new Set<AlcoholOption>([
  "no_alcohol",
  "no_preference",
]);

export async function PATCH(request: Request, context: RouteContext) {
  const { token, guestId } = await context.params;

  const guestIdNumber = Number(guestId);

  if (!Number.isInteger(guestIdNumber) || guestIdNumber <= 0) {
    return NextResponse.json({ error: "invalid_guest_id" }, { status: 400 });
  }

  const body = (await request.json()) as RequestBody;
  const rawPreferences = body.alcoholPreferences;
  const rawComment = body.comment;

  if (!Array.isArray(rawPreferences)) {
    return NextResponse.json({ error: "invalid_alcohol_preferences" }, { status: 400 });
  }

  const alcoholPreferences = rawPreferences.filter(
    (value): value is AlcoholOption =>
      typeof value === "string" && allowedAlcoholOptions.has(value as AlcoholOption),
  );

  if (alcoholPreferences.length !== rawPreferences.length) {
    return NextResponse.json({ error: "invalid_alcohol_option" }, { status: 400 });
  }

  const hasExclusiveSelection = alcoholPreferences.some((option) =>
    exclusiveAlcoholOptions.has(option),
  );

  if (hasExclusiveSelection && alcoholPreferences.length > 1) {
    return NextResponse.json(
      { error: "exclusive_alcohol_option_conflict" },
      { status: 400 },
    );
  }

  if (typeof rawComment !== "string") {
    return NextResponse.json({ error: "invalid_comment" }, { status: 400 });
  }

  const result = updateGuestResponse({
    token,
    guestId: guestIdNumber,
    alcoholPreferences,
    comment: rawComment,
  });

  if (!result.ok) {
    const statusByReason = {
      not_found: 404,
      forbidden: 403,
      not_applicable: 409,
    } as const;

    return NextResponse.json({ error: result.reason }, { status: statusByReason[result.reason] });
  }

  return NextResponse.json({ ok: true });
}
