document.addEventListener('DOMContentLoaded', () => {
    displayRecords(); // عرض السجلات عند تحميل الصفحة
    // تعيين التاريخ الافتراضي لليوم الحالي
    document.getElementById('entryDate').valueAsDate = new Date();
});

function showStatusMessage(message, type) {
    const statusMessageDiv = document.getElementById('statusMessage');
    statusMessageDiv.textContent = message;
    statusMessageDiv.className = `status-message ${type}`;
    statusMessageDiv.style.display = 'block';
    setTimeout(() => {
        statusMessageDiv.style.display = 'none';
    }, 5000); // إخفاء الرسالة بعد 5 ثواني
}

function saveEntry() {
    const entryDate = document.getElementById('entryDate').value;

    if (!entryDate) {
        showStatusMessage('فدوة لكلبك، اختار التاريخ أول شي!', 'error');
        return;
    }

    const newEntry = {
        date: entryDate,
        sugarFasting: document.getElementById('sugarFasting').value,
        timeFasting: document.getElementById('timeFasting').value,
        sugarPreBreakfast: document.getElementById('sugarPreBreakfast').value,
        timePreBreakfast: document.getElementById('timePreBreakfast').value,
        insulinRapidBreakfast: document.getElementById('insulinRapidBreakfast').value,
        carbBreakfast: document.getElementById('carbBreakfast').value,
        sugarPostBreakfast: document.getElementById('sugarPostBreakfast').value,
        timePostBreakfast: document.getElementById('timePostBreakfast').value,
        // حقول جديدة بعد الريوك
        insulinPostBreakfast: document.getElementById('insulinPostBreakfast').value,
        carbPostBreakfast: document.getElementById('carbPostBreakfast').value,

        sugarPreLunch: document.getElementById('sugarPreLunch').value,
        timePreLunch: document.getElementById('timePreLunch').value,
        insulinRapidLunch: document.getElementById('insulinRapidLunch').value,
        carbLunch: document.getElementById('carbLunch').value,
        sugarPostLunch: document.getElementById('sugarPostLunch').value,
        timePostLunch: document.getElementById('timePostLunch').value,
        // حقول جديدة بعد الغدا
        insulinPostLunch: document.getElementById('insulinPostLunch').value,
        carbPostLunch: document.getElementById('carbPostLunch').value,

        sugarPreDinner: document.getElementById('sugarPreDinner').value,
        timePreDinner: document.getElementById('timePreDinner').value,
        insulinRapidDinner: document.getElementById('insulinRapidDinner').value,
        carbDinner: document.getElementById('carbDinner').value,
        sugarPostDinner: document.getElementById('sugarPostDinner').value,
        timePostDinner: document.getElementById('timePostDinner').value,
        // حقول جديدة بعد العشا
        insulinPostDinner: document.getElementById('insulinPostDinner').value,
        carbPostDinner: document.getElementById('carbPostDinner').value,

        sugarBedtime: document.getElementById('sugarBedtime').value,
        timeBedtime: document.getElementById('timeBedtime').value,
        sugarMidnight: document.getElementById('sugarMidnight').value,
        timeMidnight: document.getElementById('timeMidnight').value,

        insulinSlow: document.getElementById('insulinSlow').value,
        timeInsulinSlow: document.getElementById('timeInsulinSlow').value,
        insulinRapidCorrection: document.getElementById('insulinRapidCorrection').value,
        timeInsulinRapidCorrection: document.getElementById('timeInsulinRapidCorrection').value,
        correctionReason: document.getElementById('correctionReason').value,
        notes: document.getElementById('notes').value
    };

    let records = JSON.parse(localStorage.getItem('diabetesRecords')) || [];
    records.push(newEntry);
    localStorage.setItem('diabetesRecords', JSON.stringify(records));

    clearForm();
    displayRecords();
    showStatusMessage('عاشت إيدك! القياسات انحفظت بنجاح.', 'success');
}

function clearForm() {
    document.getElementById('entryDate').valueAsDate = new Date(); // يرجع التاريخ لليوم
    const inputs = document.querySelectorAll('.input-section input[type="number"], .input-section input[type="time"], .input-section input[type="text"], .input-section textarea');
    inputs.forEach(input => input.value = '');
}

