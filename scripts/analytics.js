if (
  window.location.hostname !== "localhost" &&
  window.location.hostname !== "127.0.0.1"
) {
  const script = document.createElement("script");
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.setAttribute(
    "data-cf-beacon",
    '{"token": "2c088b487bb44e349fb8f301b042876f"}',
  );
  script.defer = true;
  document.body.appendChild(script);
}
