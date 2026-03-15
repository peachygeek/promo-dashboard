import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PromotionListScreen } from '../screens/PromotionListScreen';
import { PromotionDetailScreen } from '../screens/PromotionDetailScreen';
import { colors, typography } from '../theme';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="PromotionList"
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          ...typography.heading,
          color: colors.textPrimary,
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="PromotionList"
        component={PromotionListScreen}
        options={{ title: 'Promotions' }}
      />
      <Stack.Screen
        name="PromotionDetail"
        component={PromotionDetailScreen}
        options={{ title: 'Promotion Details' }}
      />
    </Stack.Navigator>
  );
}
