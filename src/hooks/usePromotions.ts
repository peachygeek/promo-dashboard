import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPromotions, fetchPromotionById, toggleOptIn } from '../api/promotionsApi';
import type { Promotion } from '../types';

const PROMOTIONS_KEY = ['promotions'] as const;

export function usePromotions() {
  return useQuery({
    queryKey: PROMOTIONS_KEY,
    queryFn: fetchPromotions,
  });
}

export function usePromotion(id: number) {
  return useQuery({
    queryKey: [...PROMOTIONS_KEY, id],
    queryFn: () => fetchPromotionById(id),
  });
}

export function useToggleOptIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, optedIn }: { id: number; optedIn: boolean }) => toggleOptIn(id, optedIn),
    onMutate: async ({ id, optedIn }) => {
      await queryClient.cancelQueries({ queryKey: PROMOTIONS_KEY });

      const previousPromotions = queryClient.getQueryData<Promotion[]>(PROMOTIONS_KEY);
      const previousPromotion = queryClient.getQueryData<Promotion>([...PROMOTIONS_KEY, id]);

      queryClient.setQueryData<Promotion[]>(PROMOTIONS_KEY, (old) =>
        old?.map((p) => (p.id === id ? { ...p, optedIn } : p)),
      );

      queryClient.setQueryData<Promotion>([...PROMOTIONS_KEY, id], (old) =>
        old ? { ...old, optedIn } : old,
      );

      return { previousPromotions, previousPromotion };
    },
    onError: (_err, { id }, context) => {
      if (context?.previousPromotions) {
        queryClient.setQueryData(PROMOTIONS_KEY, context.previousPromotions);
      }
      if (context?.previousPromotion) {
        queryClient.setQueryData([...PROMOTIONS_KEY, id], context.previousPromotion);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: PROMOTIONS_KEY });
    },
  });
}
