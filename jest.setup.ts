/* eslint-disable @typescript-eslint/no-require-imports */
import "@testing-library/jest-dom";

// Polyfills for Web APIs missing in jsdom (Node.js 21+)
if (typeof globalThis.TransformStream === "undefined") {
  const { TransformStream } = require("stream/web");
  globalThis.TransformStream = TransformStream;
}

if (typeof globalThis.ReadableStream === "undefined") {
  const { ReadableStream } = require("stream/web");
  globalThis.ReadableStream = ReadableStream;
}

if (typeof globalThis.WritableStream === "undefined") {
  const { WritableStream } = require("stream/web");
  globalThis.WritableStream = WritableStream;
}
