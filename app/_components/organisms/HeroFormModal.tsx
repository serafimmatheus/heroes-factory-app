import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Form } from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { FormFieldText } from "@/app/_components/molecules/FormFieldText";
import { Hero } from "@/app/_models/Hero";

export const heroFormSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  nickname: z.string().min(2, "Nome de guerra é obrigatório"),
  date_of_birth: z.string().min(1, "Data de nascimento é obrigatória"),
  universe: z.string().min(1, "Universo é obrigatório"),
  main_power: z.string().min(1, "Habilidade é obrigatória"),
  avatar_url: z.string().url("URL inválida").optional().or(z.literal("")),
});

export type HeroFormData = z.infer<typeof heroFormSchema>;

interface HeroFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  hero?: Hero | null;
  onSubmit: (data: HeroFormData) => Promise<void>;
  isLoading: boolean;
}

export function HeroFormModal({ isOpen, onClose, hero, onSubmit, isLoading }: HeroFormModalProps) {
  const form = useForm<HeroFormData>({
    resolver: zodResolver(heroFormSchema),
    defaultValues: {
      name: "",
      nickname: "",
      date_of_birth: "",
      universe: "",
      main_power: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (hero) {
        form.reset({
          name: hero.name,
          nickname: hero.nickname,
          date_of_birth: hero.dateOfBirth.toISOString().split("T")[0],
          universe: hero.universe,
          main_power: hero.mainPower,
          avatar_url: hero.avatarUrl || "",
        });
      } else {
        form.reset({
          name: "",
          nickname: "",
          date_of_birth: "",
          universe: "",
          main_power: "",
          avatar_url: "",
        });
      }
    }
  }, [isOpen, hero, form]);

  const handleSubmit = async (data: HeroFormData) => {
    await onSubmit({
      ...data,
      date_of_birth: new Date(data.date_of_birth).toISOString(),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-white p-0 overflow-hidden rounded-3xl border-0 shadow-lg">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-semibold text-gray-800">
            {hero ? "Editar herói" : "Criar herói"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="px-6 pb-6 pt-2">
            <div className="space-y-4">
              <FormFieldText control={form.control} label="Nome completo" name="name" placeholder="Digite o nome completo" />
              <FormFieldText control={form.control} label="Nome de guerra" name="nickname" placeholder="Digite o nome de guerra" />
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <FormFieldText control={form.control} label="Data de nascimento" name="date_of_birth" type="date" />
                </div>
                <div className="flex-1">
                  <FormFieldText control={form.control} label="Universo" name="universe" placeholder="Digite o universo" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <FormFieldText control={form.control} label="Habilidade" name="main_power" placeholder="Digite a habilidade" />
                </div>
                <div className="flex-1">
                  <FormFieldText control={form.control} label="Avatar" name="avatar_url" placeholder="Digite a URL" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-4 border-t border-gray-100 pt-6">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-xl px-8 border-gray-200">
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-[#0c3383] hover:bg-[#0c3383]/90 text-white rounded-xl px-8">
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
