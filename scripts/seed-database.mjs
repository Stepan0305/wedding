import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const rootDir = process.cwd();
const dataDir = path.join(rootDir, "data");
const dbPath = path.join(dataDir, "wedding.sqlite");
const seedPath = path.join(rootDir, "seed", "guest-groups.json");

const seedGroups = JSON.parse(fs.readFileSync(seedPath, "utf8"));

fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(dbPath);

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = OFF;

  DROP TABLE IF EXISTS guests;
  DROP TABLE IF EXISTS invitation_groups;

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
    is_alcoholic INTEGER NOT NULL DEFAULT 1,
    alcohol_preferences TEXT NOT NULL DEFAULT '[]',
    comment TEXT NOT NULL DEFAULT '',
    is_submitted INTEGER NOT NULL DEFAULT 0,
    submitted_at TEXT,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (group_id) REFERENCES invitation_groups(id) ON DELETE CASCADE
    );

  PRAGMA foreign_keys = ON;
`);

const insertGroup = db.prepare(`
  INSERT INTO invitation_groups (token, title, created_at, updated_at)
  VALUES (?, ?, ?, ?)
`);

const insertGuest = db.prepare(`
  INSERT INTO guests (
    group_id,
    name,
    sort_order,
    is_alcoholic,
    alcohol_preferences,
    comment,
    is_submitted,
    submitted_at,
    updated_at
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const now = new Date().toISOString();

for (const group of seedGroups) {
  const groupResult = insertGroup.run(group.token, group.title, now, now);
  const groupId = Number(groupResult.lastInsertRowid);

  for (const guest of group.guests) {
    insertGuest.run(
      groupId,
      guest.name,
      guest.sortOrder,
      guest.isAlcoholic ? 1 : 0,
      "[]",
      "",
      0,
      null,
      now,
    );
  }
}

console.log(
  `Seeded ${seedGroups.length} invitation groups and ${seedGroups.reduce((sum, group) => sum + group.guests.length, 0)} guests into ${dbPath}`,
);
