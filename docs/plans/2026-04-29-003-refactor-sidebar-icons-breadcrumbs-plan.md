---
title: refactor: Add sidebar section icons and admin breadcrumbs
type: refactor
status: completed
date: 2026-04-29
---

# refactor: Add sidebar section icons and admin breadcrumbs

## Overview

Refine the admin shell information hierarchy after moving page details out of the global navbar. Add icons to top-level sidebar sections, remove the page-header icon from the content heading, and add breadcrumbs above the page title so page context follows common admin application patterns.

## Problem Frame

The current shell now correctly keeps global navigation separate from page content, but the remaining page-header icon feels misplaced. The user chose the cleaner direction: top-level sidebar sections should carry category icons, second-level menu items should remain text-only, and the content area should use breadcrumbs for path context. This keeps the sidebar useful without making every menu row visually noisy.

## Requirements Trace

- R1. Top-level sidebar sections display a small category icon to the left of the section label.
- R2. Second-level sidebar menu items remain text-only.
- R3. Content page headers no longer display the page icon next to the title.
- R4. Content page headers display breadcrumbs above the title, derived from the current admin navigation hierarchy.
- R5. Existing route matching, sidebar expansion, command palette filtering, and enterprise menu behavior remain unchanged.

## Scope Boundaries

- No route table changes.
- No permission, enterprise gating, session, drawer, or command palette behavior changes.
- No user interface shell changes under `web/src/user/`.
- No attempt to add per-page custom breadcrumbs beyond what the sidebar tree can derive.
- No page-specific title or description copy rewrite in this pass.

## Context & Research

### Relevant Code and Patterns

- `web/src/admin/navigation/sidebar.ts` defines `SidebarEntry` as `[path, label, attributes, children]` and renders entries recursively through `renderSidebarItem()`.
- `web/src/elements/sidebar/SidebarItem.ts` renders expandable parent items and leaf links. It currently has no `icon` property.
- `web/src/elements/sidebar/SidebarItem.css` owns nav spacing, active state, nested spacing, and should receive icon alignment styles.
- `web/src/admin/ak-interface-admin.ts` owns admin shell state, sidebar entries, route changes, and the page header rendering added in the previous refactor.
- `web/src/admin/ak-interface-admin.css` owns `.ak-c-page-header` styles and should receive breadcrumb/title layout refinements.
- `web/src/components/ak-page-navbar.ts` should continue using page details for document title only; page details should not be rendered in the global navbar.

### Institutional Learnings

- No relevant `docs/solutions/` entries were found in prior admin shell planning passes.

### External References

- None needed. This is a local information hierarchy and layout refinement using existing Lit + PatternFly patterns.

## Key Technical Decisions

- Extend the existing sidebar entry attributes instead of changing tuple shape: add an optional `icon` property to `SidebarItemProperties` and pass it through the existing `attributes` object. This avoids breaking every existing `SidebarEntry` tuple.
- Add icons only to top-level section entries: this matches the user's chosen direction and keeps second-level menu scanning calm.
- Render sidebar icons inside `SidebarItem`: this keeps icon markup and CSS close to the component that owns nav presentation.
- Derive breadcrumbs from the existing sidebar entries: the sidebar tree already encodes parent and child labels, paths, and `activeWhen` patterns, so breadcrumbs should not require a second manually maintained map.
- Keep page-header icon data available for document title/page metadata compatibility, but stop rendering it in the content header.

## Open Questions

### Resolved During Planning

- Should every menu item get an icon? No. Only top-level sections should display icons; child entries remain text-only.
- Should the page-header icon stay visible? No. It should be removed from the content heading once category icons and breadcrumbs exist.
- Should breadcrumbs be manually defined per page? No. Start by deriving them from `createAdminSidebarEntries()` and enterprise entries.

### Deferred to Implementation

- Exact icon choices for each top-level section: choose conservative Font Awesome or PatternFly classes already available in the project.
- Exact breadcrumb separator and typography: tune visually in CSS against the current admin shell.
- How to handle routes not present in the sidebar: fall back to the current page title only, without rendering a misleading breadcrumb.

## Implementation Units

- [x] **Unit 1: Add top-level sidebar icon support**

