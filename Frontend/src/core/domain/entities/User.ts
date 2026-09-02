export interface UserProfile {
  id: string;
  email: string;
  username: string;
  roles: string[];
}

export interface JwtClaims {
  sub?: string;
  nameid?: string;
  email?: string;
  unique_name?: string;
  username?: string;
  name?: string;
  role?: string | string[];
  exp?: number;
  [key: string]: unknown;
}
