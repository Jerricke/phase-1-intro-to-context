// Your code here

function createEmployeeRecord(data) {
    const employee = {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
    return employee;
}

function createEmployeeRecords(data) {
    const records = [];
    data.forEach( employee => records.push(createEmployeeRecord(employee)))
    return records
}

function createTimeInEvent(record, date) {
    const timeInData = {};
    const dateInfo = date.split(" ");
    timeInData.type = "TimeIn";
    timeInData.hour = parseInt(dateInfo[1]);
    timeInData.date = dateInfo[0];
    record.timeInEvents.push(timeInData);

    return record
}

function createTimeOutEvent(record, date) {
    const timeOutData = {};
    const dateInfo = date.split(" ");
    timeOutData.type = "TimeOut";
    timeOutData.hour = parseInt(dateInfo[1]);
    timeOutData.date = dateInfo[0];
    record.timeOutEvents.push(timeOutData);

    return record
}

function hoursWorkedOnDate(record, date) {
    const dayIn = record.timeInEvents.find( dateInfo => dateInfo.date === date);
    const dayOut = record.timeOutEvents.find( dateInfo => dateInfo.date === date);
    const hoursWorked = (dayOut.hour - dayIn.hour)/100;
    return hoursWorked
}

function wagesEarnedOnDate(record, date) {
    const wage = hoursWorkedOnDate(record, date) * record.payPerHour;
    return wage;
}

function allWagesFor(record) {
    let wage = 0;
    record.timeInEvents.forEach( day => {
        wage += wagesEarnedOnDate(record, day.date);
    })
    return wage
}

function calculatePayroll(employees) {
    let payroll = 0;
    employees.forEach( employee => {
        payroll += allWagesFor(employee);
    })
    return payroll
}