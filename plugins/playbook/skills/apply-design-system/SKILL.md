---
name: apply-design-system
description: "Applies the right brand's design system to any content meant for people outside the company: documents, PDFs, contracts, proposals, slides, posts, emails, pages and interfaces. Use before producing or delivering such content."
metadata:
  status: in-force
---

# Apply the design system

Content that leaves the company carries the look and the voice of the brand it
belongs to. This skill says how to apply a design system; it does not contain
one. It reads it every time, because design systems change.

Everything particular to the company is in the playbook's
`.playbook/config.yaml`. The playbook is the repository you are working in when
it has a `.playbook/` folder; otherwise the folder named by the `PLAYBOOK_DIR`
environment variable. If neither exists, ask where the playbook is.

## 1. Find whose content it is

Before writing or laying out, settle under which brand the content goes out.

- **A brand of the company**: the entries under `brands`. Each says what it
  `covers`; the one with `default: true` applies when nothing else does. A
  brand whose `design-system` is `none` is outside this skill: follow its
  `note`.
- **A client of the company**: the client's design system, where
  `clients.design-system` says it lives. If the client has none, follow the
  client's existing materials (logo, site, documents) and never the company's
  design system; say that the design system is missing to whoever asked for
  the work.

If it is not clear which brand applies, ask: it is the one question that
changes everything else. If `brands` is empty or missing, stop and propose the
entry to add.

## 2. Read the design system

Open the brand's `design-system`: a URL or a path. If it cannot be reached,
use the most recent of its `copies` and say that you are working from a copy,
which may lag behind the original. The design system is changed only in the
original, never in a copy.

Read, in this order, the parts it has:

1. visual identity: logo, colour, typography, spacing, icons;
2. tone of voice: voice, tone per channel, writing rules;
3. the guide for the channel you are working on;
4. the glossary, while writing;
5. the tokens, when exact values are needed (colours, fonts, spacing, radii).

A client's design system is read the same way.

## 3. Prefer templates

If a template or a generator exists for this content, use it: it already
embeds the design system. The playbook's procedures say which templates are
current. Apply the design system by hand only where there is none. If a
template in use contradicts the design system, do not fix it on your own:
report it.

## 4. Apply

- Colours and fonts come only from the tokens: no colour picked by eye, no
  font or fallback other than the design system's.
- The logo is used only from the official files: never redrawn, recoloured or
  recomposed with text.
- The voice follows the tone of the channel; words to avoid are in the
  glossary.
- Format, file name, folder and approvals are decided by the playbook's rules
  and procedures, not by the design system. Read the rules listed under
  `skills.apply-design-system.rules` in the configuration.

## 5. Check before delivering

1. Is it the right brand?
2. Do colours, fonts and logo come from the tokens and the official files?
3. Does the text pass the tone of voice's checklist?
4. Is every word on the glossary's avoid list absent?
5. Does the content meet the rules listed under
   `skills.apply-design-system.rules` (notes it must carry, formats, names)?

If a point fails, fix it before delivering. If you cannot (the client has no
design system, the template is outdated), deliver and state the limit in the
message that goes with the content, not in the content itself.
