import { api } from "@/app/_lib/axios";
import { Hero, IHeroData } from "@/app/_models/Hero";

export interface CreateHeroDTO {
  name: string;
  nickname: string;
  date_of_birth: string;
  universe: string;
  main_power: string;
  avatar_url?: string;
}

export interface UpdateHeroDTO {
  name?: string;
  nickname?: string;
  date_of_birth?: string;
  universe?: string;
  main_power?: string;
  avatar_url?: string | null;
}

export interface FetchHeroesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface FetchHeroesResponse {
  data: Hero[];
  total: number;
  page: number;
  limit: number;
}

interface IRawFetchHeroesResponse {
  data: IHeroData[];
  total: number;
  page: number;
  limit: number;
}

export class HeroService {
  public static async getAll(params?: FetchHeroesParams): Promise<FetchHeroesResponse> {
    const response = await api.get<IRawFetchHeroesResponse>("/heroes", { params });
    return {
      ...response.data,
      data: response.data.data.map((item) => new Hero(item)),
    };
  }

  public static async getById(id: string): Promise<Hero> {
    const response = await api.get<IHeroData>(`/heroes/${id}`);
    return new Hero(response.data);
  }

  public static async create(payload: CreateHeroDTO): Promise<Hero> {
    const response = await api.post<IHeroData>("/heroes", payload);
    return new Hero(response.data);
  }

  public static async update(id: string, payload: UpdateHeroDTO): Promise<Hero> {
    const response = await api.put<IHeroData>(`/heroes/${id}`, payload);
    return new Hero(response.data);
  }

  public static async activate(id: string): Promise<void> {
    await api.patch(`/heroes/${id}/activate`);
  }

  public static async deactivate(id: string): Promise<void> {
    await api.delete(`/heroes/${id}`);
  }
}
