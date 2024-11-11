# Drupal Recommended StarterKit

[![CI](https://github.com/SpecbeeLabs/drupal-recommended-starterkit/actions/workflows/ci.yml/badge.svg)](https://github.com/SpecbeeLabs/drupal-recommended-starterkit/actions/workflows/ci.yml)

A Drupal StarterKit Project template based out of [Drupal Recommended
Project](https://github.com/drupal/recommended-project/) and [Drupal Composer Template](https://github.com/drupal-composer/drupal-project/) to create Drupal projects with out-of-box required tools and packages to kickstart a project.

## What is included

- [Drupal core](https://www.drupal.org/project/drupal)
- [Drush 12](https://www.drush.org/12.x/)
- [Grumphp](https://packagist.org/packages/specbee/drupal-quality-checker)(A PHP code-quality tool)
- [DDEV](https://ddev.com/)
- [DotEnv](https://www.drupal.org/project/dotenv)
- [Config Sync Without Site UUID](https://www.drupal.org/project/config_sync_without_site_uuid)

## Installation

Create a new project with Composer create project command from dev version.

```bash
composer create-project specbee/drupal-recommended-starterkit:10.x-dev
--no-interaction drupal10
cd drupal10
ddev start
```

This will install `drupal 10.3.0-beta1`
For `drupal 10.2.6` run the below command:

```bash
composer create-project specbee/drupal-recommended-starterkit:1.0.0
--no-interaction drupal10
cd drupal10
ddev start
```

For `drupal 11.0.0-beta1` run the below command:

```bash
composer create-project specbee/drupal-recommended-starterkit:2.0.0
--no-interaction drupal11
cd drupal10
ddev start
```

**Please note: You'll need DDEV 1.23.0 or later. [See the documentation](https://ddev.readthedocs.io/en/stable/users/install/ddev-upgrade/) if you need to upgrade.**

You can update the local development configurations for Local Development in the
`.ddev/config.yml` file. For example, to change the project name update the
`name` parameter in the configuration file.

## Adding Packages

Use `composer require` to include and download dependencies for your project.

```bash
cd some-dir
composer require drupal/devel
```

## Adding Libraries

You can manage front-end asset libraries with Composer thanks to the
[asset-packagist repository](https://asset-packagist.org/). Composer will detect
and install new versions of a library that meet the stated constraints.

```bash
composer require bower-asset/dropzone
```

## Using GrumPHP

The package setups code quality checking tools for Drupal project during git
commits.

### Forcing commit message format

To configure commit message structure, use the
[git_commit_message task](https://github.com/phpro/grumphp/blob/master/doc/tasks/git_commit_message.md).
For example, to enforce the commit message contains the Jira issue ID, use the
rule as the following snippet. More options are
[documented online](https://github.com/phpro/grumphp/blob/master/doc/tasks/git_commit_message.md).

```yaml
# grumphp.yml
grumphp:
  tasks:
    git_commit_message:
      matchers:
        "Must follow the pattern":
        '/(^JIRA-[0-9]+(: )[^ ].{5,}\.)|(Merge branch (.)+)/'
```

## Using DotEnv

You can now add environment variables to your `.env` file and it will
automatically be available in the `$_ENV` global var.

You can use it in `settings.php`, in service providers or in other places
throughout your code. Some examples:

```php
<?php
// phpcs:ignore
// settings.php.
$databases['default']['default'] = [
  'database' => $_ENV['DB_DATABASE'],
  'username' => $_ENV['DB_USERNAME'],
  'password' => $_ENV['DB_PASSWORD'] ?? '',
  'prefix' => '',
  'host' => $_ENV['DB_HOST'] ?? 'localhost',
  'port' => $_ENV['DB_PORT'] ?? 3306,
  'namespace' => 'Drupal\\Core\\Database\\Driver\\mysql',
  'driver' => 'mysql',
];

$config['mandrill.settings'] = [
  'mandrill_api_key' => $_ENV['MANDRILL_API_KEY'],
];
```

```php
// phpcs:ignore
<? php

namespace Drupal\yourmodule;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceProviderInterface;

/**
 * Sample class.
 */
class YourmoduleServiceProvider implements ServiceProviderInterface {

  /**
   * Sample method.
   */
  public function register(ContainerBuilder $container) {
    $container->setParameter('yourmodule.some_secret', $_ENV['SOME_SECRET']);
  }

}
php ?>
```

On live environments, you should invoke `drush dotenv:dump` every time your
`.env` file changes. If you don't, the `.env` file will be loaded at every
request, which will decrease the performance of your application.

You can use the `drush dotenv:dump` command to get debugging info about the
scanned dotenv files and the loaded variables.

Read the [Symfony documentation](https://symfony.com/doc/current/configuration.html#configuring-environment-variables-in-env-files) for more information.
