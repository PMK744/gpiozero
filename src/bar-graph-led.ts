import { OutputPin } from "rppal";
import { OutputDevice } from "./output-device";
import { Led } from "./led";

class BarGraphLed extends OutputDevice<Array<OutputPin>> {
  /**
   * Whether the LEDs are active when the output is high.
   * If true, the LEDs will turn on when the output is high.
   * If false, the LEDs will turn on when the output is low.
  */
  private readonly activeHigh: boolean;

  /**
   * The LEDs used in the bar graph.
  */
  public readonly leds: Array<Led> = [];

  /**
   * The amount of LEDs that are currently on.
  */
  public get value(): number {
    // Return the number of LEDs that are currently on
    let count = 0;

    // Iterate through each LED in the bar graph
    for (const led of this.leds) {
      // Check if the LED is active high or low and count it accordingly
      if (this.activeHigh ? led.pins[0].isSetHigh : led.pins[0].isSetLow) {
        count++;
      }
    }

    // Return the count of LEDs that are currently on
    return count;
  }

  /**
   * The amount of LEDs that are currently on.
  */
  public set value(value: number) {
    // Set the value of the bar graph, ensuring it is between 0 and the number of pins
    if (value < 0) value = 0;
    if (value > this.pins.length) value = this.pins.length;

    // Turn on the LEDs up to the specified value
    for (let i = 0; i < this.pins.length; i++) {
      // Check if the current index is less than the value
      if (i < value) {
        // Check if the LED is active high or low and set the pin accordingly
        if (this.activeHigh) this.pins[i]?.setHigh();
        else this.pins[i]?.setLow();
      } else {
        // Check if the LED is active high or low and set the pin accordingly
        if (this.activeHigh) this.pins[i]?.setLow();
        else this.pins[i]?.setHigh();
      }
    }

  }

  /**
   * Create a new BarGraphLed instance.
   * @param pins The GPIO pins to use for the bar graph.
   * @param activeHigh Whether the LEDs are active when the output is high.
   * @param initialValue The initial value of the bar graph (number of LEDs on).
   */
  public constructor(pins: Array<number>, activeHigh: boolean = true, initialValue: number = 0) {
    // Convert the GPIO pin to an OutputPin and pass it to the OutputDevice constructor
    super();

    // Assign the activeHigh property
    this.activeHigh = activeHigh;

    // Set the initial value of the LED
    this.value = initialValue;

    // Create Led instances for each pin and store them in the leds array
    for (const pin of pins) {
      // Create a new Led instance for each pin
      const led = new Led(pin, this.activeHigh, initialValue > 0);

      // Push the Led instance to the leds array
      this.leds.push(led);

      // Push the pin to the pins array
      this.pins.push(led.pins[0]);
    }
  }

  public override on(): void {
    // Turn on all LEDs in the bar graph
    for (const led of this.leds) led.on();
  }

  public override off(): void {
    // Turn off all LEDs in the bar graph
    for (const led of this.leds) led.off();
  }

  public override toggle(): void {
    // Toggle the state of all LEDs in the bar graph
    for (const led of this.leds) led.toggle();
  }

  public override isBarGraph(): this is BarGraphLed {
    // Check if the device is a BarGraphLed
    return true;
  }
}

export { BarGraphLed };
