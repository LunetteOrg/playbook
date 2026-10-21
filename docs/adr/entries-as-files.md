---
status: accepted
date: 2026-10-21
tags: [format, entries, statuses]
---

# Entries as files

## Context

A company's way of working (rules, processes, procedures, the tools it uses,
the skills its agents run) is often kept in a database product. The content
then works only inside that product, cannot be versioned with the code, and
is read by agents through a connector at best.

## Decision

- **One Markdown file per entry, with a YAML header.** One folder per entry
  type. Agents and editors read the files directly; the repository is the
  only source.
- **Stable codes.** Entries that are cited by code (rules, processes,
  procedures) carry `code: <PREFIX>-<n>` and live in
  `<folder>/<PREFIX>-<n>-<topic>.md`. A code is never renumbered or reused.
  Tools are cited by file name; skills by folder name, in the Agent Skills
  format.
- **Statuses in three categories.** Each type names its own status values and
  maps each to `valid` (it applies), `provisional` (in preparation) or
  `retired` (it no longer applies). The checker reasons on categories only.
- **English structure, company language content.** Field names, enumerated
  values and folders are in English; titles and text are in the company's
  language.

## Consequences

The content moves with a `git clone`, any tool can read it, and changes go
through the same review as code. A company that wants a database view builds
it from the files, never the other way round.
