import Head from "next/head";

import { Container } from "../components/Common";
import Layout from "../components/layouts/Layout/Layout";
import Homepage from "../components/Pages/Homepage/Homepage";

export default function Home() {
    return (
        <Layout title="Social Community Platform">
            <Head>
                <title>Social Community Platform</title>
                <meta
                    name="description"
                    content="Social Community Platform - Connect, Share, and Engage"
                />
            </Head>
            <Homepage />
        </Layout>
    );
}
