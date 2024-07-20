export type Character = {
  id: number;
  name: string;
  color: string;
};

export const CHARACTERS = [
  {
    id: 0,
    name: 'yu',
    color: '',
  },
  {
    id: 1,
    name: 'ayumu',
    color: '',
  },
  {
    id: 2,
    name: 'kasumi',
    color: '#e7d600',
  },
] as const satisfies Character[];
