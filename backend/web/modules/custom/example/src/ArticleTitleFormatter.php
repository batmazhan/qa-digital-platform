<?php
declare(strict_types=1);

namespace Drupal\example;

/**
 * A small helper service for formatting article titles.
 */
final class ArticleTitleFormatter {

  /**
   * "My Test Article" -> "MY TEST ARTICLE".
   */
  public function toShout(?string $title): string {
    $title = trim((string) $title);
    return $title === '' ? '' : mb_strtoupper($title);
  }

  /**
   * Prefix with a label: "[City] My Test Article".
   */
  public function prefix(string $label, ?string $title): string {
    $title = trim((string) $title);
    return $title === '' ? '' : sprintf('[%s] %s', $label, $title);
  }
}

