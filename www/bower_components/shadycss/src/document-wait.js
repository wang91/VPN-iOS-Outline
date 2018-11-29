/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

'use strict';

/** @type {Promise<void>} */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = documentWait;
var readyPromise = null;

/** @type {?function(?function())} */
var whenReady = window['HTMLImports'] && window['HTMLImports']['whenReady'] || null;

/** @type {function()} */
var resolveFn = void 0;

/**
 * @param {?function()} callback
 */
function documentWait(callback) {
  requestAnimationFrame(function () {
    if (whenReady) {
      whenReady(callback);
    } else {
      if (!readyPromise) {
        readyPromise = new Promise(function (resolve) {
          resolveFn = resolve;
        });
        if (document.readyState === 'complete') {
          resolveFn();
        } else {
          document.addEventListener('readystatechange', function () {
            if (document.readyState === 'complete') {
              resolveFn();
            }
          });
        }
      }
      readyPromise.then(function () {
        callback && callback();
      });
    }
  });
}