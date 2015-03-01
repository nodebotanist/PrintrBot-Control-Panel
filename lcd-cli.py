import argparse
import Adafruit_CharLCD as LCD

parser = argparse.ArgumentParser()

parser.add_argument('message')
parser.add_argument('red')
parser.add_argument('green')
parser.add_argument('blue')

parser.add_argument('--clear', action="store_true")
parser.add_argument('--line_number')

args = parser.parse_args()

lcd = LCD.Adafruit_RGBCharLCD('P8_8', 'P8_10', 'P8_18', 'P8_16', 'P8_14', 'P8_12', 20, 4, 'P9_16', 'P9_14', 'P8_13', enable_pwm=True);

lcd.set_color(args.red, args.green, args.blue)
if args.clear:
  lcd.clear()

if args.line_number:
  lcd.set_cursor(0, int(args.line_number))

print(args.message)
lcd.message(args.message)

