export function speak(text: string, rate = 1): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  try {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
}

export function copyText(text: string): boolean {
  if (typeof navigator === "undefined") return false;
  try {
    navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
