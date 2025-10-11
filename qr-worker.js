/* global importScripts, self */
importScripts('https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js');

self.onmessage = (event) => {
    const { type, imageData } = event.data || {};
    if (type !== 'decode' || !imageData) {
        return;
    }

    try {
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'attemptBoth'
        });

        if (code) {
            self.postMessage({
                type: 'result',
                result: {
                    data: code.data,
                    location: code.location
                }
            });
        } else {
            self.postMessage({
                type: 'result',
                result: null
            });
        }
    } catch (error) {
        self.postMessage({
            type: 'error',
            message: error.message || 'QR decode error'
        });
    }
};
