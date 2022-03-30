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
    check?: false;
    supportCJS?: false;
    shims?: ShimOptions;
  } = {}
) {
  const {
    entryPoints = ["./mod.ts"],
    outDir = "./node",
    check=true,
    supportCJS = undefined,
    shims = { deno: true },
  } = buildOptions;

  const {
    keywords,
    homepage,
    repoName,
    name = repoName,
    version,
    license = "MIT",
    description,
  } = packageConfig;

  await build({
    entryPoints: entryPoints,

    outDir,

          scriptModule: supportCJS,
typeCheck:check,
    
    shims,

    package: {
      name: name,
      description: description,

      version: version,
      


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

  
  try {
  await Deno.copyFile("license", "node/LICENSE")
  } catch{
 await Deno.copyFile("license.md", "node/LICENSE")
  }
  
  
await    Deno.copyFile("readme.md", "node/README.md")

}
