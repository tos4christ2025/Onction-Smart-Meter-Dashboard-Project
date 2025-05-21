// const chartUtils = () => ({
 const chartUtils =   {
        formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric'
        });
    },

    generateTimeLabels: (count) => {
        const labels = [];
        const now = new Date();
        for (let i = count - 1; i >= 0; i--) {
            const date = new Date(now - i * 3600000);
            labels.push(chartUtils.formatDate(date));
        }
        return labels;
    },
    formatNumber: (number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    },

    getGradientColor: (canvas, startColor, endColor) => {
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, startColor);
        gradient.addColorStop(1, endColor);
        return gradient;
    }
};

export default chartUtils;
