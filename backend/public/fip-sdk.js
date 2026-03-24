(function (window) {

    const FIP = {};    //creates a public SDK object which will become window.FIP and websites can call FIP.init(...) or FIP.captureException(...)

    let config = {    //stores SDK settings
        apiKey: null, //identify the website
        endpoint: "http://localhost:4000/api/failures",  //where errors are sent
        service: "frontend"   //Which part of system failed
    };
    let initialized = false;
    // duplicate protection variables
    let lastErrorMessage = null;
    let lastErrorStack = null;
    let lastErrorTime = 0;
    const ERROR_COOLDOWN = 5000;

    // Initialize SDK
    FIP.init = function (options) {  //first function user websites must call
        if (initialized) return;
        initialized = true;

        config = { ...config, ...options };

        if (!config.apiKey) {
            console.error("FIP: apiKey is required");
            return;
        }

        //these start error monitoring system
        setupGlobalErrorHandler();
        setupPromiseHandler();
    };

    // Send failure to backend
    function sendFailure(payload) {

        const now = Date.now();
        // prevent duplicate flooding
        if (
            payload.message === lastErrorMessage &&
            payload.metadata?.stack === lastErrorStack &&
            now - lastErrorTime < ERROR_COOLDOWN
        ) {
            return; // skip duplicate
        }

        lastErrorMessage = payload.message;
        lastErrorStack = payload.metadata?.stack;
        lastErrorTime = now;
        try {
            fetch(config.endpoint, {   //config se endpoint liya to send errors
                method: "POST",        // post obv coz we are sending data
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": config.apiKey   //is api key given valid(present in db)
                },
                body: JSON.stringify(payload)    //transforms the structured payload data into a linear string format; payload: js object or array that holds the actual data you want to send to a server.
            }).catch(() => { });            //DO NOTHING; You don't want SDK errors breaking the website.

        } catch (err) { }
    }

    // window.onerror (listens for any javascript crash)
    function setupGlobalErrorHandler() {

        window.addEventListener("error", function (event) {

            const payload = {
                service: config.service,
                severity: "high",
                message: event.message || "Unknown error",
                metadata: {
                    source: event.filename,
                    line: event.lineno,
                    column: event.colno,
                    stack: event.error ? event.error.stack : null,
                    url: window.location.href,
                    userAgent: navigator.userAgent
                }
            };
            sendFailure(payload);   //send error
        });
    }

    // unhandled promise rejection
    function setupPromiseHandler() {    //catches promise errors
        window.addEventListener("unhandledrejection", function (event) {    //sends an event object
            const payload = {
                service: config.service,
                severity: "high",
                message: event.reason?.message || "Unhandled Promise Rejection",
                metadata: {
                    stack: event.reason?.stack,   //This helps debugging.
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