export const formatDateTime = (dateTime) => {
    if (!dateTime) return 'N/A';

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateTime));
};
