export interface IHeroData {
  id: string;
  name: string;
  nickname: string;
  date_of_birth: string | Date;
  universe: string;
  main_power: string;
  avatar_url?: string | null;
  is_active: boolean;
  created_at: string | Date;
  updated_at: string | Date;
}

export class Hero {
  public readonly id: string;
  public readonly name: string;
  public readonly nickname: string;
  public readonly dateOfBirth: Date;
  public readonly universe: string;
  public readonly mainPower: string;
  public readonly avatarUrl: string | null;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(data: IHeroData) {
    this.id = data.id;
    this.name = data.name;
    this.nickname = data.nickname;
    this.dateOfBirth = new Date(data.date_of_birth);
    this.universe = data.universe;
    this.mainPower = data.main_power;
    this.avatarUrl = data.avatar_url ?? null;
    this.isActive = data.is_active;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }

  public get formattedBirthDate(): string {
    return new Intl.DateTimeFormat("pt-BR").format(this.dateOfBirth);
  }
}
