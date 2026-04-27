import { globalAK } from "#common/global";
import { BrandedHTMLPolicy, sanitizeHTML } from "#common/purify";

import { AKElement } from "#elements/Base";

import { FooterLink } from "@goauthentik/api";

import { LOCALE_STATUS_EVENT, LocaleStatusEventDetail, msg } from "@lit/localize";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";

/**
 * @part list - The list element containing the links
 * @part list-item - Each configured footer link item
 * @part list-item-link - The link element for each item, if applicable
 */
@customElement("ak-brand-links")
export class BrandLinks extends AKElement {
    /**
     * Rendering in the light DOM ensures consistent styling across some of the
     * more complex flow environments, such as...
     *
     * - When JavaScript is not available, such as on error pages.
     * - During the initial loading of the page, before the web components are fully initialized.
     * - After the flow executor has initialized, to avoid repaint issues.
     */
    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this;
    }

    @property({ type: Array, attribute: false })
    public links: FooterLink[] = globalAK().brand.uiFooterLinks || [];

    #localeStatusListener = (event: CustomEvent<LocaleStatusEventDetail>) => {
        if (event.detail.status === "ready") {
            this.requestUpdate();
        }
    };

    public override connectedCallback() {
        super.connectedCallback();
        window.addEventListener(LOCALE_STATUS_EVENT, this.#localeStatusListener);
    }

    public override disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener(LOCALE_STATUS_EVENT, this.#localeStatusListener);
    }

    render() {
        const links = this.links;

        if (links.length < 1) {
            return null;
        }

        return html`<ul
            aria-label=${msg("Site links")}
            class="pf-c-list pf-m-inline"
            part="list"
            data-count=${links.length}
        >
            ${map(links, (link, idx) => {
                const children = sanitizeHTML(BrandedHTMLPolicy, link.name);

                return html`<li
                    part="list-item"
                    data-index=${idx}
                    data-kind=${link.href ? "link" : "text"}
                    data-track-name=${idx === 0 ? "start" : idx === links.length - 1 ? "end" : idx}
                >
                    ${link.href
                        ? html`<a part="list-item-link" href=${link.href}>${children}</a>`
                        : children}
                </li>`;
            })}
        </ul>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-brand-links": BrandLinks;
    }
}
