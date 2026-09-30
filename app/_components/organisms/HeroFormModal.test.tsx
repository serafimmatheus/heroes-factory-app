import { describe, it, expect } from 'vitest';
import { heroFormSchema } from './HeroFormModal';

describe('HeroFormModal Schema', () => {
  it('should pass for valid form data', () => {
    const validData = {
      name: 'Barry Allen',
      nickname: 'Flash',
      date_of_birth: '1995-01-01T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Speed',
      avatar_url: 'https://ui-avatars.com/api/?name=Flash',
    };
    const result = heroFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should pass if avatar_url is empty string (optional)', () => {
    const validData = {
      name: 'Bruce',
      nickname: 'Batman',
      date_of_birth: '1980-01-01T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Money',
      avatar_url: '',
    };
    const result = heroFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should fail for special characters in text fields', () => {
    const invalidData = {
      name: 'Hacker!!!',
      nickname: 'Flash',
      date_of_birth: '1995-01-01T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Speed',
    };
    const result = heroFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Apenas letras, números e espaços permitidos");
    }
  });

  it('should fail for invalid image URL', () => {
    const invalidData = {
      name: 'Barry Allen',
      nickname: 'Flash',
      date_of_birth: '1995-01-01T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Speed',
      avatar_url: 'https://g1.globo.com/noticia',
    };
    const result = heroFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should fail if text exceeds 100 characters', () => {
    const invalidData = {
      name: 'A'.repeat(101),
      nickname: 'Flash',
      date_of_birth: '1995-01-01T00:00:00.000Z',
      universe: 'DC',
      main_power: 'Speed',
    };
    const result = heroFormSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
