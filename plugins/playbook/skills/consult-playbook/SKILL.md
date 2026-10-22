---
name: consult-playbook
description: "Finds and explains what the company playbook says: how a task is done, which rules apply, who does what, which tool is used. Use for any question about the company's way of working, before answering from general knowledge."
metadata:
  status: in-force
---

# Consult the playbook

The playbook is the company's method: rules, processes, procedures and tool
cards, one entry per file. This skill finds what it says and answers from it.
It contains no method of its own.

## Where the playbook is

The repository you are working in when it has a `schema.yaml`; otherwise the
folder named by the `PLAYBOOK_DIR` environment variable; otherwise a tool that
gives access to it, such as the company's document server. If none is
available, say so and ask: never answer the company's way of working from
general knowledge.

## 1. Learn its structure

Read `schema.yaml` first. It says which types of entry exist, in which folder
each lives, how codes are formed (a prefix and a number), which header fields
are required, which status values mean valid, provisional or retired, and
which header fields are links to other entries.

`.playbook/config.yaml` holds values particular to the company (brands, the
settings of the shared skills). Folders the schema does not list are not
method: do not use them as a source.

## 2. Find the entries

- **By code**: the code gives the file. An entry with prefix `X` and number 4
  is the file in its folder whose name starts with `X-4-`.
- **By subject**: the title of an entry is its content in one line (for a
  rule, the rule itself). Search titles first, then the text.
- **By field**: areas, owners and other attributes are header fields; filter
  on them.

Files in a folder named after a code are that entry's attachments (models,
schemas, scripts), not entries.

## 3. Follow the links

Links between entries live in the header, one field per link, and the text
mentions only codes the header declares. Each relation is written on one side
only: a process lists its procedures, and a procedure does not repeat its
process. To find what links to an entry, search its code in the link fields of
the other entries.

To answer a question about a procedure, read it together with the rules,
tools and procedures it links. To answer a question about a process, read its
procedures in the order it lists them.

## 4. Tell what holds

- Only a valid entry applies. A provisional one (a draft, a trial) is a
  proposal: say so when you cite it. A retired one no longer applies: point to
  the entry that replaces it, if its header names one.
- A rule applies everywhere or only where an entry cites it, as its header
  says. Rules that apply everywhere hold in any answer about the work.
- If two entries disagree, report the disagreement with both codes instead of
  choosing one.

## 5. Answer

- Answer with what the playbook says and cite the codes of the entries you
  used, so the reader can open them. Summarise; do not copy whole entries.
- Say plainly when the playbook does not cover the question, and what is
  closest. Do not fill the gap with general practice presented as the
  company's.
- To carry out a procedure, use the `run-procedure` skill. To propose a change
  to the playbook, say what and where; the playbook is not edited while
  answering.
