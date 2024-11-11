# Patches

### Use a local patch to refer to a drupal.org Merge Request without patches

When referring to an issue that doesn't have a patch (only a Merge Request),
never use the GitLab URL with the .patch suffix. Follow the instructions on how
to create a local patch from a Merge Request, and save it in the
patches/upstream/ directory in your project.

```
"Issue #3355495 - PHP 8.2 deprecation issue with AutosaveFormBuilder":
"patches/upstream/3355495-9.patch"
```

### Use local patches for project-specific modifications

When a patch is needed but it can't be contributed back because it's too
specific to the project, store the patch in the patches/local/ directory:

```
"Print issues on Senior Staff Page": "patches/local/printable-issue.patch"
```
