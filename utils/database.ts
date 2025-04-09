import { MenuItem } from '@/types';
import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';

let db: SQLiteDatabase;

export const initDatabase = async () => {
  db = await openDatabaseAsync('little_lemon_v7');
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS menuitems (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT,
      price TEXT,
      description TEXT,
      image TEXT,
      category TEXT
    );
  `);
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  const items = await db.getAllAsync<MenuItem>('SELECT * FROM menuitems;');
  return items;
};

export const saveMenuItems = async (menuItems: MenuItem[]) => {
  if (!menuItems.length) return;

  await db.runAsync('DELETE FROM menuitems');

  const placeholders = menuItems.map(() => '(?, ?, ?, ?, ?, ?)').join(', ');
  const values = menuItems.flatMap(item => [
    item.id,
    item.name,
    item.price,
    item.description,
    item.image,
    item.category,
  ]);

  const query = `
    INSERT INTO menuitems (id, name, price, description, image, category)
    VALUES ${placeholders}
  `;

  await db.runAsync(query, values);
};

export const deleteAllMenuItems = async () => {
  await db.runAsync('DELETE FROM menuitems');
};

export const filterByQueryAndCategories = async (
  query: string,
  activeCategories: string[]
): Promise<MenuItem[]> => {
  if (!activeCategories.length) return [];

  const placeholders = activeCategories.map(() => '?').join(', ');
  const sql = `
    SELECT * FROM menuitems
    WHERE LOWER(name) LIKE ?
    AND category IN (${placeholders})
  `;
  const values = [`%${query.toLowerCase()}%`, ...activeCategories];

  const result = await db.getAllAsync<MenuItem>(sql, values);
  return result;
};
