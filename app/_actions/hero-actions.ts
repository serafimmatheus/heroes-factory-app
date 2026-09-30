"use server";

import { revalidatePath } from "next/cache";
import { CreateHeroDTO, UpdateHeroDTO } from "@/app/_services/HeroService";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export async function createHeroAction(data: CreateHeroDTO) {
  try {
    const response = await fetch(`${API_URL}/heroes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || errorData?.message || "Erro.");
    }

    revalidatePath("/");
    return { success: true, data: await response.json() };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function updateHeroAction(id: string, data: UpdateHeroDTO) {
  try {
    const response = await fetch(`${API_URL}/heroes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || errorData?.message || "Erro.");
    }

    revalidatePath("/");
    return { success: true, data: await response.json() };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function activateHeroAction(id: string) {
  try {
    const response = await fetch(`${API_URL}/heroes/${id}/activate`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error("Erro ao ativar herói.");
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function deactivateHeroAction(id: string) {
  try {
    const response = await fetch(`${API_URL}/heroes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao desativar herói.");
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
