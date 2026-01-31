export interface JwtPayload {
    id: string;
    name?: string;
    role?: string;
    iat?: number;
    exp?: number;
}