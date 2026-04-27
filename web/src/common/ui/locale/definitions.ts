import { allLocales, sourceLocale as SourceLanguageTag } from "../../../locale-codes.js";

import type { LocaleModule } from "@lit/localize";

export type TargetLanguageTag = (typeof allLocales)[number];
export const TargetLanguageTags = new Set<TargetLanguageTag>(allLocales);

export { SourceLanguageTag };

/**
 * A dummy locale module representing the source locale (English).
 *
 * @remarks
 * This is used to satisfy the return type of {@linkcode LocaleLoaderRecord}
 * for the source locale, which does not need to be loaded.
 */
const sourceTargetModule: LocaleModule = {
    templates: {},
};

/**
 * A record mapping locale codes to their respective module loaders.
 *
 * @remarks
 * The `import` statements **must** reference a locale module path,
 * as this is how ESBuild identifies which files to include in the build.
 */
export const LocaleLoaderRecord: Record<TargetLanguageTag, () => Promise<LocaleModule>> = {
    [SourceLanguageTag]: () => Promise.resolve(sourceTargetModule),
    "zh-Hans": () => import("#locales/zh-Hans"),
};
