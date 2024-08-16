export interface UserResponse {
    _id: string;
    email: string;
    name: string;
    isActive: boolean;
    role: string[];
    createdAt: Date;
    updatedAt: Date;
}