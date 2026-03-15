import Constants from 'expo-constants';

interface AppConfig {
  apiBaseUrl: string;
}

function getConfig(): AppConfig {
  const extra = Constants.expoConfig?.extra;

  return {
    apiBaseUrl: extra?.apiBaseUrl ?? process.env.API_BASE_URL ?? 'http://localhost:3001',
  };
}

export const config = getConfig();
