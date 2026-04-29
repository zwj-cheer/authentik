import "#elements/sidebar/Sidebar";
import "#elements/sidebar/SidebarItem";

import {
    createAdminSidebarEntries,
    isEnterpriseSidebarEntry,
    renderSidebarItems,
    SidebarEntry,
} from "#admin/navigation/sidebar";

import { AKElement } from "#elements/Base";
import { Sidebar } from "#elements/sidebar/Sidebar";

import { Meta } from "@storybook/web-components";

import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";

const metadata: Meta<Sidebar> = {
    title: "Elements / Sidebar",
    component: "ak-sidebar",
    parameters: {
        docs: {
            description: {
                component: "The admin navigation sidebar.",
            },
        },
    },
};

export default metadata;

type StoryTheme = "light" | "dark";

function withoutEnterpriseEntries(entries: readonly SidebarEntry[]): SidebarEntry[] {
    return entries
        .filter((entry) => !isEnterpriseSidebarEntry(entry))
        .map(
            ([path, label, attributes, children]): SidebarEntry => [
                path,
                label,
                attributes,
                children ? withoutEnterpriseEntries(children) : undefined,
            ],
        );
}

@customElement("story-sidebar-frame")
class StorySidebarFrame extends LitElement {
    @property({ attribute: "theme-mode" })
    public themeMode: StoryTheme = "light";

    #entries = withoutEnterpriseEntries(createAdminSidebarEntries());

    #syncTheme(): void {
        this.renderRoot
            .querySelectorAll<AKElement>("ak-sidebar, ak-sidebar-item")
            .forEach((element) => {
                element.activeTheme = this.themeMode;
                element.setAttribute("theme", this.themeMode);
            });
    }

    protected override updated(): void {
        this.#syncTheme();
    }

    protected get frameStyle(): string {
        const shared = [
            "height: 720px",
            "width: 17.5rem",
            "--ak-c-sidebar__link--BorderRadius: 6px",
            "--ak-c-sidebar__link--MarginInline: var(--pf-global--spacer--sm)",
            "--ak-c-sidebar__link--current--Color: var(--ak-accent)",
            "--ak-m-scroll-shadows--ShadowLength: 0",
        ];

        if (this.themeMode === "dark") {
            return [
                ...shared,
                "--pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--dark-100)",
                "--ak-m-scroll-shadows--BackgroundColor: var(--pf-c-page__sidebar--BackgroundColor)",
                "--ak-c-sidebar__link--hover--BackgroundColor: var(--pf-global--BackgroundColor--dark-300)",
                "--ak-c-sidebar__link--current--BackgroundColor: color-mix(in oklab, var(--ak-accent) 24%, var(--pf-global--BackgroundColor--dark-300))",
                "background: var(--pf-c-page__sidebar--BackgroundColor)",
            ].join("; ");
        }

        return [
            ...shared,
            "--pf-c-page__sidebar--BackgroundColor: var(--pf-global--BackgroundColor--100)",
            "--ak-m-scroll-shadows--BackgroundColor: var(--pf-c-page__sidebar--BackgroundColor)",
            "--ak-c-sidebar__link--hover--BackgroundColor: var(--pf-global--BackgroundColor--200)",
            "--ak-c-sidebar__link--current--BackgroundColor: color-mix(in oklab, var(--ak-accent) 12%, transparent)",
            "background: var(--pf-c-page__sidebar--BackgroundColor)",
        ].join("; ");
    }

    protected override render(): TemplateResult {
        return html`<div style=${this.frameStyle}>
            <ak-sidebar>${renderSidebarItems(this.#entries)}</ak-sidebar>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "story-sidebar-frame": StorySidebarFrame;
    }
}

export const AdminNavigation = () => {
    return html`<story-sidebar-frame></story-sidebar-frame>`;
};

export const DarkAdminNavigation = () => {
    return html`<story-sidebar-frame theme-mode="dark"></story-sidebar-frame>`;
};
