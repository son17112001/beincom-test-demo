import React, { useMemo } from "react";
import { IntlProvider } from "react-intl";

import useLocale from "@/hooks/useLocale";

import enLocaleData from "./en.json";
import viLocaleData from "./vi.json";

const localeData = {
    en: enLocaleData,
    vi: viLocaleData,
};

export default function LocaleProvider({ children }) {
    const { locale, defaultLocale } = useLocale();

    const messages = useMemo(() => localeData[locale] || localeData[defaultLocale], [ locale ]);

    return (
        <IntlProvider
            defaultLocale={defaultLocale}
            locale={locale}
            messages={messages}
            onError={(e) => {
                if (e?.code !== "MISSING_TRANSLATION") {
                    console.error(e);
                }
            }}
        >
            {children}
        </IntlProvider>
    );
}
