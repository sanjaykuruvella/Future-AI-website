import { apiRequest } from './config';

export const saveGoal = async (userId: number, goalType: string, description: string) => {
    return apiRequest<any>('/goals', 'POST', { user_id: userId, goal_type: goalType, description });
};

export const savePrediction = async (userId: number, inputData: any, forecastResult: any, riskLevel: string) => {
    return apiRequest<any>('/prediction', 'POST', {
        user_id: userId,
        input_data: JSON.stringify(inputData),
        forecast_result: JSON.stringify(forecastResult),
        risk_level: riskLevel,
    });
};

export const predictFuture = async (data: any) => {
    return apiRequest<any>('/predict_future', 'POST', data);
};

export const getPredictionsHistory = async (userId: number) => {
    return apiRequest<any[]>(`/predictions/${userId}`, 'GET');
};

export const getAlternateScenarios = async (userId: number) => {
    return apiRequest<any[]>(`/alternate_scenarios/${userId}`, 'GET');
};

export const getCompareFutures = async (userId: number) => {
    return apiRequest<any>(`/compare_futures/${userId}`, 'GET');
};

export const getPredictionInsights = async (userId: number) => {
    return apiRequest<any>(`/prediction_insights/${userId}`, 'GET');
};

export const chatAssistant = async (userId: number, message: string) => {
    return apiRequest<any>('/chat_assistant', 'POST', { user_id: userId, message });
};

export const submitSupport = async (userId: number, subject: string, message: string, category: string) => {
    return apiRequest<any>('/submit_support', 'POST', { user_id: userId, subject, message, category });
};
