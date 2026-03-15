import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  PromotionList: undefined;
  PromotionDetail: { promotionId: number };
};

export type PromotionListScreenProps = NativeStackScreenProps<RootStackParamList, 'PromotionList'>;
export type PromotionDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PromotionDetail'
>;
