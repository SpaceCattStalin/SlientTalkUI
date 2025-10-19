export type Collection = {
  collectionId: string;
  name: string;
  createdBy: string;
  isDefault: boolean;
  createdAt: number;
  updatedAt: number | null;
  signWords: SignWord[];
};

type Word = {
  id: string;
  word: string;
  meaning: string;
  example?: string;
};

export interface SignWord {
  signWordId: string;
  word: string;
  category: string;
  definition?: string | null;
  wordType?: string | null;
  signWordUri?: string | null;
  exampleSentence?: string | null;
  exampleSentenceVideoUri?: string | null;
  createdAt: string;  // ISO string
  updatedAt: string;  // ISO string
  isInUserCollection: boolean;
}

export type GenericResponse<T = any> = {
  isSuccess: boolean;         // always present
  message?: string;           // optional success message
  errorMessage?: string;      // optional error message
  data?: T | null;            // optional payload, can be any type or null
  count?: number;             // optional, for list endpoints
};

export type ApiResponse<T> = {
  isSuccess: boolean,
  data?: T;
};

export type CreatePaymentResponse = {
  orderUrl: string,
  zpTransToken: string,
  message: string
}

export type CreatePaymentRequest = {
  userId: string,
  amount: number,
  itemName: string,
  description: string
}

export type UserInfo = {
  id: string,
  name: string,
  phoneNumber: string;
};

export type GetWordsByCollection = {
  collectionName: string,
  words: SignWord[];
};

export interface SignWordCategoryResponse {
  isSuccess: boolean;
  count: number;
  data: SignWord[];
}
export interface WordByIdResponse {
  isSuccess: boolean;
  data?: SignWord;
  errorMessage?: string;
}

export interface RelatedWord {
  relatedSignWordId: string;
  word: string;
  notes?: string;
}

export interface CreateCollectionRequest {
  name: string;
  isDefault: boolean;
}

export interface AddSignWordToCollectionRequest {
  collectionId: string;
  signWordId: string;
}