import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface AuthResponse {
    success: boolean;
    message?: string;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: Date;
    accountInfo?: any;
}

const TRADOVATE_BASE_URL = process.env.TRADOVATE_API_URL || 'https://demo.tradovateapi.com/v1';

const tradovateAuthController = {
    // Authenticate with Tradovate API
    async authenticate(username: string, password: string): Promise<AuthResponse> {
        try {
            // Generate a unique device ID for the session
            const deviceId = uuidv4();
            
            // Request access token
            const response = await axios.post(`${TRADOVATE_BASE_URL}/auth/accesstokenrequest`, {
                name: username,
                password: password,
                appId: 'MayTrade Trading Platform',
                appVersion: '1.0',
                deviceId
            });
            
            if (!response.data || !response.data.accessToken) {
                return {
                    success: false,
                    message: 'Failed to authenticate with Tradovate'
                };
            }
            
            // Calculate token expiration (1 hour from now)
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1);
            
            // Get user account information
            const accountInfo = await this.getAccountInfo(response.data.accessToken);
            
            return {
                success: true,
                accessToken: response.data.accessToken,
                refreshToken: response.data.mdAccessToken, // Use the market data token as refresh token
                expiresAt,
                accountInfo
            };
        } catch (error) {
            console.error('Tradovate authentication error:', error);
            
            // Handle specific error responses
            if (error.response && error.response.data) {
                const errorData = error.response.data;
                
                // Map Tradovate error messages to more user-friendly messages
                let errorMessage = 'Authentication failed';
                
                if (errorData.errorText) {
                    if (errorData.errorText.includes('Invalid credentials')) {
                        errorMessage = 'Invalid username or password';
                    } else if (errorData.errorText.includes('account is locked')) {
                        errorMessage = 'Your account has been locked. Please contact Tradovate support.';
                    } else {
                        errorMessage = errorData.errorText;
                    }
                }
                
                return {
                    success: false,
                    message: errorMessage
                };
            }
            
            return {
                success: false,
                message: error.message || 'Failed to connect to Tradovate'
            };
        }
    },
    
    // Refresh access token
    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        try {
            // Request new access token using refresh token
            const response = await axios.post(`${TRADOVATE_BASE_URL}/auth/renewaccesstoken`, {
                accessToken: refreshToken
            });
            
            if (!response.data || !response.data.accessToken) {
                return {
                    success: false,
                    message: 'Failed to refresh token'
                };
            }
            
            // Calculate new token expiration (1 hour from now)
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1);
            
            return {
                success: true,
                accessToken: response.data.accessToken,
                refreshToken: response.data.mdAccessToken, // Use the market data token as refresh token
                expiresAt
            };
        } catch (error) {
            console.error('Tradovate token refresh error:', error);
            
            return {
                success: false,
                message: error.message || 'Failed to refresh token'
            };
        }
    },
    
    // Get user account info
    async getAccountInfo(accessToken: string): Promise<any> {
        try {
            // Get user info
            const userResponse = await axios.get(`${TRADOVATE_BASE_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            
            // Get user accounts
            const accountsResponse = await axios.get(`${TRADOVATE_BASE_URL}/account/list`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            
            return {
                user: userResponse.data,
                accounts: accountsResponse.data
            };
        } catch (error) {
            console.error('Error fetching account info:', error);
            throw error;
        }
    },
    
    // Get user's trading accounts
    async getAccounts(accessToken: string): Promise<{ success: boolean; accounts?: any[]; message?: string }> {
        try {
            // Get user accounts
            const response = await axios.get(`${TRADOVATE_BASE_URL}/account/list`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            
            if (!response.data) {
                return {
                    success: false,
                    message: 'No accounts found'
                };
            }
            
            return {
                success: true,
                accounts: response.data
            };
        } catch (error) {
            console.error('Error fetching accounts:', error);
            
            return {
                success: false,
                message: error.message || 'Failed to retrieve accounts'
            };
        }
    }
};

export default tradovateAuthController;