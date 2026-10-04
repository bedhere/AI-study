# Remove External Platform Buttons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove external-platform navigation, promotional, account, review, social, and footer buttons while preserving inline course-reference links and all local navigation.

**Architecture:** Add one deterministic Node.js sanitizer that processes both the original `slides` tree and the deployable `public/slides` mirror. It removes only explicitly classified UI anchors or containers, produces a JSON report of removals, and supports a check mode that fails if any classified target remains.

**Tech Stack:** Node.js standard library, static HTML/JavaScript, Vinext build, OpenAI Sites hosting.

## Global Constraints

- Preserve inline links to papers, official documentation, technical blogs, and tools.
- Preserve every relative or same-site course navigation link.
- Apply identical cleanup to Simplified Chinese, Traditional Chinese, English, and Korean pages.
- Remove empty promotional or navigation containers left behind by the deleted buttons.
- Publish the validated result to the existing private Site.

---

### Task 1: Add the deterministic sanitizer and inventory report

**Files:**
- Create: `scripts/remove-external-platform-buttons.mjs`
- Create: `reports/external-platform-buttons.json`

**Interfaces:**
- Consumes: HTML and JavaScript files below `../slides` and `public/slides`.
- Produces: `sanitizeTree(root, { checkOnly }): RemovalRecord[]`, where each record contains `file`, `category`, `href`, and `label`.
- CLI: `node scripts/remove-external-platform-buttons.mjs --check` exits 1 when classified targets remain; `node scripts/remove-external-platform-buttons.mjs --write` removes them and writes the report.

- [ ] **Step 1: Implement check mode before write mode**

Classify targets by UI context and known functions: navigation classes beginning with `nl`, Alice promotion classes `a-btn` and `a-more`, Watcha badge/review controls, social/footer controls, and Miyang account/profile controls. Do not classify an anchor merely because its URL is external.

- [ ] **Step 2: Run the check and confirm the current tree fails**

Run: `node scripts/remove-external-platform-buttons.mjs --check`

Expected: exit code 1 and a non-zero target count grouped by category.

- [ ] **Step 3: Run write mode**

Run: `node scripts/remove-external-platform-buttons.mjs --write`

Expected: both source trees are updated and `reports/external-platform-buttons.json` contains every removed target.

- [ ] **Step 4: Re-run check mode**

Run: `node scripts/remove-external-platform-buttons.mjs --check`

Expected: exit code 0 and `0 classified external platform buttons remain`.

### Task 2: Verify preserved course behavior

**Files:**
- Verify: `../slides/**/*.html`
- Verify: `public/slides/**/*.html`
- Verify: `reports/external-platform-buttons.json`

**Interfaces:**
- Consumes: the sanitized trees and removal report from Task 1.
- Produces: evidence that target buttons are absent while reference links and local navigation remain.

- [ ] **Step 1: Verify reference links remain**

Run searches for representative references including `platform.openai.com/tokenizer`, `arxiv.org`, `api-docs.deepseek.com`, and `lilianweng.github.io`.

Expected: each domain still appears in course-body pages.

- [ ] **Step 2: Verify local navigation remains**

Run searches for representative relative links such as `learn.html`, `1-2-base.html`, and previous/next navigation classes.

Expected: representative local links remain in every applicable language variant.

- [ ] **Step 3: Review the removal report**

Confirm every record belongs to Alice, GitHub, Miyang, Watcha, author/X, filing, or another navigation/promotion/footer external-platform category; no course-reference record is present.

### Task 3: Build and publish the sanitized site

**Files:**
- Modify: generated `dist/**`
- Verify: `.openai/hosting.json`

**Interfaces:**
- Consumes: the sanitized `public/slides` tree.
- Produces: a successful production build and a new private Site deployment.

- [ ] **Step 1: Build the production site**

Run: `npm run build`

Expected: exit code 0 and `Build complete`.

- [ ] **Step 2: Commit the exact validated source**

Stage the sanitizer, report, sanitized public files, design, and plan; commit with `feat: remove external platform buttons`.

- [ ] **Step 3: Push, package, and publish**

Push the commit to the existing Site source repository, package `dist` with the Sites helper, save and deploy one private version, then poll until deployment status is `succeeded`.

- [ ] **Step 4: Open and report the deployed result**

Open the production URL in the existing browser tab and report the URL plus the removal categories and counts from `reports/external-platform-buttons.json`.
