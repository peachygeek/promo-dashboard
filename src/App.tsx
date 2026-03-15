import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { queryClient } from './api/queryClient';
import { RootNavigator } from './navigation';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FilterProvider } from './state/FilterContext';

const linking = {
  prefixes: ['http://localhost:8081', 'promo-dashboard://'],
  config: {
    screens: {
      PromotionList: '',
      PromotionDetail: 'promotion/:promotionId',
    },
  },
};

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <FilterProvider>
            <NavigationContainer linking={linking}>
              <StatusBar style="dark" />
              <RootNavigator />
            </NavigationContainer>
          </FilterProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
