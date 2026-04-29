import "#components/ak-page-navbar";

import { DefaultBrand } from "#common/ui/config";

import { AKPageNavbar } from "#components/ak-page-navbar";

import { CurrentBrand } from "@goauthentik/api";

import { Meta } from "@storybook/web-components";

import { html } from "lit";
import { customElement } from "lit/decorators.js";

const metadata: Meta<AKPageNavbar> = {
    title: "Components / Page Navbar",
    component: "ak-page-navbar",
    parameters: {
        docs: {
            description: {
                component: "A page navbar for the authentik web interface",
            },
        },
    },
};

export default metadata;

@customElement("story-ak-page-navbar")
class AKPageNavbarStory extends AKPageNavbar {
    brand: CurrentBrand = {
        ...DefaultBrand,
        brandingLogo:
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 32'%3E%3Crect width='32' height='32' rx='6' fill='%23fd4b2d'/%3E%3Ctext x='42' y='22' font-family='Arial,sans-serif' font-size='18' font-weight='700' fill='%23151a1f'%3Eauthentik%3C/text%3E%3C/svg%3E",
    };
}

declare global {
    interface HTMLElementTagNameMap {
        "story-ak-page-navbar": AKPageNavbarStory;
    }
}

export const SimplePageNavbar = () => {
    return html`<story-ak-page-navbar .header=${"Overview"}></story-ak-page-navbar>`;
};

export const PageNavbarWithIcon = () => {
    return html`<story-ak-page-navbar
        .header=${"Applications"}
        .icon=${"fa fa-th"}
    ></story-ak-page-navbar>`;
};

export const PageNavbarWithDescription = () => {
    return html`<story-ak-page-navbar
        .header=${"Provider configuration"}
        .description=${html`Review provider bindings, launch URLs, and access policy status.`}
        .icon=${"fa fa-plug"}
    ></story-ak-page-navbar>`;
};
