function getAdjustedTime() {
    // รับเวลาปัจจุบัน
    const currentTime = new Date();

    // ถอยหลังไป 5 นาที
    const adjustedTime = new Date(currentTime.getTime() - 5 * 60 * 1000);

    // แปลงเวลาเป็น string ในรูปแบบ 'YYYY-MM-DD HH:mm:ss'
    const currentTimeString = formatTime(currentTime);
    const adjustedTimeString = formatTime(adjustedTime);

    return { currentTime: currentTimeString, adjustedTime: adjustedTimeString };
}

function formatTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



module.exports = { getAdjustedTime }