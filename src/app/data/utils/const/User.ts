export interface UserLoginInterface {
    name: string;
    email: string;
    photo_profile: string | null;
    primary_color: string | null;
    restaurant_id: number | null;
    secondary_color: string | null;
}

export const UserLocalStorage = ():UserLoginInterface | null => {
    const userLocalStorage = localStorage.getItem('user')
    if(userLocalStorage) {
        return JSON.parse(userLocalStorage);
    }
    return null;
}