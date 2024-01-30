/**
 * Generate custom
 * transaction Id
 * @returns 
 */
export function generateTransactionId () {
    let randomNumber = '';
    let count = 0;
    while (count < 14) {
        const randomDigit = Math.floor(Math.random() * 9) + 1;
        randomNumber += randomDigit;
        count = randomNumber.length;
    }
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const uniqueCode = `XBP-${year}${month}${day}${hours}${minutes}${seconds}${randomNumber}`;
    return uniqueCode;
}

/**
 * Encode string
 * @param data 
 * @returns 
 */

export function encodeString ( data: any ) {
    const bufferObj = Buffer.from(JSON.stringify(data), "utf8");
    const base64String = bufferObj.toString("base64");
    return base64String;
}

/**
 * Decode base64string
 * @param base64String 
 * @returns 
 */

export function decodedString ( base64String: any ) {
    const bufferObj = Buffer.from(base64String, "base64");
    const decodedString = JSON.parse(bufferObj.toString("utf8"));
    return decodedString;
}

/**
 * Status Enum
 * @returns 
 */

export function statusEnum () {
    const data = {
        FAILED: "FAILED",
        SUCCESSFUL: "SUCCESSFUL",
        CANCELLED: "CANCELLED",
        PENDING: "PENDING",
        DECLINED: "DECLINED"
    }
    return data;
}

/**
 * The beginning of last
 * month date
 * @returns 
 */

export function theBeginningOfLastMonthDate() {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() - 1;
    let day = 1;

    // Adjust month and year if current month is January
    if (month < 0) {
        year -= 1;
        month = 11; // December
    }

    const firstDayOfPreviousMonth = new Date(year, month, day);
    const formattedYear = firstDayOfPreviousMonth.getFullYear();
    const formattedMonth = String(firstDayOfPreviousMonth.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(firstDayOfPreviousMonth.getDate()).padStart(2, '0');

    const firstDayOfPreviousMonthString = `${formattedYear}-${formattedMonth}-${formattedDay}`;
    return firstDayOfPreviousMonthString;
}

/**
 * Split date without ISO
 * @param dateString 
 * @returns 
 */

export function splitDateWithoutISO( dateString: any ) {
    const splitted = dateString.split("-");
    return splitted;
}

/**
 * First date in
 * current month
 * @returns 
 */

export function firstDateInCurrentMonth() {
    const currentDate = new Date();
    const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return firstDate;
}

/**
 * Last date in
 * current month
 * @returns 
 */

export function lastDateInCurrentMonth() {
    const currentDate = new Date();
    const lastDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    return lastDate;
}


