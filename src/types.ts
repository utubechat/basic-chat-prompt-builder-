export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
};

export type BuildState = {
  status: 'idle' | 'building' | 'success' | 'error';
  logs: string[];
};

export type AppState = {
  messages: Message[];
  code: string;
  build: BuildState;
};
