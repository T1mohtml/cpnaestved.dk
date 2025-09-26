(async () => {
    const webhookUrl = "https://thingy.timofijferendovic.workers.dev/";

    // Get visitor IP via public API
    let ip = 'Unknown';
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        ip = data.ip;
    } catch (err) {
        console.log("IP fetch failed", err);
    }

    // Detect browser info
    function getBrowserInfo() {
        const ua = navigator.userAgent;
        let name = "Unknown", version = "Unknown";
        if (/firefox/i.test(ua)) { name = "Firefox"; version = ua.match(/Firefox\/([\d.]+)/)[1]; }
        else if (/chrome/i.test(ua) && !/edg/i.test(ua)) { name = "Chrome"; version = ua.match(/Chrome\/([\d.]+)/)[1]; }
        else if (/safari/i.test(ua) && !/chrome/i.test(ua)) { name = "Safari"; version = ua.match(/Version\/([\d.]+)/)?.[1] || "Unknown"; }
        else if (/edg/i.test(ua)) { name = "Edge"; version = ua.match(/Edg\/([\d.]+)/)[1]; }
        return { name, version, ua };
    }

    // Detect device type
    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/mobile/i.test(ua)) return "Mobile";
        if (/tablet|ipad/i.test(ua)) return "Tablet";
        return "Desktop";
    }

    const visitorInfo = {
        ip: ip,
        browserName: getBrowserInfo().name,
        browserVersion: getBrowserInfo().version,
        userAgent: getBrowserInfo().ua,
        deviceType: getDeviceType(),
        os: navigator.platform,
        language: navigator.language,
        referrer: document.referrer || 'None',
        url: window.location.href,
        path: window.location.pathname,
        query: window.location.search,
        hash: window.location.hash,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: window.screen.colorDepth,
        cookiesEnabled: navigator.cookieEnabled,
        connection: navigator.connection ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt
        } : {},
        timestamp: new Date().toISOString()
    };

    // Send data to Worker (POST)
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: "LoggerBot",
            embeds: [{
                title: "New Visitor Info 🚀",
                color: 0x1abc9c,
                fields: Object.keys(visitorInfo).map(key => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    value: typeof visitorInfo[key] === "object" ? JSON.stringify(visitorInfo[key]) : String(visitorInfo[key]),
                    inline: true
                }))
            }]
        })
    }).catch(err => console.log("Webhook failed:", err));
})();
