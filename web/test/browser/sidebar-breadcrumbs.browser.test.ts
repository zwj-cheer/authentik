import { findSidebarBreadcrumbs, type SidebarEntry } from "#admin/navigation/sidebar-breadcrumbs";

import { describe, expect, it } from "vitest";

const entries = [
    [
        null,
        "Dashboards",
        null,
        [
            ["/administration/overview", "Overview"],
            ["/administration/system-tasks", "System Tasks"],
        ],
    ],
    [
        null,
        "Applications",
        null,
        [
            ["/core/applications", "Applications", ["^/core/applications/(?<slug>[-a-z0-9_]+)$"]],
            ["/core/providers", "Providers", ["^/core/providers/(?<id>\\d+)$"]],
        ],
    ],
    ["/settings;tab=general", "Settings"],
] satisfies readonly SidebarEntry[];

describe("findSidebarBreadcrumbs", () => {
    it("returns parent and child labels for an exact sidebar child route", () => {
        expect(findSidebarBreadcrumbs("/administration/system-tasks", entries)).toEqual([
            { label: "Dashboards" },
            { label: "System Tasks", path: "/administration/system-tasks" },
        ]);
    });

    it("matches detail routes through activeWhen patterns", () => {
        expect(findSidebarBreadcrumbs("/core/providers/123", entries)).toEqual([
            { label: "Applications" },
            { label: "Providers", path: "/core/providers" },
        ]);
    });

    it("normalizes sidebar entry URL parameters before matching", () => {
        expect(findSidebarBreadcrumbs("/settings", entries)).toEqual([
            { label: "Settings", path: "/settings;tab=general" },
        ]);
    });

    it("returns no breadcrumbs when the route is not represented in the sidebar", () => {
        expect(findSidebarBreadcrumbs("/not-in-sidebar", entries)).toEqual([]);
    });
});
