import { jwtDecode } from "jwt-decode";

export class StoreItem<T> {
  itemName: string;

  constructor(itemName: string) {
    this.itemName = itemName;
  }

  async get(): Promise<T | null> {
    const data = localStorage.getItem(this.itemName);
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  async set(newItemValue: T): Promise<void> {
    localStorage.setItem(this.itemName, JSON.stringify(newItemValue));
  }

  async delete(): Promise<void> {
    localStorage.removeItem(this.itemName);
  }
}

export class JWTStoreItem extends StoreItem<string> {
  constructor(itemName: string) {
    super(itemName);
  }

  async decode() {
    const token = await this.get();
    if (!token) return null;
    return jwtDecode(token);
  }
}
