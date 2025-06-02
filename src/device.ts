import { Pin, InputPin, OutputPin } from "rppal";

import { GPIO } from "./gpio";
import { OutputDevice } from "./output-device";
import { InputDevice } from "./input-device";

class Device<T> {
  /**
   * The GPIO pins used by this device.
  */
  public readonly pins: Array<Pin | InputPin | OutputPin>;

  /**
   * Create a new Device instance.
   * @param pins The GPIO pin to use for this device.
   */
  public constructor(...pins: Array<Pin | InputPin | OutputPin>) {
    // Assign the pins to the device
    this.pins = pins;

    // Register the device with the GPIO class
    GPIO.devices.set(pins, this);
  }

  /**
   * Check if the device is an input device.
   * @returns true if the device is an InputDevice, false otherwise.
   */
  public isInputDevice(): this is InputDevice<T> {
    // Check if the pin is an InputPin
    for (const pin of this.pins) {
      // Check if all the pins are InputPins
      if (!(pin instanceof InputPin)) return false;
    }

    // If all pins are InputPins, return true
    return true;
  }

  /**
   * Check if the device is an input device.
   * @returns true if the device is an InputDevice, false otherwise.
   */
  public isOutputDevice(): this is OutputDevice<T> {
    // Check if the pin is an OutputPin
    for (const pin of this.pins) {
      // Check if all the pins are OutputPins
      if (!(pin instanceof OutputPin)) return false;
    }

    // If all pins are OutputPins, return true
    return true;
  }
}

export { Device };
