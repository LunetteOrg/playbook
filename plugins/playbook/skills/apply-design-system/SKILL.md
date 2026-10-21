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

## 1. Find whose content it is

Before writing or laying out, settle under which brand the content goes out.
The brands and their design systems are in the playbook's
`.playbook/config.yaml`, under `brands`:

- a brand of the company: use its `design-system`;
- a client of the company: use the client's design system, from the client's
  own materials. If the client has none, follow the client's existing materials
  (logo, site, documents) and never the company's design system; say that the
  design system is missing to whoever asked for the work.

If it is not clear which brand applies, ask: it is the one question that
changes everything else. If `brands` is empty or missing, stop and propose the
entry to add.

## 2. Read the design system

Open the `design-system` of the brand: a URL or a path in the repository. Read,
in this order, the parts it has:

1. visual identity: logo, colour, typography, spacing, icons;
2. tone of voice: voice, tone per channel, writing rules;
3. the guide for the channel you are working on;
4. the glossary, while writing;
5. the tokens, when exact values are needed (colours, fonts, spacing, radii).

If the design system cannot be reached, use the most recent copy the playbook
points to and say that you are working from a copy.

## 3. Prefer templates

If a template or a generator exists for this content, use it: it already
embeds the design system. The playbook's procedures say which templates are
current. Apply the design system by hand only where there is none. If a
template in use contradicts the design system, do not fix it on your own:
report it.

## 4. Apply

- Colours and fonts come only from the tokens.
- The logo is used only from the official files: never redrawn, recoloured or
  recomposed.
- The voice follows the tone of the channel; words to avoid are in the
  glossary.
- Format, file name, folder and approvals are decided by the playbook's rules
  and procedures, not by the design system.

## 5. Check before delivering

1. Is it the right brand?
2. Do colours, fonts and logo come from the tokens and the official files?
3. Does the text pass the tone of voice's checklist?
4. Is every word on the glossary's avoid list absent?

If a point fails, fix it before delivering. If you cannot (the client has no
design system, the template is outdated), deliver and state the limit in the
message that goes with the content, not in the content itself.
