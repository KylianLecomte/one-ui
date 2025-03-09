export const LocalStorageUtils = {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove(key: string): void {
    localStorage.removeItem(key);
  },

  get<T>(key: string): T | undefined {
    const data: string | null = localStorage.getItem(key);

    if (!data) return undefined;

    try {
      return JSON.parse(data ?? '') as T;
    } catch (e) {
      console.error('Failed to parse json:', key);
      console.error('Error:', e);
      return undefined;
    }
  },
};
