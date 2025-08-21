<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Drupal\example\ArticleTitleFormatter;

// Load Composer autoload (vendor libs)
require_once '/opt/drupal/vendor/autoload.php';

// 👇 Add this line so the class is definitely loaded
require_once '/var/www/html/modules/custom/example/src/ArticleTitleFormatter.php';

final class ArticleTitleFormatterTest extends TestCase {
  public function testToShout_basic(): void {
    $fmt = new ArticleTitleFormatter();
    $this->assertSame('MY TEST ARTICLE', $fmt->toShout('My Test Article'));
  }

  public function testToShout_handlesEmpty(): void {
    $fmt = new ArticleTitleFormatter();
    $this->assertSame('', $fmt->toShout('   '));
    $this->assertSame('', $fmt->toShout(null));
  }

  public function testPrefix_happyPath(): void {
    $fmt = new ArticleTitleFormatter();
    $this->assertSame('[City] My Test Article', $fmt->prefix('City', 'My Test Article'));
  }

  public function testPrefix_handlesEmpty(): void {
    $fmt = new ArticleTitleFormatter();
    $this->assertSame('', $fmt->prefix('City', '  '));
  }
}
