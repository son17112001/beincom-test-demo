import { useIntl } from "react-intl";
import Head from "next/head";

import { Container } from "../components/Common";
import Layout from "../components/layouts/Layout/Layout";
import Homepage from "../components/Pages/Homepage/Homepage";

export default function Home() {
    const intl = useIntl();

    return (
        <Layout title="Social Community Platform">
            <Head>
                <title>Social Community Platform</title>
                <meta name="description" content="Social Community Platform - Connect, Share, and Engage" />
            </Head>
            <Container>
                <Homepage />
            </Container>
        </Layout>
    );
}
