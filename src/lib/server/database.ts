import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

import type { AlcoholOption } from "@/lib/invitations";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "wedding.sqlite");

declare global {
  var __weddingDb: DatabaseSync | undefined;
}

type GroupRow = {
  id: number;
  token: string;
  title: string;
  created_at: string;
  updated_at: string;
};

type GuestRow = {
  id: number;
  group_id: number;
  name: string;
  sort_order: number;
  alcohol_preferences: string;
  comment: string;
  is_submitted: number;
  submitted_at: string | null;
  updated_at: string;
};

function ensureDatabaseFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function seedDatabase(database: DatabaseSync) {
  const now = new Date().toISOString();

  const insertGroup = database.prepare(`
    INSERT INTO invitation_groups (token, title, created_at, updated_at)
    VALUES (?, ?, ?, ?)
  `);

  const groupResult = insertGroup.run("demo", "Анна, Дмитрий и София", now, now);
  const groupId = Number(groupResult.lastInsertRowid);

  const insertGuest = database.prepare(`
    INSERT INTO guests (
      group_id,
      name,
      sort_order,
      alcohol_preferences,
      comment,
      is_submitted,
      submitted_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const guests: Array<{
    name: string;
    sortOrder: number;
    alcoholPreferences: AlcoholOption[];
    comment: string;
    isSubmitted: boolean;
    submittedAt: string | null;
  }> = [
    {
      name: "Анна",
      sortOrder: 1,
      alcoholPreferences: ["champagne", "cocktails"],
      comment: "С радостью буду с вами. Если что-то изменится, напишу лично.",
      isSubmitted: true,
      submittedAt: "2026-05-11T16:45:00.000Z",
    },
    {
      name: "Дмитрий",
      sortOrder: 2,
      alcoholPreferences: ["strong_alcohol"],
      comment: "",
      isSubmitted: true,
      submittedAt: "2026-05-11T17:10:00.000Z",
    },
    {
      name: "София",
      sortOrder: 3,
      alcoholPreferences: [],
      comment: "",
      isSubmitted: false,
      submittedAt: null,
    },
  ];

  for (const guest of guests) {
    insertGuest.run(
      groupId,
      guest.name,
      guest.sortOrder,
      JSON.stringify(guest.alcoholPreferences),
      guest.comment,
      guest.isSubmitted ? 1 : 0,
      guest.submittedAt,
      guest.submittedAt ?? now,
    );
  }
}

function initializeDatabase(database: DatabaseSync) {
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS invitation_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS guests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      group_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      alcohol_preferences TEXT NOT NULL DEFAULT '[]',
      comment TEXT NOT NULL DEFAULT '',
      is_submitted INTEGER NOT NULL DEFAULT 0,
      submitted_at TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (group_id) REFERENCES invitation_groups(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS guests_group_id_idx ON guests(group_id);
    CREATE INDEX IF NOT EXISTS invitation_groups_token_idx ON invitation_groups(token);
  `);

  const groupCountRow = database
    .prepare("SELECT COUNT(*) AS count FROM invitation_groups")
    .get() as { count: number };

  if (groupCountRow.count === 0) {
    seedDatabase(database);
  }
}

export function getDatabase() {
  if (!globalThis.__weddingDb) {
    ensureDatabaseFile();

    const database = new DatabaseSync(DB_PATH);
    initializeDatabase(database);
    globalThis.__weddingDb = database;
  }

  return globalThis.__weddingDb;
}

export function mapGroupRow(row: GroupRow) {
  return {
    id: row.id,
    token: row.token,
    title: row.title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapGuestRow(row: GuestRow) {
  return {
    id: row.id,
    name: row.name,
    sortOrder: row.sort_order,
    alcoholPreferences: JSON.parse(row.alcohol_preferences) as AlcoholOption[],
    comment: row.comment,
    isSubmitted: Boolean(row.is_submitted),
    submittedAt: row.submitted_at,
    updatedAt: row.updated_at,
  };
}