**Goal:** Allow top-level sidebar sections to render an icon before the label without changing leaf menu behavior.

**Requirements:** R1, R2, R5

**Dependencies:** None

**Files:**

- Modify: `web/src/elements/sidebar/SidebarItem.ts`
- Modify: `web/src/elements/sidebar/SidebarItem.css`
- Modify: `web/src/admin/navigation/sidebar.ts`
- Test: `web/src/elements/sidebar/SidebarItem.ts`
- Test: `web/src/elements/sidebar/SidebarItem.css`

**Approach:**

- Add optional `icon?: string` to `SidebarItemProperties`.
- Add a property on `SidebarItem` for icon class names.
- Render the icon in parent/section labels, especially `renderWithChildren()`.
- Keep `renderWithPath()` child links text-only unless an entry explicitly provides an icon later.
- Add top-level icon attributes in `createAdminSidebarEntries()` and `createAdminSidebarEnterpriseEntries()`.
- Use existing icon class conventions such as Font Awesome or PatternFly classes already used in this repo.

**Patterns to follow:**

- Existing icon class rendering in `web/src/admin/ak-interface-admin.ts`.
- Existing sidebar spacing and active state styling in `web/src/elements/sidebar/SidebarItem.css`.
- Existing entry attributes spread in `web/src/admin/navigation/sidebar.ts`.

**Test scenarios:**

- Visual: top-level sections show one icon aligned with the label.
- Visual: second-level items under dashboards/applications remain text-only.
- Interaction: expanding and collapsing a top-level section still toggles normally.
- Regression: enterprise-only labels and notices remain readable.

**Verification:**

- Sidebar remains keyboard accessible and route highlighting still works.
- No child menu icon appears unless explicitly configured.

- [x] **Unit 2: Add breadcrumbs derived from sidebar navigation**

**Goal:** Show page context above the page title using the existing admin sidebar hierarchy.

**Requirements:** R3, R4, R5

**Dependencies:** Unit 1 only if helper logic is shared with sidebar entry types; otherwise none.

**Files:**

- Modify: `web/src/admin/navigation/sidebar.ts`
- Modify: `web/src/admin/ak-interface-admin.ts`
- Modify: `web/src/admin/ak-interface-admin.css`
- Test: `web/src/admin/navigation/sidebar.ts`
- Test: `web/src/admin/ak-interface-admin.ts`

**Approach:**

- Add a small exported helper in `sidebar.ts` that finds the breadcrumb path for a route by walking the sidebar tree.
- Match route paths using the same logic as sidebar current-state behavior: exact path first, then `activeWhen` patterns.
- In `ak-interface-admin.ts`, track the current active admin route from `routeChangeListener()` and render breadcrumbs above the title.
- Include both standard and enterprise sidebar entries when deriving breadcrumbs.
- Do not render breadcrumbs when no matching entry is found.
- Remove page-header icon rendering from the content header; keep page title and description.

**Patterns to follow:**

- `SidebarItem.matchesPath()` logic for exact path and `activeWhen`.
- Existing `routeChangeListener()` route synchronization in `web/src/admin/ak-interface-admin.ts`.
- Existing `.ak-c-page-header` typography and spacing in `web/src/admin/ak-interface-admin.css`.

**Test scenarios:**

- Happy path: `/administration/system-tasks` renders breadcrumbs `Dashboards / System Tasks` above the `System Tasks` title.
- Happy path: `/core/providers/<id>` matches the Providers `activeWhen` pattern and renders `Applications / Providers`.
- Edge case: route not found in sidebar renders no breadcrumb instead of stale or incorrect labels.
- Regression: page title and description still update through `setPageDetails()`.

**Verification:**

- Breadcrumbs reflect the current admin route after navigation.
- Page title no longer shows a leading icon.
- No duplicate route metadata map is introduced.

- [x] **Unit 3: Align breadcrumb and page-header presentation**

**Goal:** Make breadcrumbs, title, and description read as one content header without adding visual noise.

**Requirements:** R3, R4

**Dependencies:** Unit 2

**Files:**

- Modify: `web/src/admin/ak-interface-admin.css`
- Test: `web/src/admin/ak-interface-admin.css`

