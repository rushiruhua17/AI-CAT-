export interface Segment {
  id: number;
  source: string;
  target: string;
  status: 'draft' | 'translated' | 'approved';
  origin: 'mt' | 'tm' | 'human' | 'ai';
  issues?: number;
}
