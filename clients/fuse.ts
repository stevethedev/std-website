import { fusebox } from "fuse-box";
import type { IRunProps } from "fuse-box/config/IRunProps";

interface BuildConfig {
  isProduction: boolean;
}

async function buildAdminClient(config: BuildConfig) {
  const fuse = fusebox({
    entry: "src/client-admin/index.ts",
    target: "browser",
    webIndex: {
      template: "src/client-admin/index.html",
    },
  });

  const runProps: IRunProps = {
    bundles: {
      exported: true,
      distRoot: "build/client-admin",
    },
  };

  await (config.isProduction ? fuse.runProd(runProps) : fuse.runDev(runProps));
}

async function buildPublicClient(config: BuildConfig) {
  const fuse = fusebox({
    entry: "src/client-public/index.ts",
    target: "browser",
    webIndex: {
      template: "src/client-public/index.html",
    },
  });

  const runProps: IRunProps = {
    bundles: {
      exported: true,
      distRoot: "build/client-public",
    },
  };

  await (config.isProduction ? fuse.runProd(runProps) : fuse.runDev(runProps));
}

async function buildClients(config: BuildConfig) {
  await Promise.all([buildPublicClient(config), buildAdminClient(config)]);
}

buildClients({ isProduction: process.env.NODE_ENV === "production" });
