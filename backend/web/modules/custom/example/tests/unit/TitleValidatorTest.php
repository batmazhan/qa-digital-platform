<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Drupal\example\TitleValidator;

require_once '/opt/drupal/vendor/autoload.php';
require_once '/var/www/html/modules/custom/example/src/TitleValidator.php';

final class TitleValidatorTest extends TestCase {

  public function testValid_minLength(): void {
    $v = new TitleValidator();
    $this->assertFalse($v->isValid('Hi', 3));
    $this->assertTrue($v->isValid('Hey', 3));
  }

  public function testValid_forbiddenTokens(): void {
    $v = new TitleValidator();
    $this->assertFalse($v->isValid('This has lorem inside'));
    $this->assertFalse($v->isValid('   test123 title   '));
    $this->assertTrue($v->isValid('Totally clean title'));
  }

  public function testValid_customForbiddenList(): void {
    $v = new TitleValidator();
    $this->assertFalse($v->isValid('BadWord here', 3, ['BadWord']));
    $this->assertTrue($v->isValid('Other word', 3, ['BadWord']));
  }
}
