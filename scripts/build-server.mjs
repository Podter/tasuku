import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/server/server.ts"],
  bundle: true,
  platform: "node",
  format: "cjs",
  minify: true,
  sourcemap: "external",
  logLevel: "info",
  outfile: "dist/entry.cjs",
});
