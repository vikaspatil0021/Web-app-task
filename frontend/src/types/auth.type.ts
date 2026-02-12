export interface User {
    _id: string,
    name: string,
    email: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}
