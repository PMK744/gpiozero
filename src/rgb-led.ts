import { OutputDevice } from "./output-device";

import { GPIO } from "./gpio";
import { OutputPin } from "rppal";

class RGBLed extends OutputDevice<[OutputPin, OutputPin, OutputPin]> {
  /**
   * Whether the LED is active when the output is high.
   * If true, the LED will turn on when the output is high.
   * If false, the LED will turn on when the output is low.
  */
  private readonly activeHigh: boolean;


  // The red, green, and blue color values for the LED.
  private $red: number = 0;
  private $green: number = 0;
  private $blue: number = 0;

  /**
   * The red color value for the LED.
  */
  public get red(): number {
    return this.$red;
  }

  /**
   * The red color value for the LED.
  */
  public set red(value: number) {
    // Set the red color value, ensuring it is between 0 and 1
    this.$red = Math.max(0, Math.min(1, value));

    // Clear the PWM on the pin to avoid conflicts
    this.pins[0].clearPwm();

    // Check if the LED is active
    if (this.value) this.pins[0].setPwmFrequency(10000, value);
  }

  /**
   * The green color value for the LED.
  */
  public get green(): number {
    return this.$green;
  }

  /**
   * The green color value for the LED.
  */
  public set green(value: number) {
    // Set the green color value, ensuring it is between 0 and 1
    this.$green = Math.max(0, Math.min(1, value));

    // Clear the PWM on the pin to avoid conflicts
    this.pins[1].clearPwm();

    // Check if the LED is active
    if (this.value) this.pins[1].setPwmFrequency(10000, value);
  }

  /**
   * The blue color value for the LED.
  */
  public get blue(): number {
    return this.$blue;
  }

  /**
   * The blue color value for the LED.
  */
  public set blue(value: number) {
    // Set the blue color value, ensuring it is between 0 and 1
    this.$blue = Math.max(0, Math.min(1, value));

    // Clear the PWM on the pin to avoid conflicts
    this.pins[2].clearPwm();

    // Check if the LED is active
    if (this.value) this.pins[2].setPwmFrequency(10000, value);
  }

  /**
   * Returns the current value of the LED.
   * If the LED is on, it returns true; if the LED is off, it returns false.
   * This is determined by the activeHigh property.
  */
  public get value(): boolean {
    // Iterate over each pin and check if any of them is set high or low based on the activeHigh property
    for (const pin of this.pins) {
      // Check if activeHigh is true
      if (this.activeHigh) {
        // Return true if any pin is set high
        if (pin.isSetHigh) return true;
      } else {
        // Return true if any pin is set low
        if (pin.isSetLow) return true;
      }
    }

    return false;
  }

  /**
   * Create a new RGBLed instance.
   * @param redPin The GPIO pin number for the red color.
   * @param greenPin The GPIO pin number for the green color.
   * @param bluePin The GPIO pin number for the blue color.
   * @param activeHigh Whether the LED is active when the output is high (default: true).
   * @param initialValue The initial value of the LED (default: false, meaning the LED is off).
   */
  public constructor(redPin: number, greenPin: number, bluePin: number, activeHigh: boolean = true, initialValue: boolean = false) {
    // Get the GPIO pins from the GPIO class
    const redOutput = GPIO.get(redPin);
    const greenOutput = GPIO.get(greenPin);
    const blueOutput = GPIO.get(bluePin);

    // Convert the GPIO pins to OutputPins and pass them to the OutputDevice constructor
    super(redOutput.intoOutput(), greenOutput.intoOutput(), blueOutput.intoOutput());

    // Assign the activeHigh property
    this.activeHigh = activeHigh;

    // Set the initial value of the LED
    if (initialValue) this.on();
    else this.off();
  }

  /**
   * Turns the device on.
   */
  public on(): void {
    // Get the red, green, and blue pins from the device
    const redPin = this.pins[0];
    const greenPin = this.pins[1];
    const bluePin = this.pins[2];

    // Set the PWM frequency for each pin based on the activeHigh property
    redPin.setPwmFrequency(10000, this.activeHigh ? this.red : 1 - this.red);
    greenPin.setPwmFrequency(10000, this.activeHigh ? this.green : 1 - this.green);
    bluePin.setPwmFrequency(10000, this.activeHigh ? this.blue : 1 - this.blue);
  }

  /**
   * Turns the device off.
   */
  public off(): void {
    // Iterate over each pin and set it to high or low based on the activeHigh property
    for (const pin of this.pins) {
      // Clear the PWM on the pin to avoid conflicts
      pin.clearPwm();

      // Check if the LED is active high or low and set the pin accordingly
      if (this.activeHigh) pin.setLow();
      else pin.setHigh();
    }
  }

  /**
   * Toggles the device state.
   * If the LED is currently on, it will turn off; if it is off, it will turn on.
   */
  public toggle(): void {
    // Toggle the LED state based on the current value
    if (this.value) this.off();
    else this.on();
  }

  public isRGBLed(): this is RGBLed {
    return true;
  }
}

export { RGBLed };
