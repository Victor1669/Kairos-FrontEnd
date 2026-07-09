export interface ContentUserType {
  id: number;
  email: string;
  role: "user" | "admin";
}

export interface CompleteUserType extends ContentUserType {
  name: string;
  phone: string;
  cpf: string;
}
