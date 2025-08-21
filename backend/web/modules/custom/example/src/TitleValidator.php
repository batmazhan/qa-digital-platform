<?php
declare(strict_types=1);

namespace Drupal\example;

final class TitleValidator {
  /**
   * Returns true if the title is acceptable:
   * - non-empty after trim
   * - at least minLen chars
   * - no forbidden tokens (e.g., "lorem", "test123")
   */
  public function isValid(?string $title, int $minLen = 3, array $forbidden = ['lorem','test123']): bool {
    $t = trim((string) $title);
    if (mb_strlen($t) < $minLen) {
      return false;
    }
    foreach ($forbidden as $bad) {
      if ($bad !== '' && mb_stripos($t, $bad) !== false) {
        return false;
      }
    }
    return true;
  }
}
