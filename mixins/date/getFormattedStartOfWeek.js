const getFormattedStartOfWeek = (moment) => moment.startOf('week').format('YYYY-MM-DD')

module.exports.getFormattedStartOfWeek = getFormattedStartOfWeek
