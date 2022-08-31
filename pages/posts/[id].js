import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}
// 获取指定id的文章
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>{postData.title}</Head>
            <h4>title : {postData.title}</h4>
            <h4>id : {postData.id}</h4>
            <h4>date: {postData.date}</h4>
            <Date dateString={postData.date}></Date>
            
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
    );
}

