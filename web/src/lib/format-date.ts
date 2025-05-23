export function formatDate(date: Date): string {
    const now = new Date();
    const inputDate = new Date(date);

    // Format time as HH:mm
    const timeString = inputDate.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

    // Check if it's today
    if (inputDate.toDateString() === now.toDateString()) {
        return `Today ${timeString}`;
    }

    // Check if it's yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (inputDate.toDateString() === yesterday.toDateString()) {
        return `Yesterday ${timeString}`;
    }

    // Format as DD MMM YYYY, HH:mm for older dates
    return inputDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }) + `, ${timeString}`;
}
export default formatDate;