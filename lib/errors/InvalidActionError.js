/**
 * InvalidActionError class.
 *
 * @class
 *
 * @param {string} errorInstance
 * @param {string} [type]
 * @param {string} [fileName]
 * @param {number} [lineNumber]
 */
export function InvalidActionError(message, type, fileName, lineNumber) {
	Object.defineProperties(this, {
		/**
	     *
	     * @memberOf InvalidActionError
         * @instance
	     * @type {string}
	     */
		type: {
			value: type
		},
		/**
	     *
	     * @memberOf InvalidActionError
         * @instance
	     * @type {string}
	     */
		message: {
			enumerable: true,
			value: message
		},
		/**
	     *
	     * @memberOf InvalidActionError
         * @instance
	     * @type {string}
	     */
		fileName: {
			value: fileName
		},
		/**
	     *
	     * @memberOf InvalidActionError
         * @instance
	     * @type {number}
	     */
		lineNumber: {
			value: lineNumber
		},
	});
}
