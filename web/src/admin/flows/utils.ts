import { Flow, FlowDesignationEnum, FlowLayoutEnum } from "@goauthentik/api";

import { msg } from "@lit/localize";

export function FlowNameToLabel(name: string): string {
    switch (name) {
        case "Welcome to authentik!":
            return msg("Welcome to authentik!");
        case "Welcome to authentik! Please choose a username.":
            return msg("Welcome to authentik! Please choose a username.");
        case "Authorize Application":
            return msg("Authorize Application");
        case "Logged out":
            return msg("Logged out");
        case "Change password":
            return msg("Change password");
        case "User settings":
            return msg("User settings");
        case "Pre-authentication":
            return msg("Pre-authentication");
        case "Default initial setup":
            return msg("Default initial setup");
        case "Default static OTP setup":
            return msg("Default static OTP setup");
        case "Default TOTP setup":
            return msg("Default TOTP setup");
        case "Default WebAuthn setup":
            return msg("Default WebAuthn setup");
        default:
            return name;
    }
}

export function FlowTitleToLabel(title: string): string {
    switch (title) {
        case "Welcome to authentik!":
            return msg("Welcome to authentik!");
        case "Welcome to authentik! Please choose a username.":
            return msg("Welcome to authentik! Please choose a username.");
        case "Redirecting to %(app)s":
            return msg("Redirecting to %(app)s");
        case "You have logged out of %(app)s.":
            return msg("You have logged out of %(app)s.");
        case "Change password":
            return msg("Change password");
        case "Update your info":
            return msg("Update your info");
        case "Pre-authentication":
            return msg("Pre-authentication");
        case "Configure static OTP token":
            return msg("Configure static OTP token");
        case "Configure two-factor authentication":
            return msg("Configure two-factor authentication");
        case "Configure WebAuthn":
            return msg("Configure WebAuthn");
        default:
            return title;
    }
}

export function RenderFlowOption(flow: Flow): string {
    return `${flow.slug} (${FlowNameToLabel(flow.name)})`;
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
