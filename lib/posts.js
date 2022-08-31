import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

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

// 获得所有文章的id
// Returns an array that looks like this:
// [
//   {
//     params: {
//       id: 'ssg-ssr'
//     }
//   },
//   {
//     params: {
//       id: 'pre-rendering'
//     }
//   }
// ]
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            },
        };
    });
}

// 获得指定id的文章
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // 使用remark获取文章内容
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}