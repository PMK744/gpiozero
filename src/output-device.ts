import type { OutputPin } from "rppal";

import { Device } from "./device";
import { Led } from "./led";
import { RGBLed } from "./rgb-led";
import { BarGraphLed } from "./bar-graph-led";

class OutputDevice<T> extends Device<T> {
  /**
   * The GPIO pin used for output.
  */
  public readonly pins: T & Array<OutputPin>;

  /**
   * Create a new OutputDevice instance.
   * @param pin The GPIO pin to use for output.
   */
  public constructor(...pins: Array<OutputPin>) {
    // Call the Device constructor with the pins
    super(...pins);

    // Assign the pins to the output device
    this.pins = pins as T & Array<OutputPin>;
  }

  /**
   * Turns the device on.
   */
  public on(): void {
    throw new Error(`Method ${this.constructor.name}.on() not implemented.`);
  };

  /**
   * Turns the device off.
   */
  public off(): void {
    throw new Error(`Method ${this.constructor.name}.off() not implemented.`);
  };

  /**
   * Toggles the device state.
   */
  public toggle(): void {
    throw new Error(`Method ${this.constructor.name}.toggle() not implemented.`);
  };

  /**
   * Whether the output device is a LED.
   * @returns true if the output device is a Led, false otherwise.
   */
  public isLed(): this is Led {
    return false;
  }

  /**
   * Whether the output device is an RGB LED.
   * @returns true if the output device is an RGBLed, false otherwise.
   */
  public isRGBLed(): this is RGBLed {
    return false;
  }

  /**
   * Whether the output device is a Bar Graph.
   * @returns true if the output device is a BarGraph, false otherwise.
   */
  public isBarGraph(): this is BarGraphLed {
    return false;
  }
}

export { OutputDevice };
