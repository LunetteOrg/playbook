---
status: accepted
date: 2026-10-22
tags: [operator, roles, agents]
---

# Operator profile

## Context

The same request needs different work depending on who makes it: asked for a
quote, an agent drafts the project document for the person who owns the sale,
and the cost of one's own part for a freelancer working on it. A playbook
already names who is responsible for each entry (`owner`), but an agent does
not know who it is working with. The answer must reach every app the operator
uses, including chat apps without a file system.

## Decision

- **The playbook describes the roles** in `.playbook/config.yaml`, on two
  separate axes:
  - `roles`: who is responsible for what, the values the entries use in
    `owner` and in their text (the owner, administration, a freelancer…), each
    with what it decides and whether it is internal;
  - `competences`: the kinds of work an operator does (development, content,
    data…), which change the form of an answer, not who decides.
- **Each operator has a personal profile**, never in the playbook:
  `~/.config/playbook/profile.yaml`, one entry per playbook the operator works
  with, keyed by the playbook's `company`. It holds the playbook's path, the
  operator's roles and competences, and the language. Names and per-client
  assignments stay in the company's systems, not in the profile.
- **The shared skills read the profile.** `run-procedure` compares the
  operator's roles with who carries out each step: it acts on the operator's
  steps and prepares the others for their owner, then stops. `consult-playbook`
  shapes its answer to the operator's roles and competences. The profile's path
  is also where both find the playbook outside its repository.
- **The profile reaches each app in the form the app accepts**: the user-level
  instructions of a coding agent; the personal preferences of a chat app,
  pasted by hand where there is no API; the personal memory page of a
  workspace tool, written through its connector after the operator confirms.
  Generating them is `playbook install` (#5) and the generated instructions
  (#8); until then they are written by hand from the profile.

## Consequences

An agent knows who it works with before it asks, and the same profile serves
every app. A role added to the playbook is available to every operator at
once; a person changing role changes one file.

## Discarded directions

- **One axis for roles and competences.** Who decides and what kind of work
  someone does vary independently: a freelancer may do development or
  content, and the owner may do both.
- **The profile inside the playbook.** It would put names and personal
  settings in a shared repository, against the playbook's own rule on
  personal data.
