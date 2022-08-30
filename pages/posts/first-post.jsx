import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";

export default function FirstPost() {
    // To add attributes like className, target, rel, etc.
    // add them to the <a> tag, not to the <Link> tag.
    //   return (
    //     <Link href="/">
    //       <a className="foo" target="_blank" rel="noopener noreferrer">
    //         Hello World
    //       </a>
    //     </Link>
    //   )
    return (
        <>
            <Layout>
                <Head>
                    <title>First post</title>
                </Head>



                <h1>First Post</h1>
                <h2>
                    <Link href="/">Back to home</Link>
                </h2>
            </Layout>
        </>
    );
}