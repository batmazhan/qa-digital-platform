<?php
declare(strict_types=1);

namespace Drupal\example;

final class TitleSlugger {
  /**
   * Convert a title to a URL-friendly slug.
   * "My Test Article!" -> "my-test-article"
   */
  public function slugify(?string $title): string {
    $t = trim((string) $title);
    if ($t === '') {
      return '';
    }
    // Normalize unicode dashes/quotes to spaces.
    $t = preg_replace('/[^\p{L}\p{N}]+/u', ' ', $t);
    // Collapse whitespace, trim, and replace spaces with dashes.
    $t = preg_replace('/\s+/u', ' ', $t);
    $t = trim($t);
    return mb_strtolower(str_replace(' ', '-', $t));
  }
}
