export function formatDate(dateStr) {
    if (!dateStr) return '—';
    let date;

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        date = new Date(dateStr);
    } else if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        const [day, month, year] = dateStr.split('/');
        date = new Date(`${year}-${month}-${day}`);
    } else {
        date = new Date(dateStr);
    }

    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
