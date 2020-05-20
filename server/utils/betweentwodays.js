import moment from 'moment';

// Get between two days
const betweenTwoDays = (start_date, end_date, date_format = "MM-DD-YYYY") => {
    const getDateAsArray = (date) => {
        return moment(date.split(/\D+/), date_format);
    };

    const diff =
        getDateAsArray(end_date).diff(getDateAsArray(start_date), "days") + 1;
    
    const dates = [];
    
    for (let i = 0; i < diff; i++) {
        const nextDate = getDateAsArray(start_date).add(i, "day");
        dates.push(nextDate.format("DD-MMM-YYYY"));
    }
    
    return dates;
};

export default betweenTwoDays;
