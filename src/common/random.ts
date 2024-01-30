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
