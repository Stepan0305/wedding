import type { AdminGuestRecord, InvitationGroup } from "@/lib/invitations";
import { getDatabase, mapGroupRow, mapGuestRow } from "@/lib/server/database";

export function getInvitationByToken(token: string): InvitationGroup | null {
  const database = getDatabase();

  const groupRow = database
    .prepare(
      `
        SELECT id, token, title, created_at, updated_at
        FROM invitation_groups
        WHERE token = ?
      `,
    )
    .get(token);

  if (!groupRow) {
    return null;
  }

  const group = mapGroupRow(groupRow as Parameters<typeof mapGroupRow>[0]);
  const guestRows = database
    .prepare(
      `
        SELECT
          id,
          group_id,
          name,
          sort_order,
          is_alcoholic,
          alcohol_preferences,
          comment,
          is_submitted,
          submitted_at,
          updated_at
        FROM guests
        WHERE group_id = ?
        ORDER BY sort_order ASC, id ASC
      `,
    )
    .all(group.id);

  return {
    ...group,
    guests: guestRows.map((row) => mapGuestRow(row as Parameters<typeof mapGuestRow>[0])),
  };
}

export function getAllGuests(): AdminGuestRecord[] {
  const database = getDatabase();
  const rows = database
    .prepare(
      `
        SELECT
          guests.id,
          guests.group_id,
          guests.name,
          guests.sort_order,
          guests.is_alcoholic,
          guests.alcohol_preferences,
          guests.comment,
          guests.is_submitted,
          guests.submitted_at,
          guests.updated_at,
          invitation_groups.title AS group_title,
          invitation_groups.token AS token
        FROM guests
        INNER JOIN invitation_groups ON invitation_groups.id = guests.group_id
        ORDER BY invitation_groups.title ASC, guests.sort_order ASC, guests.id ASC
      `,
    )
    .all() as Array<
      Parameters<typeof mapGuestRow>[0] & {
        group_title: string;
        token: string;
      }
    >;

  return rows.map((row) => ({
    ...mapGuestRow(row),
    groupTitle: row.group_title,
    token: row.token,
  }));
}

export function updateGuestResponse(input: {
  token: string;
  guestId: number;
  alcoholPreferences: string[];
  comment: string;
}) {
  const database = getDatabase();

  const guestRow = database
    .prepare(
      `
        SELECT
          guests.id,
          guests.is_alcoholic,
          invitation_groups.token AS token
        FROM guests
        INNER JOIN invitation_groups ON invitation_groups.id = guests.group_id
        WHERE guests.id = ?
      `,
    )
    .get(input.guestId) as
    | {
        id: number;
        is_alcoholic: number;
        token: string;
      }
    | undefined;

  if (!guestRow) {
    return { ok: false as const, reason: "not_found" as const };
  }

  if (guestRow.token !== input.token) {
    return { ok: false as const, reason: "forbidden" as const };
  }

  if (!guestRow.is_alcoholic) {
    return { ok: false as const, reason: "not_applicable" as const };
  }

  const now = new Date().toISOString();
  const normalizedComment = input.comment.trim();

  database
    .prepare(
      `
        UPDATE guests
        SET
          alcohol_preferences = ?,
          comment = ?,
          is_submitted = 1,
          submitted_at = COALESCE(submitted_at, ?),
          updated_at = ?
        WHERE id = ?
      `,
    )
    .run(
      JSON.stringify(input.alcoholPreferences),
      normalizedComment,
      now,
      now,
      input.guestId,
    );

  return { ok: true as const };
}
