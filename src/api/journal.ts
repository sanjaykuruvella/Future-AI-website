import { apiRequest } from './config';

export const addJournal = async (userId: number, entryText: string, mood?: string) => {
    return apiRequest<any>('/journal', 'POST', { user_id: userId, entry_text: entryText, mood });
};

export const getJournals = async (userId: number) => {
    return apiRequest<any[]>(`/journal/${userId}`, 'GET');
};

export const updateJournal = async (journalId: number, entryText: string, mood?: string) => {
    return apiRequest<any>(`/journal/${journalId}`, 'PUT', { entry_text: entryText, mood });
};

export const deleteJournal = async (journalId: number) => {
    return apiRequest<any>(`/journal/${journalId}`, 'DELETE');
};
