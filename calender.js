const weeks = ["日", "月", "火", "水", "木", "金", "土"];
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1;

function createCalendar(year, month) {
  let startDate = new Date(year, month - 1, 1);
  let endDate = new Date(year, month, 0);
  let endDayCount = endDate.getDate();
  let lastMonthEndDate = new Date(year, month - 1, 0);
  let lastMonthendDayCount = lastMonthEndDate.getDate();
  let startDay = startDate.getDay();
  let dayCount = 1;
  let calendarHtml = "<h1>" + year + "/" + month + "</h1><table>";

  for (let i = 0; i < weeks.length; i++) {
    calendarHtml += "<td>" + weeks[i] + "</td>";
  }

  for (let w = 0; w < 6; w++) {
    calendarHtml += "<tr>";
    for (let d = 0; d < 7; d++) {
      let fullDate = `${year}-${month}-${dayCount}`;
      if (w == 0 && d < startDay) {
        let num = lastMonthendDayCount - startDay + d + 1;
        calendarHtml += '<td class="is-disabled">' + num + "</td>";
      } else if (dayCount > endDayCount) {
        let num = dayCount - endDayCount;
        calendarHtml += '<td class="is-disabled">' + num + "</td>";
        dayCount++;
      } else {
        // その日のメモをローカルストレージから取得
        let memo = localStorage.getItem(fullDate) || "";
        calendarHtml += `<td class="date" data-date=${fullDate}>${dayCount}`;
        dayCount++;
      }
    }
    calendarHtml += "</tr>";
  }
  calendarHtml += "</table>";
  document.querySelector("#calendar").innerHTML = calendarHtml;

  var dateElements = document.querySelectorAll("#calendar .date");
  dateElements.forEach(function (element) {
    element.addEventListener("click", function () {
      onDateClick(this.innerHTML);
    });
  });
}

function moveMonth(num) {
  currentMonth += num;
  if (currentMonth < 1) {
    currentYear--;
    currentMonth = 12;
  } else if (currentMonth > 12) {
    currentYear++;
    currentMonth = 1;
  }
  createCalendar(currentYear, currentMonth);
}

document.addEventListener("DOMContentLoaded", function () {
  createCalendar(currentYear, currentMonth);
  document.getElementById("prev").addEventListener("click", function () {
    moveMonth(-1);
  });
  document.getElementById("next").addEventListener("click", function () {
    moveMonth(1);
  });
});

function onDateClick(date) {
  var inputForm = document.getElementById("inputForm");
  var selectedMonth = document.getElementById("selectedMonth");
  var selectedDateSpan = document.getElementById("selectedDate");
  var eventDetails = document.getElementById("eventDetails");

  selectedDateSpan.textContent = date;
  inputForm.style.display = "block";

  var memo = localStorage.getItem(date) || "";
  eventDetails.value = memo;
}

document.getElementById("saveEvent").addEventListener("click", function () {
  var selectedMonth = document.getElementById("selectedMonth").textContent;
  var selectedDate = document.getElementById("selectedDate").textContent;
  var eventDetails = document.getElementById("eventDetails").value;
  localStorage.setItem(selectedMonth, selectedDate, eventDetails);
  alert("メモを保存しました");
});
