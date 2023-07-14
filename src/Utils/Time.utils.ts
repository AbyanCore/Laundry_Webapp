export function getswitchdaytime() {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate;
}