**Approach:**

- Style breadcrumbs as a small, muted row above the title.
- Use a familiar separator such as `/` or a subtle chevron, with enough contrast in light and dark themes.
- Keep title typography stronger than breadcrumb text.
- Keep description directly under title.
- Verify the header still aligns with tabs, cards, filters, and tables.

**Patterns to follow:**

- Existing PatternFly page section spacing.
- Existing muted text color usage through `--pf-global--Color--200`.

**Test scenarios:**

- Visual: breadcrumbs do not compete with title.
- Visual: long breadcrumb labels wrap or truncate without overlapping title/description.
- Responsive: mobile width keeps breadcrumbs readable and does not increase header height excessively.

**Verification:**

- The page header scans as breadcrumbs, title, description, then content.
- Header remains visually integrated into the content area.

- [x] **Unit 4: Focused validation**

**Goal:** Confirm the navigation hierarchy refinement is safe and visually correct.

**Requirements:** R1, R2, R3, R4, R5

**Dependencies:** Units 1-3

**Files:**

- Test: `web/src/admin/navigation/sidebar.ts`
- Test: `web/src/elements/sidebar/SidebarItem.ts`
- Test: `web/src/elements/sidebar/SidebarItem.css`
- Test: `web/src/admin/ak-interface-admin.ts`
- Test: `web/src/admin/ak-interface-admin.css`

**Approach:**

- Run focused formatting and lint checks for touched TypeScript/CSS files.
- Run TypeScript checks because this changes shared sidebar types.
- Use browser visual verification for a tabbed page and a title-only page.
- Check mobile width for breadcrumbs and sidebar icon alignment.

**Patterns to follow:**

- Previous validation used focused Prettier, focused ESLint, `npm run tsc`, and lightweight browser layout checks when Storybook was unavailable.

**Test scenarios:**

- Type: sidebar entry attributes accept `icon` without type errors.
- Type: breadcrumb helper handles entries with array attributes and object attributes.
- Visual: top-level icons appear only on section rows.
- Visual: page header displays breadcrumbs and no title icon.
- Regression: current sidebar item highlight and parent expansion still work.

**Verification:**

- Formatting, lint, and TypeScript checks pass.
- Visual checks confirm the shell matches the selected product direction.

## System-Wide Impact

- **Interaction graph:** Sidebar data now feeds both sidebar rendering and breadcrumb derivation. Keep this as one source of truth.
- **Error propagation:** Not applicable; this is navigation presentation and route-context work.
- **State lifecycle risks:** The active route used for breadcrumbs must update on route changes and must not leave stale breadcrumbs.
- **API surface parity:** No backend, generated API, or external API change.
- **Integration coverage:** Browser verification should cover sidebar, breadcrumb, page header, tabs, and current route highlighting together.
- **Unchanged invariants:** Existing route definitions, permission filtering, enterprise gating, command palette entries, and page detail events remain unchanged.

## Risks & Dependencies

| Risk                                                                | Mitigation                                                                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Breadcrumb route matching drifts from sidebar active-state matching | Reuse the same exact-path plus `activeWhen` matching semantics in `sidebar.ts`                                          |
| Adding icons makes sidebar visually busy                            | Limit icons to top-level section rows only                                                                              |
| Icon choices feel inconsistent                                      | Use one icon family and conservative category-level icons                                                               |
| Enterprise entries disappear from breadcrumbs                       | Include enterprise entries in breadcrumb search while preserving existing enterprise visibility behavior                |
| Page-header icon removal breaks image icon pages visually           | Title and breadcrumbs become the page context; keep icon metadata available but stop rendering it in the content header |

## Documentation / Operational Notes

- No user-facing documentation or operational rollout is required.
- This is a visual and navigation-context refinement on the existing admin shell branch.

## Sources & References

- Related code: `web/src/admin/navigation/sidebar.ts`
- Related code: `web/src/elements/sidebar/SidebarItem.ts`
- Related code: `web/src/elements/sidebar/SidebarItem.css`
- Related code: `web/src/admin/ak-interface-admin.ts`
- Related code: `web/src/admin/ak-interface-admin.css`
- Related code: `web/src/components/ak-page-navbar.ts`
