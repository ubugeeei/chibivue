export interface ChibiVueQuery {
  chibiVue?: boolean;
  type?: "script" | "template" | "style";
  index?: number;
  raw?: boolean;
  url?: boolean;
}

export function parseChibiVueRequest(id: string): {
  filename: string;
  query: ChibiVueQuery;
} {
  const [filename, rawQuery] = id.split(`?`, 2);
  const query = Object.fromEntries(new URLSearchParams(rawQuery)) as ChibiVueQuery;
  if (query.chibiVue != null) {
    query.chibiVue = true;
  }
  if (query.index != null) {
    query.index = Number(query.index);
  }
  if (query.raw != null) {
    query.raw = true;
  }
  if (query.url != null) {
    query.url = true;
  }
  return {
    filename,
    query,
  };
}
