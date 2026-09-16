import { MicrophoneStatus } from "@/types/mission";

/**
 * Checks if the browser environment supports audio input devices
 * without requesting user permission.
 */
export function isAudioInputSupported(): boolean {
  if (typeof navigator === "undefined") return false;
  return Boolean(
    navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function"
  );
}

/**
 * Explicitly requests microphone permission only when user clicks the voice control.
 * Immediately stops any opened media track so the hardware microphone is not held open.
 */
export async function testMicrophonePermission(): Promise<MicrophoneStatus> {
  if (!isAudioInputSupported()) {
    return "unsupported";
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Stop all audio tracks immediately to release device hardware
    stream.getTracks().forEach((track) => track.stop());
    return "available";
  } catch (err: unknown) {
    if (err instanceof DOMException) {
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        return "denied";
      }
      if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        return "unsupported";
      }
    }
    return "denied";
  }
}
