import { openDatabaseAsync, SQLiteDatabase } from 'expo-sqlite';

let db: SQLiteDatabase;

// Инициализация базы
export const initDatabase = async () => {
    db = await openDatabaseAsync('menu.db');
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS menu (
                                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                                            name TEXT NOT NULL,
                                            price REAL NOT NULL,
                                            description TEXT,
                                            image TEXT,
                                            category TEXT
        );
    `);
};

// Добавление одного блюда
export const insertItem = async (item: {
    name: string;
    price: number;
    description: string;
    image: string;
    category?: string;
}) => {
    const { name, price, description, image, category = '' } = item;
    await db.runAsync(
        'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);',
        [name, price, description, image, category]
    );
};

// Получение всех блюд
export const getAllItems = async (): Promise<any[]> => {
    const result = await db.getAllAsync('SELECT * FROM menu;');
    return result;
};

// Поиск по названию или категории
export const searchItems = async (search: string): Promise<any[]> => {
    const result = await db.getAllAsync(
        `SELECT * FROM menu WHERE name LIKE ? OR category LIKE ?;`,
        [`%${search}%`, `%${search}%`]
    );
    return result;
};

// Очистка таблицы
export const resetDatabase = async () => {
    await db.execAsync(`DROP TABLE IF EXISTS menu;`);
    await initDatabase();
};
