import dayjs from 'dayjs';

export const calRetireInfo = (retireAge, delayUnit, maxDelayYear, birthDate) => {
    debugger
    const originBirthDate = dayjs(birthDate, 'YYYY-MM');
    // 原定退休年龄
    const originRetireDate = originBirthDate.add(retireAge, 'year');
    // 政策开始时间
    const policyStartDate = dayjs('2025-01', 'YYYY-MM');
    // 当前日期
    const currentDate = dayjs(Date.now(), 'YYYY-MM');


    // 原定退休时间超过政策开始时间，每超过 delayUnit 月，延迟退休时间（不满也）增加 1个月
    let delayMonth = 0;
    if (originRetireDate > policyStartDate) {
        const monthsDifference = originRetireDate.diff(policyStartDate, 'month') + 1;
        const hasDelayMonth = Math.ceil(monthsDifference / delayUnit);
        delayMonth = hasDelayMonth > maxDelayYear * 12 ? maxDelayYear * 12 : hasDelayMonth;
    }

    const finalRetireDate = originRetireDate.add(delayMonth, 'month');

    const finalRetireAge = retireAge + Math.floor((delayMonth / 12)) + ' 年' + ((delayMonth % 12)) + ' 月';
    const retireDate = `${finalRetireDate.year()}-${String((finalRetireDate.month() + 1)).padStart(2, '0')}`;
    const dateToRetireMonths = finalRetireDate.diff(currentDate, 'month');
    const dateToReire = `${Math.floor(dateToRetireMonths / 12)} 年 ${dateToRetireMonths % 12} 个月`;
    // 返回退休年龄（eg.63岁）、退休日期（eg. 2053-01)、距离退休还有（eg. 28年1个月）
    return {
        finalRetireAge, 
        retireDate,
        dateToReire,
        delayMonth,
        reachMaxMonth: delayMonth === maxDelayYear * 12
    }
};