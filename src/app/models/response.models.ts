export interface Response {
  info: Info;
  results: Results[];
}

interface Info {
  count: number;
  next: string;
  pages: number;
  prev: string | null;
}

interface Results {
  created: string;
  episode: string[];
  gender: string;
  id: number;
  image: string;
  location: { name: string; url: string };
  name: string;
  origin: { name: string; url: string };
  species: string;
  status: string;
  type: string;
  url: string;
}
