export const useFormatDate = (date: number): string => {
	let newDate = new Date(date);
	const year = newDate.getFullYear();
	const month = newDate.getMonth() + 1;
	const day = newDate.getDate();

	const formatMonthDay = `${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

	return `${year}-${formatMonthDay}`;
};
