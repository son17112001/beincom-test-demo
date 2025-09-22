import { toast } from "sonner";

import { errorCodes } from "@/constants/errorCode";

import canUseDom from "./can-use-dom";
import { generateAsPath } from "./path";
import { cleanObject } from ".";

export const toggleArrayValue = (array, value) => {
    if (Array.isArray(value)) return value;
    if (array.includes(value)) {
        array.splice(array.indexOf(value), 1);
    } else {
        array.push(value);
    }

    return array;
};

export const combineName = (data) => {
    return [ data?.lastName, data?.firstName ].filter((item) => item).join(" ");
};
export const combineTeacherName = (data) => {
    return [ data?.teacherLastName, data?.teacherFirstName ].filter(Boolean).join(" ");
};
export const removeAccents = (str) => {
    if (str) {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .trim();
    }

    return str;
};

export const includesIgnoreAccents = (data, search) => {
    return removeAccents(data.toLowerCase()).includes(
        removeAccents(search.toString().toLowerCase()),
    );
};

function unsecuredCopyToClipboard(text) {
    const textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    toast.success("Sao chép thành công");
}
export function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard
            ?.writeText(text)
            .then(() => {
                toast.success("Sao chép thành công");
            })
            .catch(() => {
                toast.error("Sao chép thất bại");
            });
    } else {
        unsecuredCopyToClipboard(text);
    }
}

export const pushQuery = (router, newQuery) => {
    const { replace, asPath, pathname, query, isReady } = router;

    if (!canUseDom() || !isReady) return;

    const constructedQuery = cleanObject(
        {
            ...query,
            ...newQuery,
        },
        { clear: [ undefined, "", null, 0 ] },
    );

    replace(
        {
            pathname,
            query: constructedQuery,
        },
        generateAsPath({ asPath, query: constructedQuery, pathname }),
        { shallow: true },
    );
};
export const exceptNumberSymbols = (e) => {
    [ "e", "E", "+", "-", ".", "," ].includes(e.key) && e.preventDefault();
};

export const handleCatchError = (dataRes, form) => {
    const errorCode = errorCodes[dataRes?.code];
    if (form && errorCode?.field) {
        form.setFields([
            {
                name: errorCode?.field,
                errors: [ errorCode?.message || dataRes?.message ],
            },
        ]);

        return;
    }

    if (errorCode?.message) {
        toast.error(errorCode?.message);
    } else {
        toast.error(dataRes?.message);
    }
};

export function trimSpaceName(input) {
    return input?.trim()?.replace(/\s+/g, " ");
}
export function dayOfWeekAsString(dayWeek) {
    return [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY" ].findIndex(
        (e) => e == dayWeek,
    );
}

export function timetableId(classId, weekId, numberDateOfWeek, periodId) {
    return [ classId, weekId, numberDateOfWeek, periodId ].join("-");
}

export function isImageFile(filename) {
    const imageExtensions = new Set([ "jpg", "jpeg", "png" ]);

    const extension = filename.split(".").pop().toLowerCase();

    return imageExtensions.has(extension);
}

export const createNamePathResourceItem = (type, rsc, item, suffix = "") => {
    return `${type}-${rsc.id}-${rsc.seriesId}-${rsc.resource.id}-${item.id}${suffix}`;
};

export const displayScore = (score) => {
    return +(Math.round((+score + Number.EPSILON) * 100) / 100).toFixed(2);
};
