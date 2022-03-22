import { build, EntryPoint } from "https://deno.land/x/dnt@0.22.0/mod.ts";

import { publisher } from "./me.ts";

import type { ShimOptions } from "https://deno.land/x/dnt@0.22.0/lib/shims.ts";

export async function buildPackage(
  packageConfig: {
    keywords: string[];
    homepage: string;
    repoName: string;
    name?: string;
    version: string;
    license?: string;
    description: string;
  },
  buildOptions: {
    entryPoints?: (string|EntryPoint)[];
    outDir?: string;
    onlyESM: boolean;
    shims?: ShimOptions;
  } = {}
) {
  const {
    entryPoints = ["./mod.ts"],
    outDir = "./node",
    shims = { deno: true },
  } = buildOptions;

  const {
    keywords,
    homepage,
    repoName,
    name = repoName,
    version,
    onlyESM = false;
    license = "MIT",
    description,
  } = packageConfig;

  await build({
    entryPoints: entryPoints,

    outDir,

    shims,

    package: {
      name: name,
      description: description,

      version: version,
      
      scriptModule: onlyESM,


      license: license,

      funding: {
        type: "patreon",
        url: `https://www.patreon.com/${publisher.username}`,
      },

      repository: `github:${publisher.username}/${repoName}`,
      homepage,

      bugs: {
        url: `https://github.com/${publisher.username}/${repoName}/issues`,
        email: publisher.email,
      },

      keywords,
    },
  });

  await Promise.all([
    Deno.copyFile("license", "node/LICENSE"),
    Deno.copyFile("readme.md", "node/README.md"),
  ]);
}
