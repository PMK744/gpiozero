import { OutputDevice } from "./output-device";
import { GPIO } from "./gpio";
import { OutputPin } from "rppal";

class Led extends OutputDevice<[OutputPin]> {
  /**
   * Whether the LED is active when the output is high.
   * If true, the LED will turn on when the output is high.
   * If false, the LED will turn on when the output is low.
  */
  private readonly activeHigh: boolean;

  /**
   * Returns the current value of the LED.
   * If the LED is on, it returns true; if the LED is off, it returns false.
   * This is determined by the activeHigh property.
  */
  public get value(): boolean {
    // Return true if the LED is on, false if it is off
    return this.activeHigh ? this.pins[0].isSetHigh : this.pins[0].isSetLow;
  }

  /**
   * Create a new LED instance.
   * @param pin The GPIO pin number to use for the LED.
   * @param activeHigh Whether the LED is active when the output is high.
   * @param initialValue The initial value of the LED (true for on, false for off).
   */
  public constructor(pin: number, activeHigh: boolean = true, initialValue: boolean = false) {
    // Get the GPIO pin from the GPIO class
    const output = GPIO.get(pin);

    // Convert the GPIO pin to an OutputPin and pass it to the OutputDevice constructor
    super(output.intoOutput());

    // Assign the activeHigh property
    this.activeHigh = activeHigh;

    // Set the initial value of the LED
    if (initialValue) this.on();
    else this.off();
  }

  public on(): void {
    // Check if the LED is active high or low and set the pin accordingly
    if (this.activeHigh) this.pins[0].setHigh();
    else this.pins[0].setLow();
  }

  public off(): void {
    // Check if the LED is active high or low and set the pin accordingly
    if (this.activeHigh) this.pins[0].setLow();
    else this.pins[0].setHigh();
  }

  public toggle(): void {
    // Toggle the LED state based on the current value
    if (this.value) this.off();
    else this.on();
  }

  public override isLed(): this is Led {
    // Check if the device is a Led
    return true;
  }
}

export { Led };
