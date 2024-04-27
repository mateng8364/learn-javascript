const path = require("path");
const fs = require("fs");

function readMarkdownFiles() {
  const directoryPath = path.join(__dirname, "../handbook"); // 请确保路径正确指向 /handbook 目录
  const files = fs.readdirSync(directoryPath); // 使用同步版本的 fs.readdirSync()

  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const markdownDataArray = markdownFiles.map((fileName) => {
    const filePath = path.join(directoryPath, fileName);
    const title = path.parse(fileName).name; // 文件名（不含扩展名）
    const pathWithExtension = `/handbook/${fileName}`;

    return { title, path: pathWithExtension };
  });
  return markdownDataArray;
}
const fileList = readMarkdownFiles();
console.log(fileList);

module.exports = {
  devServer: {
    https: true,
    key: fs.readFileSync(path.resolve(__dirname, "./localhost+1-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "./localhost+1.pem")),
  },
  title: "TypeScript4 文档",
  description: "TypeScript4 最新官方文档翻译",
  base: "/learn-javascript",
  themeConfig: {
    lastUpdated: "上次更新",
    nav: [
      { text: "首页", link: "/" },
      {
        text: "冴羽的 JavaScript 博客",
        items: [
          { text: "Github", link: "https://github.com/mqyqingfeng" },
          {
            text: "掘金",
            link: "https://juejin.cn/user/712139234359182/posts",
          },
        ],
      },
    ],
    subSidebar: "auto",
    sidebar: [
      {
        title: "欢迎学习",
        path: "/",
        collapsable: false, // 不折叠
        children: [{ title: "学前必读", path: "/" }],
      },
      {
        title: "基础学习",
        path: "/handbook/ConditionalTypes",
        collapsable: false, // 不折叠
        children: fileList,
      },
    ],
  },
  theme: "reco", // 主题 vuepress-theme-reco
  locales: {
    "/": {
      lang: "zh-CN", // 设置语言
    },
  },
  plugins: [
    ["vuepress-plugin-code-copy", { align: "bottom", successText: "复制成功" }],
  ],
};
