import {
  InputType,
  StatusChangeInputActionType,
  ViewChangeInputActionType,
} from "./const";

export type InputEvent = ViewChangeInputEvent | StatusChangeInputEvent;

export interface BaseInputEvent {
  type: InputType;
}
export type ViewChangeInputValue =
  | ViewChangeTiltInputValue
  | ViewChangePanInputValue
  | ViewChangeZoomInputValue;

export interface ViewChangeTiltInputValue {
  type: ViewChangeInputActionType.Tilt;
  deltaX: number;
  deltaY: number;
}

export interface ViewChangePanInputValue {
  type: ViewChangeInputActionType.Pan;
  deltaX: number;
  deltaY: number;
}

export interface ViewChangeZoomInputValue {
  type: ViewChangeInputActionType.Zoom;
  zoom: number;
}

export interface ViewChangeInputEvent extends BaseInputEvent {
  type: InputType.ViewChange;
  value: ViewChangeInputValue;
}

export interface StatusChangeInputEvent extends BaseInputEvent {
  type: InputType.StatusChange;
  value: StatusChangeInputValue;
}

export type StatusChangeInputValue =
  | StatusChangeStartInputValue
  | StatusChangeNoneInputValue;

export interface StatusChangeStartInputValue {
  type: StatusChangeInputActionType.Start;
  value: string;
}

export interface StatusChangeNoneInputValue {
  type:
    | StatusChangeInputActionType.Stop
    | StatusChangeInputActionType.Up
    | StatusChangeInputActionType.Down;
  value: null;
}
