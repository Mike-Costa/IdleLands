import { RestrictedNumber } from 'restricted-number';
import { IItem } from './IItem';
import { IChoice } from './IChoice';
import { ServerEventName } from './ServerEvent';
import { IProfession } from './IProfession';
import { IBuff } from './IBuff';

export enum Direction {
  Southwest = 1,
  South = 2,
  Southeast = 3,
  West = 4,
  Nowhere = 5,
  East = 6,
  Northwest = 7,
  North = 8,
  Northeast = 9
}

export enum MovementType {
  Ascend = 'ascend',
  Descend = 'descend',
  Fall = 'fall',
  Teleport = 'teleport'
}

export interface ICharacter {
  name: string;
  level: RestrictedNumber;
  profession: string;
  gender: string;

  init(): void;
  recalculateStats(): void;

  equip(item: IItem): void;
  unequip(item: IItem): void;
  forceUnequip(item: IItem): void;

  grantBuff(buff: IBuff): void;
  addBuff(buff: IBuff): void;
}

export interface IPlayer extends ICharacter {
  _id: string;

  userId: string;
  sessionId: string;
  authId: string;
  authType: string;
  authSyncedTo: string;

  createdAt: number;

  xp: RestrictedNumber;

  x: number;
  y: number;
  map: string;
  loggedIn: boolean;
  ascensionLevel: number;

  eventSteps: number;

  availableGenders: string[];
  availableTitles: string[];

  $professionData: any;
  $statisticsData: any;
  $inventoryData: any;
  $choicesData: any;
  $achievementsData: any;
  $personalitiesData: any;
  $collectiblesData: any;

  lastDir: Direction;
  divineDirection?: { x: number, y: number, steps: number };

  $partyName?: string;

  loop(): Promise<void>;
  toSaveObject(): IPlayer;

  canLevelUp(): boolean;
  gainXP(num: number): number;
  resetMaxXP(): void;
  gainGold(num: number): number;

  alwaysTryAddToInventory(item: IItem): void;
  sellItem(item: IItem): number;

  changeProfessionWithRef(profession: string): void;
  changeProfession(profession: IProfession): void;

  doChoice(choice: IChoice, decisionIndex: number): void;

  emit(evt: ServerEventName, data: any): void;

  getDefaultChoice(str: string[]): string;
  hasPersonality(pers: string): boolean;

  hasAchievement(achievement: string): boolean;
  hasCollectible(collectible: string): boolean;
  tryFindCollectible({ name, rarity, description, storyline }): void;

  increaseStatistic(stat: string, val: number): void;

  gainILP(ilp: number): void;

  setDivineDirection(x: number, y: number): void;
  setPos(x: number, y: number, map: string, region: string): void;

  changeGender(newGender: string): void;
  changeTitle(newTitle: string): void;
}
