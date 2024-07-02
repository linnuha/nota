function addItem() {
  var item = document.getElementById("item").value;
  var quantity = document.getElementById("quantity").value;
  var price = document.getElementById("price").value;
  var total = quantity * price;

  var table = document.getElementById("nota-body");
  var row = table.insertRow();
  row.insertCell(0).innerHTML = item;
  row.insertCell(1).innerHTML = quantity;
  row.insertCell(2).innerHTML = price;
  row.insertCell(3).innerHTML = total;

  // Clear input fields
  document.getElementById("item").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

function exportToPDF() {
  var { jsPDF } = window.jspdf;
  var doc = new jsPDF();

  // Add logo
  var img = document.getElementById('logo');
  if (img) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);
    var imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 10, 50, 50);
  }

  // Add title
  doc.setFontSize(20);
  doc.text("Nota Online", 105, 70, null, null, 'center');

  // Add payment date
  var paymentDate = document.getElementById('payment-date').innerText;
  doc.setFontSize(12);
  doc.text(paymentDate, 10, 90);

  // Add giver and receiver names
  var giver = document.getElementById('giver').value;
  var receiver = document.getElementById('receiver').value;
  doc.text("Nama Pemberi: " + giver, 10, 100);
  doc.text("Nama Penerima: " + receiver, 10, 110);

  // Add table headers
  doc.text("Item", 10, 130);
  doc.text("Kuantitas", 70, 130);
  doc.text("Harga", 130, 130);
  doc.text("Total", 190, 130);

  // Add table data
  var table = document.getElementById('nota-body');
  var rows = table.getElementsByTagName('tr');
  var startY = 140;
  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].getElementsByTagName('td');
    for (var j = 0; j < cols.length; j++) {
      var x = 10 + j * 60;
      var y = startY + i * 10;
      doc.text(cols[j].innerText, x, y);
    }
  }

  // Save the PDF
  doc.save('nota.pdf');
}

function setPaymentDate() {
  var today = new Date();
  var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  document.getElementById('payment-date').innerText = "Tanggal Pembayaran: " + date;
}

// Set the payment date on page load
window.onload = setPaymentDate;
