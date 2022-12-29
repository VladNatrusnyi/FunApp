import moment from "moment";
export const whereCreated = (value) => {
    const timeAgo = moment(new Date(value)).fromNow();
    return timeAgo
}
