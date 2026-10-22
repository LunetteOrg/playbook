---
status: accepted
date: 2026-10-23
tags: [operator, roles, agents]
---

# Operator profile

## Context

The same request needs different work depending on who makes it: asked for a
quote, an agent drafts the project document for the person who owns the sale,
and the cost of one's own part for a freelancer working on it. A playbook
names who is responsible for each entry (`owner`), but an agent does not know
who it is working with. The answer must work in every app the operator uses,
including chat apps and workspace tools that cannot read the operator's files.

## Decision

- **The playbook describes the roles** in `.playbook/config.yaml`, on two
  separate axes:
  - `roles`: who is responsible for what, the values the entries use in
    `owner` and in their text, each with what it decides and whether it is
    internal;
  - `competences`: the kinds of work an operator does, which change the form
    of an answer, not who decides.
- **The operator's record is company data.** Which roles and competences a
  person has, and which clients they work on, is decided by the company and
  kept in its systems, with its other records. The playbook's `people` says
  where those records are and how to find a person in them (for example by
  email). The playbook holds no record.
- **The operator says only who they are and their preferences**, in the place
  each app already has for it: the user-level instructions of a coding agent
  (`AGENTS.md`, `CLAUDE.md`), the personal preferences of a chat app, the
  personal memory page of a workspace tool. Who they are is often known to the
  app already (the account's email). The same text may say where the playbook
  is, for agents working outside its repository.
- **The shared skills find the operator's record** where `people` says, with
  the identity the app or the instructions give. If they cannot reach it, they
  ask the operator's role before the first step or answer where it matters.

## Consequences

One record per person serves every app, and the company stays the only one
that assigns roles. An agent without access to the company's records asks
instead of guessing. The text each operator writes in their apps is short and
the same everywhere; generating it is `playbook install` (#5) and the
generated instructions (#8).

## Discarded directions

- **A personal profile file per operator.** Chat apps and workspace tools
  cannot read it, and a person would declare their own role.
- **One axis for roles and competences.** Who decides and what kind of work
  someone does vary independently.
- **Records inside the playbook.** They are personal data, which the playbook
  does not hold.
