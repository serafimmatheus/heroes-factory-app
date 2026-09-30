"use client";

import { useState, useMemo } from "react";
import { useHeroes } from "@/app/_hooks/useHeroes";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Search, MoreVertical, Trash2, Edit2, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Switch } from "@/app/_components/ui/switch";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/_components/ui/pagination";
import { HeroFormModal, HeroFormData } from "./HeroFormModal";
import { HeroViewModal } from "./HeroViewModal";

export function HeroDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  
  const { heroesResponse, isLoading, deactivateHero, activateHero, createHero, updateHero, isCreating, isUpdating } = useHeroes({
    page,
    limit: 5,
    search: activeSearch || undefined,
  });

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingHeroId, setEditingHeroId] = useState<string | null>(null);
  const [viewingHeroId, setViewingHeroId] = useState<string | null>(null);

  const handleSearch = () => {
    setActiveSearch(search);
    setPage(1);
  };

  const heroes = heroesResponse?.data || [];
  const total = heroesResponse?.total || 0;
  const totalPages = Math.ceil(total / 5);

  const editingHero = useMemo(() => heroes.find((h) => h.id === editingHeroId) || null, [heroes, editingHeroId]);
  const viewingHero = useMemo(() => heroes.find((h) => h.id === viewingHeroId) || null, [heroes, viewingHeroId]);

  const handleFormSubmit = async (data: HeroFormData) => {
    if (editingHeroId) {
      await updateHero({ id: editingHeroId, payload: data });
      setEditingHeroId(null);
    } else {
      await createHero(data);
      setIsCreateOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f5f9] flex flex-col items-center py-12 px-6">
      <h1 className="text-4xl font-bold text-[#0c3383] mb-12">Heróis</h1>

      <div className="w-full max-w-5xl flex gap-4 mb-10 items-center justify-between">
        <Button 
          className="bg-[#0c3383] hover:bg-[#0c3383]/90 text-white px-8 rounded-full h-12"
          onClick={() => setIsCreateOpen(true)}
        >
          Criar
        </Button>
        <div className="flex-1 relative flex items-center">
          <Search className="w-5 h-5 text-gray-400 absolute left-4" />
          <Input 
            className="w-full h-12 pl-12 rounded-full border-gray-200 bg-white" 
            placeholder="Digite o nome do herói" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button 
          variant="outline" 
          className="rounded-full h-12 px-8 border-gray-200 text-gray-600 hover:bg-gray-50"
          onClick={handleSearch}
        >
          Buscar
        </Button>
      </div>

      {isLoading ? (
        <div className="flex-1 flex justify-center mt-20">Carregando...</div>
      ) : (
        <div className="flex gap-6 flex-wrap justify-center max-w-6xl w-full">
          {heroes.map((hero) => (
            <div key={hero.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 flex flex-col items-center w-[200px] relative">
              <div className="absolute top-4 right-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-16 min-w-0 p-2 flex flex-col gap-3 items-center rounded-xl shadow-lg border-gray-100">
                    <DropdownMenuItem className="p-2 cursor-pointer focus:bg-red-50 text-red-500 rounded-lg justify-center w-full" onClick={() => deactivateHero(hero.id)}>
                      <Trash2 className="w-5 h-5" />
                    </DropdownMenuItem>
                    <div className="h-[1px] w-full bg-gray-100" />
                    <DropdownMenuItem 
                      className={`p-2 rounded-lg justify-center w-full ${hero.isActive ? 'cursor-pointer focus:bg-blue-50 text-blue-600' : 'opacity-50 cursor-not-allowed text-gray-400'}`} 
                      onClick={(e) => {
                        if (!hero.isActive) {
                          e.preventDefault();
                          return;
                        }
                        setEditingHeroId(hero.id);
                      }}
                    >
                      <Edit2 className="w-5 h-5" />
                    </DropdownMenuItem>
                    <div className="h-[1px] w-full bg-gray-100" />
                    <div className="py-2 flex justify-center w-full">
                      <Switch 
                        checked={hero.isActive} 
                        onCheckedChange={(checked) => checked ? activateHero(hero.id) : deactivateHero(hero.id)} 
                      />
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div 
                className="w-32 h-32 rounded-full overflow-hidden mb-6 mt-4 border-2 border-transparent hover:border-gray-100 cursor-pointer transition-all"
                onClick={() => setViewingHeroId(hero.id)}
              >
                {hero.avatarUrl ? (
                  <img src={hero.avatarUrl} alt={hero.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    <User className="w-12 h-12" />
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-lg text-gray-800 text-center w-full truncate">{hero.name}</h3>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-auto pt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink 
                    onClick={() => setPage(i + 1)}
                    isActive={page === i + 1}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <HeroFormModal 
        isOpen={isCreateOpen || !!editingHeroId} 
        onClose={() => {
          setIsCreateOpen(false);
          setEditingHeroId(null);
        }}
        hero={editingHero}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />

      <HeroViewModal
        isOpen={!!viewingHeroId}
        onClose={() => setViewingHeroId(null)}
        hero={viewingHero}
      />
    </div>
  );
}
