import { jwtDecode } from "jwt-decode";

export class StoreItem {
  itemName: string;

  constructor(itemName: string) {
    this.itemName = itemName;
  }

  async get(): Promise<string> {
    return localStorage.getItem(this.itemName) ?? "";
  }

  async set(newItemValue: string): Promise<void> {
    localStorage.setItem(this.itemName, newItemValue);
  }

  async delete(): Promise<void> {
    localStorage.removeItem(this.itemName);
  }
}

export class JWTStoreItem extends StoreItem {
  constructor(itemName: string) {
    super(itemName);
  }

  async decode() {
    const token = await this.get();
    if (!token) return null;
    return jwtDecode(token);
  }
}
