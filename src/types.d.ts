interface Common {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}

type Roles = "user" | "manager" | "admin" | "secretary";
type SESSION = {
  id?: number;
  role?: Roles;
  exp?: number;
};

interface USER extends Common {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  dob?: string;
  address?: string;
  photo?: string;
  refresh_token?: string;
  role?: Roles;
}
