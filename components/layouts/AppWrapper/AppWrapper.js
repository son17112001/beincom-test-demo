import { useEffect } from "react";

import LoadingOverlay from "@/components/Common/LoadingOverlay/LoadingOverLay";
import LoadingOverlayProvider from "@/components/Common/LoadingOverlay/LoadingOverlayProvider";
import Tooltip from "@/components/Common/Tooltip";
import { ROLES_CODE, storageKeys } from "@/constants/constant";
import { defaultTeacherPath } from "@/constants/paths";
import { AppProvider } from "@/contexts";
import useQueryParams from "@/hooks/useQueryParams";
import LocaleProvider from "@/locales/LocaleProvider";
import { setAuthCookie } from "@/utils/auth";

import ConfirmModalWrapper from "./ConfirmModalWrapper";

function AppWrapper({ children, role, branchId, classId, enableOnlineClass, hostname, isDoeHost }) {
    const [ queryParams, setQueryParams ] = useQueryParams();

    const isSuperAdmin = role === ROLES_CODE.SUPER_ADMIN;

    const changeTeacherClass = (classId) => {
        setAuthCookie(storageKeys.teacherDefaultClass, classId);
        location.href = defaultTeacherPath;
    };

    // remove meta from query params
    useEffect(() => {
        const { meta, ...rest } = queryParams;
        if (meta) {
            setQueryParams(rest, { mergePreviousParams: false });
        }
    }, []);

    return (
        <AppProvider
            isSuperAdmin={isSuperAdmin}
            activeRole={role}
            defaultBranch={branchId}
            defaultClassId={classId}
            changeTeacherClass={changeTeacherClass}
            enableOnlineClass={enableOnlineClass}
            hostname={hostname}
            isDoeHost={isDoeHost}
        >
            <LocaleProvider>
                <LoadingOverlayProvider>
                    <LoadingOverlay />
                    <Tooltip.Provider>
                        <ConfirmModalWrapper>{children} </ConfirmModalWrapper>
                    </Tooltip.Provider>
                </LoadingOverlayProvider>
            </LocaleProvider>
        </AppProvider>
    );
}

export default AppWrapper;
