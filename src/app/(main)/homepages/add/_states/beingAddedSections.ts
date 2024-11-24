// _states/imageUrlsState.ts
import { atom } from 'recoil';
import { TablesInsert } from '@/types/database.types';

type Section = TablesInsert<'sections'>;
export const beingAddedSectionsState = atom<Section[]>({
  key: 'beingAddedSectionsState',
  default: [],
});
