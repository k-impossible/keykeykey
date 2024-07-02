export const useFormatDate = (date: string): string => {
	let newDate = new Date(Number(date));
	const year = newDate.getFullYear();
	const month = newDate.getMonth() + 1;
	const day = newDate.getDate();

	const formatMonthDay = `${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
	date = `${year}-${formatMonthDay}`;

	return date;
};
