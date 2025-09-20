import { useIntl } from "react-intl";
import Head from "next/head";

import { Container } from "../components/Common";
import Layout from "../components/layouts/Layout/Layout";
import Homepage from "../components/Pages/Homepage/Homepage";

export default function Home() {
    const intl = useIntl();

    return (
        <>
            <Head>
                <title>Next.js Admin Template</title>
                <meta name="description" content="Next.js Admin Dashboard Template" />
            </Head>

            <Layout>
                <Container>
                    <Homepage />
                </Container>
            </Layout>
        </>
    );
}
