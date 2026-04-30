import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const removedEnterpriseRouteFragments = [
    "/events/exports",
    "/events/lifecycle-rules",
    "/events/lifecycle-reviews",
    "/enterprise/licenses",
] as const;

const removedEnterpriseLabels = [
    "Data Exports",
    "Lifecycle Rules",
    "Reviews",
    "Enterprise",
    "Licenses",
] as const;

const removedEnterprisePageImports = [
    "DataExportListPage",
    "LifecycleRuleListPage",
    "ReviewListPage",
    "EnterpriseLicenseListPage",
] as const;

describe("admin enterprise navigation removal", () => {
    const routesSource = readFileSync("src/admin/Routes.ts", "utf8");
    const sidebarSource = readFileSync("src/admin/navigation/sidebar.ts", "utf8");
    const adminInterfaceSource = readFileSync("src/admin/ak-interface-admin.ts", "utf8");
    const labelsSource = readFileSync("src/common/labels.ts", "utf8");
    const scimProviderSource = readFileSync("src/admin/providers/scim/SCIMProviderFormForm.ts", "utf8");
    const radiusProviderSource = readFileSync(
        "src/admin/providers/radius/RadiusProviderFormForm.ts",
        "utf8",
    );

    it("does not register removed enterprise route fragments", () => {
        for (const route of removedEnterpriseRouteFragments) {
            expect(routesSource).not.toContain(route);
        }
    });

    it("does not import removed enterprise route pages", () => {
        for (const importName of removedEnterprisePageImports) {
            expect(routesSource).not.toContain(importName);
        }
    });

    it("does not expose removed enterprise entries from the admin sidebar source", () => {
        for (const route of removedEnterpriseRouteFragments) {
            expect(sidebarSource).not.toContain(route);
        }

        for (const label of removedEnterpriseLabels) {
            expect(sidebarSource).not.toContain(label);
        }
    });

    it("does not render a separate enterprise sidebar or command palette source", () => {
        expect(sidebarSource).not.toContain("createAdminSidebarEnterpriseEntries");
        expect(adminInterfaceSource).not.toContain("createAdminSidebarEnterpriseEntries");
        expect(adminInterfaceSource).not.toContain("CapabilitiesEnum.IsEnterprise");
    });

    it("does not expose enterprise event action wording", () => {
        expect(labelsSource).not.toContain('msg("Data export ready")');
        expect(labelsSource).not.toContain('msg("Export ready")');
        expect(labelsSource).not.toContain('msg("Review initiated")');
        expect(labelsSource).not.toContain('msg("Review overdue")');
        expect(labelsSource).not.toContain('msg("Review attested")');
        expect(labelsSource).not.toContain('msg("Review completed")');
    });

    it("does not leave enterprise-only provider form options visible", () => {
        expect(scimProviderSource).not.toContain("Authenticate SCIM requests using OAuth.");
        expect(scimProviderSource).not.toContain("OAuth Parameters");
        expect(radiusProviderSource).not.toContain("Certificate used for EAP-TLS");
        expect(scimProviderSource).not.toContain("ak-license-notice");
        expect(radiusProviderSource).not.toContain("ak-license-notice");
    });
});
