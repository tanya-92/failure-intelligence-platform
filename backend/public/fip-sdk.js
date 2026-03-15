(function (window) {

    const FIP = {};

    let config = {
        apiKey: null,
        endpoint: "http://localhost:4000/api/failures",
        service: "frontend"
    };

    // Initialize SDK
    FIP.init = function (options) {

        config = { ...config, ...options };

        if (!config.apiKey) {
            console.error("FIP: apiKey is required");
            return;
        }

        setupGlobalErrorHandler();
        setupPromiseHandler();
    };

    // Send failure to backend
    function sendFailure(payload) {

        try {
            fetch(config.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": config.apiKey
                },
                body: JSON.stringify(payload)
            }).catch(() => { });

        } catch (err) { }
    }

    // window.onerror
    function setupGlobalErrorHandler() {

        window.onerror = function (message, source, lineno, colno, error) {

            const payload = {
                service: config.service,
                severity: "high",
                message: message || "Unknown error",
                metadata: {
                    source: source,
                    line: lineno,
                    column: colno,
                    stack: error ? error.stack : null,
                    url: window.location.href,
                    userAgent: navigator.userAgent
                }
            };
            sendFailure(payload);
        };
    }

    // unhandled promise rejection
    function setupPromiseHandler() {
        window.addEventListener("unhandledrejection", function (event) {
            const payload = {
                service: config.service,
                severity: "high",
                message: event.reason?.message || "Unhandled Promise Rejection",
                metadata: {
                    stack: event.reason?.stack,
                    url: window.location.href,
                    userAgent: navigator.userAgent
                }
            };
            sendFailure(payload);
        });
    }

    // manual capture
    FIP.captureException = function (error) {
        const payload = {
            service: config.service,
            severity: "high",
            message: error.message,
            metadata: {
                stack: error.stack,
                url: window.location.href
            }
        };
        sendFailure(payload);
    };

    window.FIP = FIP;
})(window);