import { apiRequest } from './config';

export const loginUser = async (email: string, password: string) => {
    return apiRequest<any>('/login', 'POST', { email, password });
};

export const registerUser = async (name: string, email: string, password: string) => {
    return apiRequest<any>('/register', 'POST', { name, email, password });
};

export const updateProfile = async (userId: number, name: string, email: string, profilePhoto?: string) => {
    return apiRequest<any>(`/update_profile/${userId}`, 'PUT', { name, email, profile_photo: profilePhoto });
};

export const forgotPassword = async (email: string, newPassword: string) => {
    return apiRequest<any>('/forgot_password', 'POST', { email, new_password: newPassword });
};

export const forgotPasswordEmail = async (email: string) => {
    return apiRequest<any>('/forgot_password_email', 'POST', { email });
};
