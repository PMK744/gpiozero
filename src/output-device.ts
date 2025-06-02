import type { OutputPin } from "rppal";

import { Device } from "./device";
import { Led } from "./led";

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
   * Whether the output device is a LED.
   * @returns true if the output device is a Led, false otherwise.
   */
  public isLed(): this is Led {
    return false;
  }
}

export { OutputDevice };