import React from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import styles from "./Footer.module.scss";

function Footer({ className }) {
    return <div className={classNames(styles.wrapper, className)}></div>;
}

export default Footer;
