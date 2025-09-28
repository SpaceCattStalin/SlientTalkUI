export type Collection = {
  id: string;
  name: string;
  wordCount: number;
  tag?: string;
  words?: Word[];
};

type Word = {
  id: string;
  word: string;
  meaning: string;
  example?: string;
};
