import { InputType, StatusChangeInputActionType } from "./const";

export type InputEvent = ViewChangeInputEvent | StatusChangeInputEvent;

export interface BaseInputEvent<TAction> {
  type: InputType;
  action: TAction;
}
export type ViewChangeInputValue =
  | ViewChangeTiltInputValue
  | ViewChangePanInputValue
  | ViewChangeZoomInputValue;

export interface ViewChangeTiltInputValue {
  deltaX: number;
  deltaY: number;
}

export interface ViewChangePanInputValue {
  deltaX: number;
  deltaY: number;
}

export interface ViewChangeZoomInputValue {
  zoom: number;
}

export enum ViewChangeInputActionType {
  Tilt = "Tilt",
  Pan = "Pan",
  Zoom = "Zoom",
}

export interface ViewChangeInputEvent
  extends BaseInputEvent<ViewChangeInputActionType> {
  type: InputType.ViewChange;
  action: ViewChangeInputActionType;
  value: ViewChangeInputValue;
}

export interface StatusChangeInputEvent
  extends BaseInputEvent<StatusChangeInputActionType> {
  type: InputType.StatusChange;
  action: StatusChangeInputActionType;
  value: StatusChangeInputValue;
}

export type StatusChangeInputValue = StatusChangeStartInputValue | null;

export interface StatusChangeStartInputValue {
  value: string;
}
