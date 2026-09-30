import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroDashboard } from './HeroDashboard';
import * as hooks from '@/app/_hooks/useHeroes';

// Mock the next/navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams('')),
}));

// Mock the custom hook
vi.mock('@/app/_hooks/useHeroes', () => ({
  useHeroes: vi.fn(),
}));

describe('HeroDashboard', () => {
  it('renders loading state', () => {
    vi.mocked(hooks.useHeroes).mockReturnValue({
      heroesResponse: null,
      isLoading: true,
      deactivateHero: vi.fn(),
      activateHero: vi.fn(),
      createHero: vi.fn(),
      updateHero: vi.fn(),
      deleteHero: vi.fn(),
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    } as any);

    render(<HeroDashboard />);
    expect(screen.getByText('Heróis')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
  });

  it('renders heroes correctly', () => {
    vi.mocked(hooks.useHeroes).mockReturnValue({
      heroesResponse: {
        data: [
          {
            id: '1',
            name: 'Clark Kent',
            nickname: 'Superman',
            date_of_birth: new Date('1980-01-01'),
            universe: 'DC',
            main_power: 'Flight',
            avatarUrl: '',
            isActive: true,
            created_at: new Date(),
            updated_at: new Date(),
          }
        ],
        total: 1
      },
      isLoading: false,
      deactivateHero: vi.fn(),
      activateHero: vi.fn(),
      createHero: vi.fn(),
      updateHero: vi.fn(),
      deleteHero: vi.fn(),
      isCreating: false,
      isUpdating: false,
      isDeleting: false,
    } as any);

    render(<HeroDashboard />);
    expect(screen.getByText('Clark Kent')).toBeInTheDocument();
  });
});
