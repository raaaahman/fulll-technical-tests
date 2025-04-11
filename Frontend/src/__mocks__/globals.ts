// @ts-nocheck
import util from "node:util"
import stream from "node:stream/web"
import { BroadcastChannel } from "node:worker_threads"

globalThis.TextEncoder = util.TextEncoder
globalThis.TransformStream = stream.TransformStream
globalThis.BroadcastChannel = BroadcastChannel