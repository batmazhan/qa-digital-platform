<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Drupal\example\TitleSlugger;

require_once '/opt/drupal/vendor/autoload.php';
require_once '/var/www/html/modules/custom/example/src/TitleSlugger.php';

final class TitleSluggerTest extends TestCase {

  public function testSlugify_basic(): void {
    $s = new TitleSlugger();
    $this->assertSame('my-test-article', $s->slugify('My Test Article!'));
  }

  public function testSlugify_handlesEmptyAndWhitespace(): void {
    $s = new TitleSlugger();
    $this->assertSame('', $s->slugify('   '));
    $this->assertSame('', $s->slugify(null));
  }

  /**
   * @dataProvider unicodeTitles
   */
  public function testSlugify_unicode(string $input, string $expected): void {
    $s = new TitleSlugger();
    $this->assertSame($expected, $s->slugify($input));
  }

  public static function unicodeTitles(): array {
    return [
      ['Crème brûlée — Café', 'crème-brûlée-café'],
      ["Tabs\tand\nspaces", 'tabs-and-spaces'],
      ['Multiple   spaces', 'multiple-spaces'],
    ];
  }
}
