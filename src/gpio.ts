import type { InputPin, OutputPin, Pin } from "rppal";
import { Gpio as IGpio } from "rppal";

import { Device } from "./device";

class Gpio extends IGpio {
  /**
   * Holds a set of GPIO pins that are currently in use.
  */
  public readonly devices = new Map<Array<Pin | InputPin | OutputPin>, Device<unknown>>();

  public getDevice(pin: number): Device<unknown> | null {
    // Iterate through the devices map to find the device with the specified pin
    for (const [pins, device] of this.devices) {
      // Iterate through the pins of the device
      for (const key of pins) {
        // Check if the pin matches the specified pin number
        if (key.pin === pin) return device;
      }
    }

    // If no device is found with the specified pin, return null
    return null;
  }
}

export const GPIO = new Gpio();
