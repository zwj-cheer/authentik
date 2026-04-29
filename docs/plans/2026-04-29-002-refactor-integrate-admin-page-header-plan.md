---
title: refactor: Integrate admin page header into content area
type: refactor
status: completed
date: 2026-04-29
---

# refactor: Integrate admin page header into content area

## Overview

Refine the admin page header introduced after moving page title/details out of the global navbar. The current structure is correct, but the visual treatment makes the page header feel like a separate white toolbar between the global header and the gray page body. This plan keeps the information architecture change and adjusts the page header so it reads as the start of the content area.

## Problem Frame

The user confirmed that page title, icon, and description should not live in the top navigation. After moving those details into the admin content area, the screenshot shows a new issue: the page header has a white background and bottom border, while the surrounding page body is gray. This creates three stacked horizontal regions: global navbar, page header strip, and page content. The goal is to reduce that split without putting page details back into the global navbar.

## Requirements Trace

- R1. Keep the global navbar focused on global navigation and actions; do not reintroduce page title or description there.
- R2. Make the page header visually belong to the page content area, not read as a third navigation layer.
- R3. Preserve the existing `setPageDetails()` event flow and page metadata behavior.
- R4. Keep tabs, cards, filters, and tables aligned with the new page header spacing.
- R5. Verify pages with title-only and title-with-description states, especially tabbed pages like system tasks.

## Scope Boundaries

- No route, sidebar, drawer, permission, or session behavior changes.
- No per-page rewrites unless a representative page exposes a real spacing conflict.
- No changes to user interface pages under `web/src/user/`.
- No new documentation beyond this implementation plan.

## Context & Research

### Relevant Code and Patterns

- `web/src/admin/ak-interface-admin.ts` now listens for `PageDetailsUpdate` and renders `renderPageHeader()` above the admin router outlet.
- `web/src/admin/ak-interface-admin.css` defines `.ak-c-page-header` with a white background, bottom border, and vertical padding; this is the main source of the visual split.
- `web/src/components/ak-page-navbar.ts` no longer renders page title/description, which should remain unchanged.
- `web/src/components/ak-page-navbar.css` now treats the top navbar as a compact global toolbar.
- Existing page content uses PatternFly `pf-c-page__main-section` spacing and gray background surfaces.

### Institutional Learnings

- No relevant `docs/solutions/` entry was found during the previous admin shell planning pass.

### External References

- None needed. This is a local visual integration pass using existing PatternFly/authentik shell patterns.

## Key Technical Decisions

- Keep the page header in `ak-interface-admin.ts`: the separation of global navigation and page content is still the right information architecture.
- Change the page header visual treatment, not the data flow: style `.ak-c-page-header` as part of the content canvas by removing the white strip effect.
- Align page header horizontal spacing with downstream page content: the title should line up with tabs, cards, filters, and tables instead of starting from a different visual grid.
- Prefer CSS-only adjustment: markup already has enough hooks for title row, icon, title, and description.

## Open Questions

### Resolved During Planning

- Should title/description move back into the navbar? No. The issue is visual integration after migration, not the migration itself.
- Should tabs be structurally merged into the page header? Not for this pass. A CSS-only content-area header is lower risk and should solve the visible split first.

### Deferred to Implementation

- Exact spacing values: tune against the system tasks page and at least one title-only page.
- Whether the page header needs a small bottom margin before tabs/cards: decide by browser screenshot, not by plan.

## Implementation Units

- [x] **Unit 1: Restyle admin page header as content-area heading**

**Goal:** Remove the separate white strip feeling from the admin page header while keeping the page title, icon, and description visible in the main content area.

**Requirements:** R1, R2, R3

**Dependencies:** None

**Files:**

- Modify: `web/src/admin/ak-interface-admin.css`
- Test: `web/src/admin/ak-interface-admin.css`

**Approach:**

- Remove or neutralize the page header white background and bottom border.
- Use the surrounding page background so the header feels like the first block of the content area.
- Set horizontal padding to match the content sections below.
- Reduce vertical padding enough that the header feels like page orientation, not a hero or toolbar.
- Keep icon/title/description styling simple and readable.

**Patterns to follow:**

- Existing PatternFly `pf-c-page__main-section` spacing in admin pages.
- Existing admin shell tokens in `web/src/admin/ak-interface-admin.css`.

**Test scenarios:**

- Visual: system tasks page with icon, title, description, and tabs reads as one content flow rather than three stacked bars.
- Visual: title-only page such as user statistics keeps a clear title without leaving excess empty space.
- Responsive: at mobile width, title and description wrap without overlapping global actions or tabs.

