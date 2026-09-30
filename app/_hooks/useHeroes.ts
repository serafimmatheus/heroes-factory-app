import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { HeroService, CreateHeroDTO, UpdateHeroDTO, FetchHeroesParams } from "@/app/_services/HeroService";
import {
  createHeroAction,
  updateHeroAction,
  activateHeroAction,
  deactivateHeroAction,
} from "@/app/_actions/hero-actions";

export const HEROES_QUERY_KEY = ["heroes"];

export function useHeroes(params?: FetchHeroesParams) {
  const queryClient = useQueryClient();

  const heroesQuery = useQuery({
    queryKey: [...HEROES_QUERY_KEY, params],
    queryFn: () => HeroService.getAll(params),
  });

  const createHeroMutation = useMutation({
    mutationFn: async (payload: CreateHeroDTO) => {
      const result = await createHeroAction(payload);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
    },
  });

  const updateHeroMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateHeroDTO }) => {
      const result = await updateHeroAction(id, payload);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
    },
  });

  const activateHeroMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await activateHeroAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
    },
  });

  const deactivateHeroMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deactivateHeroAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
    },
  });

  return {
    heroesResponse: heroesQuery.data,
    isLoading: heroesQuery.isLoading,
    isError: heroesQuery.isError,
    refetch: heroesQuery.refetch,
    
    createHero: createHeroMutation.mutateAsync,
    isCreating: createHeroMutation.isPending,
    
    updateHero: updateHeroMutation.mutateAsync,
    isUpdating: updateHeroMutation.isPending,

    activateHero: activateHeroMutation.mutateAsync,
    isActivating: activateHeroMutation.isPending,

    deactivateHero: deactivateHeroMutation.mutateAsync,
    isDeactivating: deactivateHeroMutation.isPending,
  };
}
