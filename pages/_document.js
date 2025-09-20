import Document, { Head, Html, Main, NextScript } from "next/document";

import { FONT_FAMILY } from "@/fonts/config";

class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head />
                <body className={FONT_FAMILY.className}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
