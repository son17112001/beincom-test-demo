import React from "react";
import { defineMessages, useIntl } from "react-intl";
import Head from "next/head";
import classNames from "classnames";

import Footer from "../Footer";
import Header from "../Header";

import styles from "./Layout.module.scss";

const messages = defineMessages({
    pageTitle: {
        id: "common.pageTitle",
        defaultMessage: "Beincome test",
    },
});

function Body({ children, className }) {
    return <div className={classNames(styles.content, className)}>{children}</div>;
}

function Root({ children, title, className, keyTitle }) {
    const intl = useIntl();

    return (
        <>
            <Head>
                <title>
                    {keyTitle
                        ? intl.formatMessage(keyTitle)
                        : title || intl.formatMessage(messages.pageTitle)}
                </title>
            </Head>
            <main className={classNames(styles.masterLayout, className)}>{children}</main>
        </>
    );
}

function Layout({ children, title, breadcrumb, role, keyTitle }) {
    return (
        <Root title={title} keyTitle={keyTitle}>
            <Header />
            <Body>{children}</Body>
            <Footer />
        </Root>
    );
}

Layout.Body = Body;
Layout.Root = Root;
Layout.Header = Header;
Layout.Footer = Footer;
export default Layout;
