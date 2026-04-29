import { AKElement } from "#elements/Base";

import { Pagination } from "@goauthentik/api";

import { msg, str } from "@lit/localize";
import { css, CSSResult, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

import PFButton from "@patternfly/patternfly/components/Button/button.css";

export type TablePageChangeListener = (page: number) => void;

@customElement("ak-table-pagination")
export class TablePagination extends AKElement {
    @property({ type: String })
    public label: string | null = null;

    @property({ attribute: false })
    public pages?: Pagination;

    @property({ type: Boolean })
    public loading = false;

    @property({ attribute: false })
    public onPageChange?: TablePageChangeListener;

    static styles: CSSResult[] = [
        PFButton,
        css`
            .ak-c-table-pagination {
                display: inline-flex;
                align-items: center;
                justify-content: flex-end;
                gap: 0.5rem;
                color: var(--pf-global--Color--200);
                font-size: 0.875rem;
                line-height: 1.4;
                white-space: nowrap;

                &[inert] {
                    opacity: 0.5;
                }
            }

            .ak-c-table-pagination__range {
                color: var(--pf-global--Color--200);
                font-weight: 400;
                letter-spacing: 0;
                font-variant-numeric: tabular-nums;
            }

            .ak-c-table-pagination__nav {
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
            }

            .ak-c-table-pagination__button,
            .ak-c-table-pagination__page {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                min-inline-size: 2rem;
                min-block-size: 2rem;
                padding: 0;
                border: 1px solid transparent;
                border-radius: var(--pf-global--BorderRadius--sm, 4px);
                background-color: transparent;
                color: var(--pf-global--Color--200);
                font-variant-numeric: tabular-nums;
                transition:
                    background-color 0.15s ease,
                    border-color 0.15s ease,
                    color 0.15s ease;
            }

            .ak-c-table-pagination__button:not(:disabled):hover {
                background-color: color-mix(
                    in srgb,
                    var(--pf-global--primary-color--100) 10%,
                    transparent
                );
                color: var(--pf-global--primary-color--100);
            }

            .ak-c-table-pagination__button:disabled {
                color: color-mix(in srgb, var(--pf-global--Color--200) 38%, transparent);
                cursor: not-allowed;
            }

            .ak-c-table-pagination__page {
                border-color: var(--pf-global--primary-color--100);
                color: var(--pf-global--primary-color--100);
                font-weight: 600;
            }
        `,
    ];

    #navigatePrevious = () => {
        this.onPageChange?.(this.pages?.previous || 0);
    };

    #navigateNext = () => {
        this.onPageChange?.(this.pages?.next || 0);
    };

    render() {
        if (!this.pages && !this.loading) {
            return nothing;
        }

        const startIndex = this.pages?.startIndex ?? 0;
        const endIndex = this.pages?.endIndex ?? 0;
        const pageCount = this.pages?.count ?? 0;
        const currentPage = this.pages?.current ?? 1;

        return html` <nav
            aria-label=${msg(str`${this.label || ""} table pagination`)}
            class="ak-c-table-pagination"
            ?inert=${this.loading}
        >
            <span class="ak-c-table-pagination__range">
                ${msg(str`${startIndex}-${endIndex} of ${pageCount}`)}
            </span>
            <div class="ak-c-table-pagination__nav">
                <button
                    class="ak-c-table-pagination__button"
                    @click=${this.#navigatePrevious}
                    ?disabled="${(this.pages?.previous || 0) < 1}"
                    aria-label="${msg("Go to previous page")}"
                >
                    <i class="fas fa-angle-left" aria-hidden="true"></i>
                </button>
                <span
                    class="ak-c-table-pagination__page"
                    aria-current="page"
                    aria-label=${msg(str`Current page, page ${currentPage}`)}
                >
                    ${currentPage}
                </span>
                <button
                    class="ak-c-table-pagination__button"
                    @click=${this.#navigateNext}
                    ?disabled="${(this.pages?.next || 0) <= 0}"
                    aria-label="${msg("Go to next page")}"
                >
                    <i class="fas fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>
        </nav>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-table-pagination": TablePagination;
    }
}