**Verification:**

- Browser screenshot shows no white page-header band between navbar and gray content.
- Page title remains visibly associated with the current page.

- [x] **Unit 2: Check alignment with tabbed and card-first pages**

**Goal:** Ensure the adjusted header aligns naturally with common admin content patterns.

**Requirements:** R4, R5

**Dependencies:** Unit 1

**Files:**

- Modify: `web/src/admin/ak-interface-admin.css` only if alignment tuning is needed
- Test: `web/src/admin/admin-overview/SystemTasksPage.ts`
- Test: `web/src/admin/admin-overview/DashboardUserPage.ts`

**Approach:**

- Use system tasks as the representative tabbed page.
- Use user statistics or overview as the representative title-only/card-first page.
- Tune margins/padding once in the shell instead of adding per-page exceptions.
- Avoid changing `ak-tabs` unless screenshots show a real spacing bug caused by the header.

**Patterns to follow:**

- Existing `pf-c-page__main-section` layout on `SystemTasksPage` and `DashboardUserPage`.

**Test scenarios:**

- Visual: tabs sit directly after the page header with consistent left alignment.
- Visual: aggregate cards below tabs or title align with the same content grid.
- Regression: table/filter cards still have their existing spacing and are not pulled under the title.

**Verification:**

- Representative pages look like one continuous content surface.
- No page-specific CSS is required for normal cases.

- [x] **Unit 3: Run focused formatting, type, and visual checks**

**Goal:** Confirm the CSS-only integration pass is safe and visually acceptable.

**Requirements:** R5

**Dependencies:** Units 1-2

**Files:**

- Test: `web/src/admin/ak-interface-admin.css`
- Test: `web/src/admin/ak-interface-admin.ts`
- Test: `web/src/components/ak-page-navbar.css`
- Test: `web/src/components/ak-page-navbar.ts`

**Approach:**

- Run focused formatting checks for the touched CSS/TS files.
- Run TypeScript checks if TypeScript remains touched in the working tree.
- Use browser or screenshot verification for desktop and mobile layouts.
- If Storybook remains unavailable in the local environment, use the running admin app or a lightweight browser layout check and note the limitation.

**Patterns to follow:**

- Previous validation used `npm run tsc`, focused `prettier`, and focused `eslint`.

**Test scenarios:**

- Formatting: touched CSS/TS files pass Prettier.
- Type: web TypeScript check passes when TypeScript files are part of the diff.
- Visual: desktop screenshot of system tasks shows the header integrated into the content area.
- Visual: mobile screenshot shows wrapped title/description without overlap.

**Verification:**

- Checks pass or any environment-only limitation is documented.
- Final diff is limited to the admin shell/page header integration.

## System-Wide Impact

- **Interaction graph:** Page metadata still flows through `setPageDetails()` and `PageDetailsUpdate`; only the page header presentation changes.
- **Error propagation:** Not applicable; this is visual/layout work.
- **State lifecycle risks:** Low. Avoid changing router outlet, drawer state, sidebar state, or route-change behavior.
- **API surface parity:** No backend, API, or generated client changes.
- **Integration coverage:** Browser screenshots are more useful than unit tests because the risk is visual hierarchy and spacing.
- **Unchanged invariants:** Global navbar remains page-detail-free; document title behavior remains owned by `ak-page-navbar`.

## Risks & Dependencies

| Risk                                                  | Mitigation                                                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Header becomes too subtle and users miss page context | Keep title typography strong enough and preserve icon/description where supplied                                  |
| Alignment fixes for one page harm another             | Tune only shared spacing against one tabbed page and one title-only page                                          |
| Tabs still feel detached                              | First solve background/border split; only consider tab-specific changes if screenshot proves they are still wrong |
| Storybook/dev server is unavailable locally           | Use focused type/format checks plus browser screenshot from available app or lightweight layout check             |

## Documentation / Operational Notes

- No product documentation or migration notes are needed.
- This is a visual refinement on top of the existing admin shell branch.

## Sources & References

- Related code: `web/src/admin/ak-interface-admin.ts`
- Related code: `web/src/admin/ak-interface-admin.css`
- Related code: `web/src/components/ak-page-navbar.ts`
- Related code: `web/src/components/ak-page-navbar.css`
- Representative page: `web/src/admin/admin-overview/SystemTasksPage.ts`
- Representative page: `web/src/admin/admin-overview/DashboardUserPage.ts`
