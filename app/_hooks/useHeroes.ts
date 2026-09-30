import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/app/_components/ui/toast";
import { HeroService, CreateHeroDTO, UpdateHeroDTO, FetchHeroesParams } from "@/app/_services/HeroService";
import {
  createHeroAction,
  updateHeroAction,
  activateHeroAction,
  deactivateHeroAction,
  deleteHeroAction,
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
      toast.show({ type: "success", title: "Sucesso", description: "Herói criado com sucesso!" });
    },
    onError: (error: any) => {
      toast.show({ type: "error", title: "Erro", description: error.message || "Erro ao criar herói" });
    }
  });

  const updateHeroMutation = useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateHeroDTO }) => {
      const result = await updateHeroAction(id, payload);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
      toast.show({ type: "success", title: "Sucesso", description: "Herói atualizado com sucesso!" });
    },
    onError: (error: any) => {
      toast.show({ type: "error", title: "Erro", description: error.message || "Erro ao atualizar herói" });
    }
  });

  const activateHeroMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await activateHeroAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
      toast.show({ type: "success", title: "Sucesso", description: "Herói ativado com sucesso!" });
    },
    onError: (error: any) => {
      toast.show({ type: "error", title: "Erro", description: error.message || "Erro ao ativar herói" });
    }
  });

  const deactivateHeroMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deactivateHeroAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
      toast.show({ type: "success", title: "Sucesso", description: "Herói desativado com sucesso!" });
    },
    onError: (error: any) => {
      toast.show({ type: "error", title: "Erro", description: error.message || "Erro ao desativar herói" });
    }
  });

  const deleteHeroMutation = useMutation({
    mutationFn: async (id: string) => {
      const result = await deleteHeroAction(id);
      if (!result.success) throw new Error(result.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: HEROES_QUERY_KEY });
      toast.show({ type: "success", title: "Sucesso", description: "Herói deletado com sucesso!" });
    },
    onError: (error: any) => {
      toast.show({ type: "error", title: "Erro", description: error.message || "Erro ao deletar herói" });
    }
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

    deleteHero: deleteHeroMutation.mutateAsync,
    isDeleting: deleteHeroMutation.isPending,
  };
}
