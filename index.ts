import { createElement } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

import App from '@albanian-xrm/styled-switch/App';
import { IStyledSwitchProps } from '@albanian-xrm/styled-switch/App.types';
import { IInputs, IOutputs } from '@albanian-xrm/styled-switch/generated/ManifestTypes';
import { IHandler, Notifier, SwitchValue } from '@albanian-xrm/styled-switch/notifier';
import '@albanian-xrm/styled-switch/banner';

export class StyledSwitch implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  private _notifier = new Notifier<SwitchValue>();
  private _disabledNotifier = new Notifier<boolean>();
  private _stylesNotifier = new Notifier<IStyledSwitchProps>();
  private _value: SwitchValue;
  private _styles: IStyledSwitchProps;
  private _disabled: boolean;
  private _container: HTMLDivElement;
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement,
  ): void {
    const onValueChanged: IHandler<SwitchValue> = (updatedValue) => {
      this._value = updatedValue;
      notifyOutputChanged();
    };
    this._container = container;
    this._disabled = context.mode.isControlDisabled;
    const disabled = this._disabled;
    const initialValue = context.parameters.Value.raw;
    this._value = initialValue;
    const notifier = this._notifier;
    const disabledNotifier = this._disabledNotifier;
    const stylesNotifier = this._stylesNotifier;
    context.mode.trackContainerResize(true);
    const Width =
      context.mode.allocatedWidth > 0
        ? context.mode.allocatedWidth
        : container.clientWidth > 0
        ? container.clientWidth
        : container.parentElement?.clientWidth;
    const Height =
      context.mode.allocatedHeight > 0
        ? context.mode.allocatedHeight
        : container.clientHeight > 0
        ? container.clientHeight
        : container.parentElement?.clientHeight;
    this._styles = {
      FalseHandleFill: context.parameters.FalseHandleFill.raw,
      FalseHandleImage: context.parameters.FalseHandleImage.raw,
      FalseTrackFill: context.parameters.FalseTrackFill.raw,
      TrueHandleFill: context.parameters.TrueHandleFill.raw,
      TrueHandleImage: context.parameters.TrueHandleImage.raw,
      TrueTrackFill: context.parameters.TrueTrackFill.raw,
      Width,
      Height,
    };
    const app = createElement(
      App,
      {
        styles: this._styles,
        disabled,
        initialValue,
        onValueChanged,
        notifier,
        disabledNotifier,
        stylesNotifier,
      },
      null,
    );
    // Add control initialization code
    render(app, container);

    if ((Width || 0) > 0 && (Height || 0) > 0) {
      return;
    }

    context.factory.requestRender();
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this.checkStyles(context);
    this.checkDisabled(context.mode.isControlDisabled);
    this.checkSelection(context.parameters.Value.raw);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      Value: this._value,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    unmountComponentAtNode(this._container);
  }

  private checkDisabled(disabled: boolean) {
    if (this._disabled === disabled) {
      return;
    }
    this._disabled = disabled;
    this._disabledNotifier.notify(this._disabled);
  }

  private checkSelection(value: boolean) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this._notifier.notify(value);
  }

  private checkStyles(context: ComponentFramework.Context<IInputs>) {
    const Width =
      context.mode.allocatedWidth > 0
        ? context.mode.allocatedWidth
        : this._container.clientWidth > 0
        ? this._container.clientWidth
        : this._container.parentElement?.clientWidth;
    const Height =
      context.mode.allocatedHeight > 0
        ? context.mode.allocatedHeight
        : this._container.clientHeight > 0
        ? this._container.clientHeight
        : this._container.parentElement?.clientHeight;
    if (
      this._styles.FalseHandleFill === context.parameters.FalseHandleFill.raw &&
      this._styles.FalseHandleImage === context.parameters.FalseHandleImage.raw &&
      this._styles.FalseTrackFill === context.parameters.FalseTrackFill.raw &&
      this._styles.TrueHandleFill === context.parameters.TrueHandleFill.raw &&
      this._styles.TrueHandleImage === context.parameters.TrueHandleImage.raw &&
      this._styles.TrueTrackFill === context.parameters.TrueTrackFill.raw &&
      this._styles.Width === Width &&
      this._styles.Height === Height
    ) {
      return;
    }
    this._styles = {
      FalseHandleFill: context.parameters.FalseHandleFill.raw,
      FalseHandleImage: context.parameters.FalseHandleImage.raw,
      FalseTrackFill: context.parameters.FalseTrackFill.raw,
      TrueHandleFill: context.parameters.TrueHandleFill.raw,
      TrueHandleImage: context.parameters.TrueHandleImage.raw,
      TrueTrackFill: context.parameters.TrueTrackFill.raw,
      Width,
      Height,
    };
    this._stylesNotifier.notify(this._styles);
  }
}
