// 侧边栏识别工具js
const fs = require('fs');
const path = require('path');

/**
 * 读取指定目录下的所有.md文件，按照文件名从大到小排列
 * @param relativePath 相对路径
 * @returns {string[]|*[]} 文件名数组
 */
function findMdFiles(relativePath) {
    const directoryPath = path.join(process.cwd(), relativePath);

    let mdFiles = [];
    console.log("日志1：" + directoryPath);
    try {
        const files = fs.readdirSync(directoryPath);

        files.forEach((file) => {
            const filePath = path.join(directoryPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                // mdFiles = mdFiles.concat(findMdFiles(filePath));
                const relativeFilePath = path.relative(process.cwd(), filePath);
                mdFiles = mdFiles.concat(findMdFiles(relativeFilePath));
            } else if (file.endsWith('.md') && file !== 'README.md') {
                //mdFiles.push(path.parse(file).name);
                //mdFiles.push(filePath);
                //path.relative(process.cwd(), filePath) 来获取从 relativePath 开始的路径加上 .md 文件名。
                // 修改了排序函数，使其使用 path.basename(a) 和 path.basename(b) 来获取文件名，然后再进行比较
                const relativeFilePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
                const htmlFilePath1 = relativeFilePath.replace('.md', '');
                mdFiles.push("/" + htmlFilePath1);
            }
        });

        // 按照从小到大排序（从大到小改为 bNum - aNum）
        mdFiles.sort((a, b) => {
            const aNum = parseInt(path.basename(a).slice(0));
            const bNum = parseInt(path.basename(b).slice(0));
            return aNum - bNum;
        });
        console.log("日志2：" + mdFiles);
        return mdFiles;
    } catch (error) {
        console.error(`Error reading directory ${directoryPath}: ${error}`);
        return [];
    }
}

module.exports = {
    findMdFiles
};