import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/app/_components/ui/dialog";
import { Button } from "@/app/_components/ui/button";
import { User, X } from "lucide-react";
import { Hero } from "@/app/_models/Hero";

interface HeroViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  hero: Hero | null;
}

export function HeroViewModal({ isOpen, onClose, hero }: HeroViewModalProps) {
  if (!hero) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg bg-white p-0 overflow-hidden rounded-3xl border-0 shadow-lg">
        <DialogHeader className="p-6 border-b border-gray-100 flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-gray-800">
            {hero.name}
          </DialogTitle>
          <Button variant="ghost" onClick={onClose} className="h-8 w-8 p-0 rounded-full hover:bg-gray-100">
            <X className="h-4 w-4 text-gray-500" />
          </Button>
        </DialogHeader>

        <div className="p-8 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-8 border-4 border-white shadow-sm flex items-center justify-center bg-gray-100">
            {hero.avatarUrl ? (
              <img src={hero.avatarUrl} alt={hero.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>

          <div className="w-full grid grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Nome completo:</p>
              <p className="text-sm text-gray-600">{hero.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Data de nascimento</p>
              <p className="text-sm text-gray-600">
                {hero.dateOfBirth.toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Universo</p>
              <p className="text-sm text-gray-600">{hero.universe}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Habilidade</p>
              <p className="text-sm text-gray-600">{hero.mainPower}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-center">
          <Button type="button" variant="outline" onClick={onClose} className="rounded-xl px-8 border-gray-200 text-gray-600">
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
