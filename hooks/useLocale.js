import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import dayjs from "dayjs";

import { DEFAULT_LOCALE, storageKeys } from "@/constants/constant";
import { getSsoDomain } from "@/utils/url";

function useLocale() {
    const router = useRouter();

    const changeLocale = (newLocale) => {
        setCookie(storageKeys.locale, newLocale, {
            maxAge: dayjs().add(1, "year").diff(dayjs(), "second"),
            domain: getSsoDomain(),
        });
        router.replace(router.asPath, undefined, { locale: newLocale });
    };

    return { defaultLocale: DEFAULT_LOCALE, locale: router.locale, changeLocale };
}

export default useLocale;
