import { Flow, FlowDesignationEnum, FlowLayoutEnum } from "@goauthentik/api";

import { msg } from "@lit/localize";

type FlowNameSource = Pick<Flow, "name" | "slug">;
type FlowTitleSource = Pick<Flow, "title" | "slug">;

export function FlowNameToLabel(flow: FlowNameSource): string {
    switch (flow.slug) {
        case "default-authentication-flow":
        case "default-source-authentication":
            return msg("Welcome to authentik!");
        case "default-source-enrollment":
            return msg("Welcome to authentik! Please choose a username.");
        case "default-provider-authorization-explicit-consent":
        case "default-provider-authorization-implicit-consent":
            return msg("Authorize Application");
        case "default-invalidation-flow":
            return msg("Logged out");
        case "default-password-change":
            return msg("Change password");
        case "default-user-settings-flow":
            return msg("User settings");
        case "default-source-pre-authentication":
            return msg("Pre-authentication");
        case "initial-setup":
            return msg("Default initial setup");
        case "default-authenticator-static-setup":
            return msg("Default static OTP setup");
        case "default-authenticator-totp-setup":
            return msg("Default TOTP setup");
        case "default-authenticator-webauthn-setup":
            return msg("Default WebAuthn setup");
        default:
            return flow.name;
    }
}

export function FlowTitleToLabel(flow: FlowTitleSource): string {
    switch (flow.slug) {
        case "default-authentication-flow":
        case "default-source-authentication":
        case "initial-setup":
            return msg("Welcome to authentik!");
        case "default-source-enrollment":
            return msg("Welcome to authentik! Please choose a username.");
        case "default-provider-authorization-explicit-consent":
        case "default-provider-authorization-implicit-consent":
            return msg("Redirecting to %(app)s");
        case "default-provider-invalidation-flow":
            return msg("You have logged out of %(app)s.");
        case "default-invalidation-flow":
            return msg("Logged out");
        case "default-password-change":
            return msg("Change password");
        case "default-user-settings-flow":
            return msg("Update your info");
        case "default-source-pre-authentication":
            return msg("Pre-authentication");
        case "default-authenticator-static-setup":
            return msg("Configure static OTP token");
        case "default-authenticator-totp-setup":
            return msg("Configure two-factor authentication");
        case "default-authenticator-webauthn-setup":
            return msg("Configure WebAuthn");
        default:
            return flow.title;
    }
}

export function RenderFlowOption(flow: Flow): string {
    return `${flow.slug} (${FlowNameToLabel(flow)})`;
}

export function DesignationToLabel(designation: FlowDesignationEnum): string {
    switch (designation) {
        case FlowDesignationEnum.Authentication:
            return msg("Authentication");
        case FlowDesignationEnum.Authorization:
            return msg("Authorization");
        case FlowDesignationEnum.Enrollment:
            return msg("Enrollment");
        case FlowDesignationEnum.Invalidation:
            return msg("Invalidation");
        case FlowDesignationEnum.Recovery:
            return msg("Recovery");
        case FlowDesignationEnum.StageConfiguration:
            return msg("Stage Configuration");
        case FlowDesignationEnum.Unenrollment:
            return msg("Unenrollment");
        case FlowDesignationEnum.UnknownDefaultOpenApi:
            return msg("Unknown designation");
    }
}

export function LayoutToLabel(layout: FlowLayoutEnum): string {
    switch (layout) {
        case FlowLayoutEnum.Stacked:
            return msg("Stacked");
        case FlowLayoutEnum.ContentLeft:
            return msg("Content left");
        case FlowLayoutEnum.ContentRight:
            return msg("Content right");
        case FlowLayoutEnum.SidebarLeft:
            return msg("Sidebar left");
        case FlowLayoutEnum.SidebarRight:
            return msg("Sidebar right");
        case FlowLayoutEnum.SidebarLeftFrameBackground:
            return msg("Sidebar left (frame background)");
        case FlowLayoutEnum.SidebarRightFrameBackground:
            return msg("Sidebar right (frame background)");
        case FlowLayoutEnum.UnknownDefaultOpenApi:
            return msg("Unknown layout");
    }
}