function displayRecords() {
    const mealHistoryContainer = document.getElementById('mealHistoryContainer');
    let records = JSON.parse(localStorage.getItem('diabetesRecords')) || [];

    if (records.length === 0) {
        mealHistoryContainer.innerHTML = '<p class="no-records-message">هنا راح تطلع سجلات قياسات أبطالنا، سجل أول قياس حتى نشوفها سوا!</p>';
        return;
    }

    // فرز السجلات من الأحدث للأقدم
    records.sort((a, b) => new Date(b.date) - new Date(a.date));

    let tableHTML = '<table class="record-table"><thead><tr>';
    // رؤوس الأعمدة المحدثة
    tableHTML += '<th>التاريخ</th>';
    tableHTML += '<th>سكر الصيام</th><th>وقته</th>';
    tableHTML += '<th>سكر قبل الريوك</th><th>وقته</th>';
    tableHTML += '<th>أنسولين سريع (ريوك)</th><th>كارب (ريوك)</th>';
    tableHTML += '<th>سكر ورا الريوك بساعتين</th><th>وقته</th>';
    tableHTML += '<th>أنسولين (بعد الريوك)</th><th>كارب (بعد الريوك)</th>'; // رأس جديد
    tableHTML += '<th>سكر قبل الغدا</th><th>وقته</th>';
    tableHTML += '<th>أنسولين سريع (غدا)</th><th>كارب (غدا)</th>';
    tableHTML += '<th>سكر ورا الغدا بساعتين</th><th>وقته</th>';
    tableHTML += '<th>أنسولين (بعد الغدا)</th><th>كارب (بعد الغدا)</th>'; // رأس جديد
    tableHTML += '<th>سكر قبل العشا</th><th>وقته</th>';
    tableHTML += '<th>أنسولين سريع (عشا)</th><th>كارب (عشا)</th>';
    tableHTML += '<th>سكر ورا العشا بساعتين</th><th>وقته</th>';
    tableHTML += '<th>أنسولين (بعد العشا)</th><th>كارب (بعد العشا)</th>'; // رأس جديد
    tableHTML += '<th>سكر قبل النوم</th><th>وقته</th>';
    tableHTML += '<th>سكر نص الليل</th><th>وقته</th>';
    tableHTML += '<th>أنسولين بطيء</th><th>وقته</th>';
    tableHTML += '<th>أنسولين تصحيح</th><th>وقت التصحيح</th><th>سبب التصحيح</th>';
    tableHTML += '<th>ملاحظات</th><th>حذف</th>';
    tableHTML += '</tr></thead><tbody>';

    records.forEach((record, index) => {
        tableHTML += `<tr>`;
        tableHTML += `<td>${record.date || ''}</td>`;
        tableHTML += `<td>${record.sugarFasting || ''}</td><td>${record.timeFasting || ''}</td>`;
        tableHTML += `<td>${record.sugarPreBreakfast || ''}</td><td>${record.timePreBreakfast || ''}</td>`;
        tableHTML += `<td>${record.insulinRapidBreakfast || ''}</td><td>${record.carbBreakfast || ''}</td>`;
        tableHTML += `<td>${record.sugarPostBreakfast || ''}</td><td>${record.timePostBreakfast || ''}</td>`;
        tableHTML += `<td>${record.insulinPostBreakfast || ''}</td><td>${record.carbPostBreakfast || ''}</td>`; // بيانات جديدة
        tableHTML += `<td>${record.sugarPreLunch || ''}</td><td>${record.timePreLunch || ''}</td>`;
        tableHTML += `<td>${record.insulinRapidLunch || ''}</td><td>${record.carbLunch || ''}</td>`;
        tableHTML += `<td>${record.sugarPostLunch || ''}</td><td>${record.timePostLunch || ''}</td>`;
        tableHTML += `<td>${record.insulinPostLunch || ''}</td><td>${record.carbPostLunch || ''}</td>`; // بيانات جديدة
        tableHTML += `<td>${record.sugarPreDinner || ''}</td><td>${record.timePreDinner || ''}</td>`;
        tableHTML += `<td>${record.insulinRapidDinner || ''}</td><td>${record.carbDinner || ''}</td>`;
        tableHTML += `<td>${record.sugarPostDinner || ''}</td><td>${record.timePostDinner || ''}</td>`;
        tableHTML += `<td>${record.insulinPostDinner || ''}</td><td>${record.carbPostDinner || ''}</td>`; // بيانات جديدة
        tableHTML += `<td>${record.sugarBedtime || ''}</td><td>${record.timeBedtime || ''}</td>`;
        tableHTML += `<td>${record.sugarMidnight || ''}</td><td>${record.timeMidnight || ''}</td>`;
        tableHTML += `<td>${record.insulinSlow || ''}</td><td>${record.timeInsulinSlow || ''}</td>`;
        tableHTML += `<td>${record.insulinRapidCorrection || ''}</td><td>${record.timeInsulinRapidCorrection || ''}</td><td>${record.correctionReason || ''}</td>`;
        tableHTML += `<td>${record.notes || ''}</td>`;
        tableHTML += `<td><button class="delete-record-button" onclick="deleteRecord(${index})">حذف</button></td>`;
        tableHTML += `</tr>`;
    });

    tableHTML += '</tbody></table>';
    mealHistoryContainer.innerHTML = tableHTML;
}

function deleteRecord(index) {
    if (confirm('متأكد تريد تمسح هذا السجل؟ تره ما يرجع بعد!')) {
        let records = JSON.parse(localStorage.getItem('diabetesRecords')) || [];
        
        const recordToDelete = records[index]; 
        const originalIndex = records.findIndex(r => 
            r.date === recordToDelete.date && 
            r.timeFasting === recordToDelete.timeFasting && 
            r.sugarFasting === recordToDelete.sugarFasting
            // يمكن إضافة المزيد من الشروط للتأكد من التطابق الفريد
        );

        if (originalIndex > -1) {
            records.splice(originalIndex, 1);
            localStorage.setItem('diabetesRecords', JSON.stringify(records));
            displayRecords();
            showStatusMessage('تم مسح السجل بنجاح، لا تهتم!', 'success');
        } else {
            showStatusMessage('يا ستار، ما كدرت ألكي السجل حتى أمسحه!', 'error');
        }
    }
}


function clearAllData() {
    if (confirm('يا أخي، متأكد تريد تمسح كل البيانات؟ ترى ما ترجع بعد!')) {
        localStorage.removeItem('diabetesRecords');
        displayRecords();
        showStatusMessage('كل البيانات انمسحت، الصفحة صارت نظيفة!', 'success');
    }
}

function exportToExcel() {
    let