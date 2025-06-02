import{ type InputPin, Bias } from "rppal";

import { InputDevice } from "./input-device";

import { GPIO } from "./gpio";

class Button extends InputDevice<[InputPin]> {
  /**
   * The bias for the button, either PullUp or PullDown.
   * This determines how the button behaves when not pressed.
  */
  private readonly bias: Bias;

  // Set to hold listeners for button press and release events
  private readonly onPressListeners = new Set<() => void>();
  private readonly onReleaseListeners = new Set<() => void>();

  /**
   * Whether the button is currently being pressed.
  */
  public get isPressed(): boolean {
    // Get the first pin from the pins array
    const pin = this.pins[0];

    // Check if the pin is pressed based on the bias
    return this.bias === Bias.PullUp ? pin.isSetLow : pin.isSetHigh;
  }

  public constructor(pin: number, pullUp: boolean = true) {
    // Get the GPIO pin from the GPIO class
    const output = GPIO.get(pin);

    // Call the InputDevice constructor with the pin
    super(output.intoInput());

    // Set the bias for the button
    this.bias = pullUp ? Bias.PullUp : Bias.PullDown;
    this.pins[0].setBias(this.bias);

    // Define the initial state of the button
    let lastPressedState = this.isPressed;

    // Create a state change listener that checks the button state
    const stateChangeListener = () => {
      // Get the current pressed state of the button
      const currentPressedState = this.isPressed;

      // Check if the pressed state has changed
      if (currentPressedState !== lastPressedState) {
        lastPressedState = currentPressedState;

        // If the button is pressed, call all onPress listeners
        if (!currentPressedState) {
          // Call all registered onPress listeners
          for (const listener of this.onPressListeners) listener();
        } else {
          // Call all registered onRelease listeners
          for (const listener of this.onReleaseListeners) listener();
        }
      }

      // Schedule the next state change listener call
      setImmediate(stateChangeListener);
    }

    // Call the state change listener when the pin state changes
    setImmediate(stateChangeListener);
  }

  /**
   * Listen for button press events.
   * @param listener The function to call when the button is pressed.
   */
  public onPress(listener: () => void): void {
    // Add the listener to the set of onPress listeners
    this.onPressListeners.add(listener);
  }

  /**
   * Listen for button release events.
   * @param listener The function to call when the button is released.
   */
  public onRelease(listener: () => void): void {
    // Add the listener to the set of onRelease listeners
    this.onReleaseListeners.add(listener);
  }
}

export { Button };
