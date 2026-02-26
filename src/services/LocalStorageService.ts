export class LocalStorageService {
  static setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, String(value));
  }

  static getItem<T>(key: string, defaultValue: T): T {
    const saved = localStorage.getItem(key);
    if (saved === null) return defaultValue;
    if (typeof defaultValue === "number") return Number(saved) as T;
    if (typeof defaultValue === "boolean") return (saved === "true") as T;
    return saved as T;
  }
}
