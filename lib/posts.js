import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// md文件地址
const postsDirectory = path.join(process.cwd(), 'posts');

// 获得排序的文件
export function getSortedPostsData() {
    // 获取文件夹下的所有文件
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // 去除.md作为唯一id
        const id = fileName.replace(/\.md$/, '');

        // 将md文件读取为字符串
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');
        // 使用gray-matter解析md文件
        const matterResult = matter(fileContents);
        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}