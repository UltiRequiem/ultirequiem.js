import { build, EntryPoint } from "https://deno.land/x/dnt@0.22.0/mod.ts";

import type { ShimOptions } from "https://deno.land/x/dnt@0.22.0/lib/shims.ts";

import { publisher } from "./me.ts";

export interface PackageConfig {
  keywords: string[];
  homepage?: string;
  repoName: string;
  name?: string;
  version: string;
  license?: string;
  description: string;
}

export interface BuildOptions {
  entryPoints?: (string | EntryPoint)[];
  outDir?: string;
  typeCheck?: false;
  supportCJS?: false;
  shims?: ShimOptions;
}

export async function buildPackage(
  packageConfig: PackageConfig,
  buildOptions: BuildOptions = {},
) {
  const {
    entryPoints = ["./mod.ts"],
    outDir = "./node",
    typeCheck = true,
    supportCJS = undefined,
    shims = { deno: true },
  } = buildOptions;

  const {
    keywords,
    repoName,
    homepage = `https://ulti.js.org/${repoName}`,
    name = repoName,
    version,
    license = "MIT",
    description,
  } = packageConfig;

  await build({
    entryPoints,
    outDir,
    scriptModule: supportCJS,
    typeCheck,
    shims,
    package: {
      name,
      description,
      version,
      homepage,
      license,

      funding: {
        type: "patreon",
        url: `https://www.patreon.com/${publisher.username}`,
      },

      repository: `github:${publisher.username}/${repoName}`,

      bugs: {
        url: `https://github.com/${publisher.username}/${repoName}/issues`,
        email: publisher.email,
      },

      keywords,
    },
  });

  try {
    await Deno.copyFile("license", "node/LICENSE");
  } catch {
    await Deno.copyFile("license.md", "node/LICENSE");
  }

  await Deno.copyFile("readme.md", "node/README.md");
}
