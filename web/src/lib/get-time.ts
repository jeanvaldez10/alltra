function getTime(date: Date) {

    const now = new Date(date)
    let hours: number | string = now.getHours();
    const minutes: number | string = now.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12; // midnight is 12 AM
    }

    // Pad single-digit minutes with a leading zero
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${formattedMinutes} ${period}`;
}

export default getTime;