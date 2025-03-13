$(document).ready(function () {
    function updateStretch() {
        let now = new Date();
        let currentHour = now.getHours() % 12 || 12;
        let secondsElapsed = now.getMinutes() * 60 + now.getSeconds();
        let isMobile = window.innerWidth <= 768;


        let baseStretch = 11;
        let mobileMultiplier = 2;
        let scaleFactor = 1 + (isMobile ? baseStretch * mobileMultiplier : baseStretch) * (secondsElapsed / 3600);

        let text = "12.1234567891011";
        let match = text.match(/^(\d+)\.(\d+)$/);
        let beforeDecimal = match[1];
        let afterDecimal = match[2].match(/10|11|\d/g);

        let textArray = [beforeDecimal, ".", ...afterDecimal];

        textArray = textArray.map((segment) => {
            let isStretched = parseInt(segment, 10) === currentHour;
            let spanClass = "char" + (isStretched ? " stretch" : "");
            return `<span class="${spanClass}">${segment}</span>`;
        });

        $("#animated-text").html(textArray.join(""));

        $(".stretch").each(function () {
            $(this).css({
                "transform": isMobile ? `scaleX(${scaleFactor})` : `scaleY(${scaleFactor})`,
                "display": "inline-block",
                "transition": "transform 0.06s linear"
            });
        });
    }

    function updateClock() {
        let now = new Date();
        let hours = now.getHours().toString().padStart(2, "0");
        let minutes = now.getMinutes().toString().padStart(2, "0");
        let seconds = now.getSeconds().toString().padStart(2, "0");
        $("#bottom-clock").text(`${hours}:${minutes}:${seconds}`);
    }

    function refreshTime() {
        updateStretch();
        updateClock();
    }

    updateStretch();
    updateClock();

    setInterval(refreshTime, 1000);
    $(window).on("resize", updateStretch);
});

function updateTitleWithTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.title = timeString;
}

setInterval(updateTitleWithTime, 1000);
updateTitleWithTime();
