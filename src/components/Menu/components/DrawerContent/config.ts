import { FEE_STATISTICS_PATH, LIQUIDATIONS_OVERVIEW_PATH, OVERVIEW_PATH, LIQUIDATIONS_LOANS_AT_RISK, LIQUIDATIONS_ACCOUNT, CAULDRONS_PATH } from "config/paths";

import Discord from "components/Icons/Discord";
import Docs from "components/Icons/Docs";
import Medium from "components/Icons/Medium";
import Twitter from "components/Icons/Twitter";
import Lens from "components/Icons/Lens";

export interface INavConfig {
    readonly href?: string;
    readonly name: string;
    readonly childrens?: INavConfig[];
    readonly external?: boolean;
}

export interface ISocialsConfig {
    readonly href: string;
    readonly Icon: () => JSX.Element;
}

export const navConfig: INavConfig[] = [
    { href: OVERVIEW_PATH, name: "Overview" },
    { href: CAULDRONS_PATH, name: "Cauldrons" },
    { href: FEE_STATISTICS_PATH, name: "Fee Statistics" },
    {
        name: "Liquidations",
        childrens: [
            { name: "Overview", href: LIQUIDATIONS_OVERVIEW_PATH },
            { name: "Loans at risk", href: LIQUIDATIONS_LOANS_AT_RISK },
            { name: "Account", href: LIQUIDATIONS_ACCOUNT },
        ],
    },
];

export const externalNavconfig: INavConfig[] = [
    { href: "https://abracadabra.money/", external: true, name: "abracadabra.money" },
    { href: "https://forum.abracadabra.money/", external: true, name: "Forum" },
];

export const socialsConfig: ISocialsConfig[] = [
    { href: "https://wizard69.gitbook.io/abracadabra-money/", Icon: Docs },
    { href: "https://abracadabramoney.medium.com/", Icon: Medium },
    { href: "https://twitter.com/MIM_Spell", Icon: Twitter },
    { href: "https://discord.com/invite/mim", Icon: Discord },
    { href: "https://www.lensfrens.xyz/magic.lens", Icon: Lens },
];
