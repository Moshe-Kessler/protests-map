import { Flag } from './flag';

export interface FlagState {
  loading: boolean;
  formStatus: string;
  flags: Flag[];
  myFlags: Flag[];
  liveFlags: Flag[];
  timeFilter?: {
    createdAt: number;
  };
  colorFilter?: {
    url: string;
  };
  hasLiveFlag?: boolean;
  totalFlags: number;
  totalLiveFlags: number;
  totalUserFlags: number;
  totalUniqueUsers: number;
  error?: string;
  action?: string;
}
