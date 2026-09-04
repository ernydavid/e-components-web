import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ComponentMetadata = {
  /** Display name shown in the UI */
  name: string;
  /** Slug used in the URL route */
  slug: string;
  /** Short description */
  description: string;
  /** The named export of the demo/preview component */
  previewExport: string;
  /** The named export of the metadata itself (default: "metadata") */
  metadataExport: string;
  /** Category tag for grouping */
  category: string;
  /** Tags for search/filter */
  tags: string[];
};

export type LibraryComponent = {
  /** Relative path inside components-library/ */
  path: string;
  /** Full source code */
  source: string;
  /** Parsed metadata from the source */
  metadata: ComponentMetadata;
};

const libraryDirectory = path.join(process.cwd(), "components-library");

// ---------------------------------------------------------------------------
// Metadata parser — extracts `export const metadata: ComponentMetadata = { ... }`
// from the source string at build/request time (server only).
// ---------------------------------------------------------------------------

const METADATA_KEYS: Array<keyof ComponentMetadata> = [
  "name",
  "slug",
  "description",
  "previewExport",
  "metadataExport",
  "category",
  "tags",
];

function parseMetadata(source: string): ComponentMetadata | null {
  // Match: export const metadata: ComponentMetadata = { ... };
  // Handles optional type annotation and trailing semicolon.
  const match = source.match(
    /export\s+const\s+metadata\s*(?::\s*ComponentMetadata\s*)?=\s*(\{[\s\S]*?\})\s*;?\s*(?:export|\/\/|$)/,
  );
  if (!match) return null;

  const block = match[1];

  // Extract key: value pairs — supports both unquoted and quoted keys,
  // string, number, boolean, and string[] values.
  const metadata: Record<string, unknown> = {};

  for (const key of METADATA_KEYS) {
    // Try string value: key: "value" or key: 'value'
    const strRegex = new RegExp(
      `(?:${key}|["']${key}["'])\\s*:\\s*["']([^"']*)["']`,
    );
    const strMatch = block.match(strRegex);
    if (strMatch) {
      metadata[key] = strMatch[1];
      continue;
    }

    // Try number value
    const numRegex = new RegExp(`(?:${key}|["']${key}["'])\\s*:\\s*(\\d+)`);
    const numMatch = block.match(numRegex);
    if (numMatch) {
      metadata[key] = Number(numMatch[1]);
      continue;
    }

    // Try boolean value
    const boolRegex = new RegExp(
      `(?:${key}|["']${key}["'])\\s*:\\s*(true|false)`,
    );
    const boolMatch = block.match(boolRegex);
    if (boolMatch) {
      metadata[key] = boolMatch[1] === "true";
      continue;
    }

    // Try array of strings: key: ["a", "b"]
    const arrRegex = new RegExp(
      `(?:${key}|["']${key}["'])\\s*:\\s*\\[([^\\]]*)\\]`,
    );
    const arrMatch = block.match(arrRegex);
    if (arrMatch) {
      metadata[key] =
        arrMatch[1]
          .match(/["']([^"']*)["']/g)
          ?.map((s) => s.replace(/["']/g, "")) ?? [];
      continue;
    }
  }

  // Validate required fields
  if (
    typeof metadata.name !== "string" ||
    typeof metadata.slug !== "string" ||
    typeof metadata.description !== "string" ||
    typeof metadata.previewExport !== "string"
  ) {
    return null;
  }

  return {
    name: metadata.name as string,
    slug: metadata.slug as string,
    description: metadata.description as string,
    previewExport: metadata.previewExport as string,
    metadataExport: (metadata.metadataExport as string) ?? "metadata",
    category: (metadata.category as string) ?? "general",
    tags: (metadata.tags as string[]) ?? [],
  };
}

// ---------------------------------------------------------------------------
// File reader
// ---------------------------------------------------------------------------

async function collectComponentFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectComponentFiles(entryPath);
      return entry.isFile() && entry.name.endsWith(".tsx") ? [entryPath] : [];
    }),
  );

  return files.flat();
}

export async function getLibraryComponents(): Promise<LibraryComponent[]> {
  try {
    const filePaths = await collectComponentFiles(libraryDirectory);
    const components: LibraryComponent[] = [];

    for (const filePath of filePaths) {
      const source = await readFile(filePath, "utf8");
      const metadata = parseMetadata(source);

      // Only include components that export valid metadata
      if (metadata) {
        components.push({
          path: path
            .relative(libraryDirectory, filePath)
            .replaceAll(path.sep, "/"),
          source,
          metadata,
        });
      }
    }

    return components.sort((a, b) =>
      a.metadata.name.localeCompare(b.metadata.name),
    );
  } catch {
    return [];
  }
}

export function getComponentBySlug(
  slug: string,
  components: LibraryComponent[],
): LibraryComponent | undefined {
  return components.find((c) => c.metadata.slug === slug);
}
