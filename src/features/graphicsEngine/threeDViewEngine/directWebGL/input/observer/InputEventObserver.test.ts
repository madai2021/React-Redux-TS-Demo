import Logger from "../../../../../../config/logger";
import {
  InputType,
  StatusChangeInputActionType,
  ViewChangeInputActionType,
} from "../observable";
import { InputEventObserver } from "./InputEventObserver";

// Logger をモック
jest.mock("../../../../../../config/logger", () => {
  return {
    __esModule: true,
    default: {
      info: jest.fn(),
      warn: jest.fn(),
    },
  };
});

// InputEventObservable をモック
jest.mock("../observable", () => {
  const original = jest.requireActual("../observable");
  return {
    ...original,
    InputEventObservable: jest.fn().mockImplementation(() => ({
      subscribe: jest.fn().mockReturnValue({ dispose: jest.fn() }),
      dispose: jest.fn(),
    })),
  };
});

describe("InputEventObserver", () => {
  let canvas: HTMLCanvasElement;
  let observer: InputEventObserver;

  beforeEach(() => {
    canvas = document.createElement("canvas");
    observer = new InputEventObserver(canvas);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call #onNextViewChange for view change events", () => {
    const event = {
      type: InputType.ViewChange,
      value: { type: ViewChangeInputActionType.Tilt, delta: 10 },
    } as any;

    observer.onNext(event);

    expect(Logger.info).toHaveBeenCalledWith(event);
    expect(Logger.info).toHaveBeenCalledWith(event.value);
    expect(Logger.info).toHaveBeenCalledWith("onViewChangeTilt", event.value);
  });

  it("should call #onNextStatusChange for status change events", () => {
    const event = {
      type: InputType.StatusChange,
      value: { type: StatusChangeInputActionType.Start },
    } as any;

    observer.onNext(event);

    expect(Logger.info).toHaveBeenCalledWith(event);
    expect(Logger.info).toHaveBeenCalledWith(event.value);
    expect(Logger.info).toHaveBeenCalledWith(
      "onStatusChangeStart",
      event.value,
    );
  });

  it("should warn on unknown event type", () => {
    const event = { type: "unknown", value: {} } as any;
    observer.onNext(event);
    expect(Logger.warn).toHaveBeenCalledWith("Unknown input event:", event);
  });

  it("dispose should call disposables and observable dispose", () => {
    const disposeSpy = jest.spyOn((observer as any).disposables[0], "dispose");
    const observableDisposeSpy = jest.spyOn(
      (observer as any).inputEventObservable,
      "dispose",
    );

    observer.dispose();

    expect(disposeSpy).toHaveBeenCalled();
    expect(observableDisposeSpy).toHaveBeenCalled();
  });
});
