import { ipcRenderer } from "electron";

export default function ipcRendererInvoke(eventName, ...args) {
  return ipcRenderer.invoke(eventName, ...args);
}
