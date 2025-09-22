import React from "react";
import Head from "next/head";

import Layout from "@/components/layouts/Layout";
import { PostDetail } from "@/components/Pages";

const PostDetailPage = () => {
    return (
        <Layout title="Social Community Platform">
            <Head>
                <title>Social Community Platform</title>
                <meta
                    name="description"
                    content="Social Community Platform - Connect, Share, and Engage"
                />
            </Head>
            <PostDetail />
        </Layout>
    );
};

export default PostDetailPage;
