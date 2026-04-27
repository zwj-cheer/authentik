import "#elements/chips/Chip";
import "#elements/chips/ChipGroup";
import "#elements/forms/DeleteBulkForm";

import { DEFAULT_CONFIG } from "#common/api/config";

import { PaginatedResponse, Table, TableColumn, Timestamp } from "#elements/table/Table";
import { SlottedTemplateResult } from "#elements/types";

import { CoreApi, UserConsent } from "@goauthentik/api";

import { msg } from "@lit/localize";
import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ak-user-consent-list")
export class UserConsentList extends Table<UserConsent> {
    @property({ type: Number })
    userId?: number;

    async apiEndpoint(): Promise<PaginatedResponse<UserConsent>> {
        return new CoreApi(DEFAULT_CONFIG).coreUserConsentList({
            ...(await this.defaultEndpointConfig()),
            user: this.userId,
        });
    }
    clearOnRefresh = true;
    order = "-expires";

    protected override rowLabel(item: UserConsent): string | null {
        return item.application?.name ?? null;
    }

    protected columns: TableColumn[] = [
        [msg("Application"), "application"],
        [msg("Expires"), "expires"],
        [msg("Permissions"), "permissions"],
    ];

    protected override rowDelete = {
        objectLabel: msg("Consent(s)"),
        metadata: (item: UserConsent) => {
                return [
                    { key: msg("Application"), value: item.application.name },
                    {
                        key: msg("Expires"),
                        value: Timestamp(item.expires && item.expiring ? item.expires : null),
                    },
                    { key: msg("Permissions"), value: item.permissions ?? "-" },
                ];
            },
        usedBy: (item: UserConsent) => {
                return new CoreApi(DEFAULT_CONFIG).coreUserConsentUsedByList({
                    id: item.pk,
                });
            },
        delete: (item: UserConsent) => {
                return new CoreApi(DEFAULT_CONFIG).coreUserConsentDestroy({
                    id: item.pk,
                });
            },
    };

    row(item: UserConsent): SlottedTemplateResult[] {
        return [
            html`${item.application.name}`,
            Timestamp(item.expires && item.expiring ? item.expires : null),
            html`${item.permissions
                ? html`<ak-chip-group>
                      ${item.permissions.split(" ").map((perm) => {
                          return html`<ak-chip .removable=${false}>${perm}</ak-chip>`;
                      })}
                  </ak-chip-group>`
                : html`-`}`,
        ];
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-user-consent-list": UserConsentList;
    }
}
