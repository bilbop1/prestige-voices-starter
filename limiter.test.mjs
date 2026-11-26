import {test} from "node:test";
import assert from "node:assert/strict";
import {createLimiter} from "./app/api/speak/limiter.mjs";
test("limits generation within a rolling window and recovers",()=>{let time=0;const check=createLimiter(3,60000,()=>time);assert.equal(check(),true);assert.equal(check(),true);assert.equal(check(),true);assert.equal(check(),false);time=60000;assert.equal(check(),true)});

