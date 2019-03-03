# Commit Message Format

Each commit message consists of a **header** and an optional **body**, separated
by an empty line.

## Header

Format: `[type][jira-key] subject`.

**type** must have one of the following values:

* **feat**: a new feature
* **fix**: a bug fix
* **docs**: documentation only changes
* **style**: changes that do not affect the meaning of the code (white-space,
  formatting, missing semi-colons, etc)
* **refactor**: a code change that neither fixes a bug nor adds a feature
* **perf**: a code change that improves performance
* **test**: adding missing tests
* **chore**: changes to the build process or auxiliary tools and libraries such
  as documentation generation

**jira-key** is optional.

**subject** is a succinct description of the change and:

* uses the imperative, present tense: "change" not "changed" nor "changes"
* doesn't capitalize the first letter
* has no dot (.) at the end

## Body

Just as in the **subject**, use the imperative, present tense: "change" not
"changed" nor "changes". The body should include the motivation for the change
and contrast this with previous behavior.

## Example

```
[chore][RPA-1]: first version of re-planning-api

Add documentation, SQL initial scripts and business logic.
```


## Conventions

Write project conventions here!
