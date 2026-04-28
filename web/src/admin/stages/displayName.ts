import { globalBrandingMessage } from "#elements/mixins/branding";

import { PromptTypeEnum } from "@goauthentik/api";

import { msg } from "@lit/localize";

export function displayStageName(stageName: string): string {
    switch (stageName) {
        case "default-authentication-identification":
            return msg("Default authentication identification stage");
        case "default-authentication-password":
            return msg("Default authentication password stage");
        case "default-authentication-mfa-validation":
            return msg("Default authentication MFA validation stage");
        case "default-authentication-login":
            return msg("Default authentication login stage");
        case "default-authenticator-static-setup":
            return msg("Default static authenticator setup stage");
        case "default-authenticator-totp-setup":
            return msg("Default TOTP authenticator setup stage");
        case "default-authenticator-webauthn-setup":
            return msg("Default WebAuthn authenticator setup stage");
        case "default-invalidation-logout":
            return msg("Default invalidation logout stage");
        case "default-password-change-prompt":
            return msg("Default password change prompt stage");
        case "default-password-change-write":
            return msg("Default password change write stage");
        case "default-provider-authorization-consent":
            return msg("Default provider authorization consent stage");
        case "default-source-authentication-if-sso":
            return msg("Default source authentication SSO check stage");
        case "default-source-authentication-login":
            return msg("Default source authentication login stage");
        case "default-source-enrollment-if-username":
            return msg("Default source enrollment username check stage");
        case "default-source-enrollment-if-sso":
            return msg("Default source enrollment SSO check stage");
        case "default-source-enrollment-login":
            return msg("Default source enrollment login stage");
        case "default-source-enrollment-prompt":
            return msg("Default source enrollment prompt stage");
        case "default-source-enrollment-write":
            return msg("Default source enrollment write stage");
        case "default-user-settings":
            return msg("Default user settings prompt stage");
        case "default-user-settings-write":
            return msg("Default user settings write stage");
        case "stage-default-oobe-password":
            return msg("Default initial setup prompt stage");
        default:
            return stageName;
    }
}

export function displayPromptName(promptName: string): string {
    switch (promptName) {
        case "default-source-enrollment-field-username":
            return msg("Default source enrollment username field");
        case "default-user-settings-field-username":
            return msg("Default user settings username field");
        case "default-user-settings-field-name":
            return msg("Default user settings name field");
        case "default-user-settings-field-email":
            return msg("Default user settings email field");
        case "default-user-settings-field-locale":
            return globalBrandingMessage(msg("Default authentik user settings locale field"));
        case "default-password-change-field-password":
            return msg("Default password change password field");
        case "default-password-change-field-password-repeat":
            return msg("Default password change password repeat field");
        case "initial-setup-field-header":
            return msg("Default initial setup header field");
        case "initial-setup-field-email":
            return msg("Default initial setup email field");
        case "initial-setup-field-password":
            return msg("Default initial setup password field");
        case "initial-setup-field-password-repeat":
            return msg("Default initial setup password repeat field");
        default:
            return promptName;
    }
}

export function displayPromptType(promptType: PromptTypeEnum | string): string {
    switch (promptType) {
        case PromptTypeEnum.Text:
            return msg("Text: Simple Text input");
        case PromptTypeEnum.TextArea:
            return msg("Text Area: Multiline text input");
        case PromptTypeEnum.TextReadOnly:
            return msg("Text (read-only): Simple Text input, but cannot be edited.");
        case PromptTypeEnum.TextAreaReadOnly:
            return msg("Text Area (read-only): Multiline text input, but cannot be edited.");
        case PromptTypeEnum.Username:
            return msg(
                "Username: Same as Text input, but checks for and prevents duplicate usernames.",
            );
        case PromptTypeEnum.Email:
            return msg("Email: Text field with Email type.");
        case PromptTypeEnum.Password:
            return msg(
                "Password: Masked input, multiple inputs of this type on the same prompt need to be identical.",
            );
        case PromptTypeEnum.Number:
            return msg("Number");
        case PromptTypeEnum.Checkbox:
            return msg("Checkbox");
        case PromptTypeEnum.RadioButtonGroup:
            return msg("Radio Button Group (fixed choice)");
        case PromptTypeEnum.Dropdown:
            return msg("Dropdown (fixed choice)");
        case PromptTypeEnum.Date:
            return msg("Date");
        case PromptTypeEnum.DateTime:
            return msg("Date Time");
        case PromptTypeEnum.File:
            return msg("File");
        case PromptTypeEnum.Separator:
            return msg("Separator: Static Separator Line");
        case PromptTypeEnum.Hidden:
            return msg("Hidden: Hidden field, can be used to insert data into form.");
        case PromptTypeEnum.Static:
            return msg("Static: Static value, displayed as-is.");
        case PromptTypeEnum.AkLocale:
            return globalBrandingMessage(
                msg("authentik: Locale: Displays a list of locales authentik supports."),
            );
        default:
            return promptType;
    }
}
