import babel from "rollup-plugin-babel";
import cleanup from "rollup-plugin-cleanup"; // 清除注释

export default [
  "src/index.js",
  "src/utils/index.js",
  "src/share/utils/index.js",
].map((item) => {
  // 批量打包文件
  return {
    input: item,
    output: {
      file: item.replace("src/", "bin/"),
      format: "cjs",
    },
    plugins: [
      babel({
        exclude: "node_modules/**",
      }),
      cleanup(),
    ],
  };
});
