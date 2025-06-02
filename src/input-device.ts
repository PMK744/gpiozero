import type { InputPin } from "rppal";

import { Device } from "./device";

class InputDevice<T> extends Device<T> {
  /**
   * The GPIO pin used for output.
  */
  public readonly pins: T & Array<InputPin>;

  /**
   * Create a new InputDevice instance.
   * @param pin The GPIO pin to use for output.
   */
  public constructor(...pins: Array<InputPin>) {
    // Call the Device constructor with the pins
    super(...pins);

    // Assign the pins to the output device
    this.pins = pins as T & Array<InputPin>;
  }
}

export { InputDevice };
