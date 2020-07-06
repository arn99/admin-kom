export interface UserInterface {
    uid?: string;
    email: string;
    password?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    phoneNumber?: number;
    district?: string;
    roles?: [string];

 }
