exports.strHTML = (info) => {
  let strTTT =
    `<body>
    <div style="width: 800px;
        background-color: black;
        color: white;
        margin: 0 auto;
        padding: 8px;">
      <h2 style="color:white;">Xin Chào ${info.user.fullname}</h2>
      <h5 style="color:white;">Phone: ${info.user.phone}</h5>
      <h5 style="color:white;">Address: ${info.address}</h5>
      <table width: 100%;
        text-align: center;>
        <tr>
          <th style="border: 2px solid white;">Tên Sản Phẩm</th>
          <th style="border: 2px solid white;">Hình Ảnh</th>
          <th style="border: 2px solid white;">Giá</th>
          <th style="border: 2px solid white;">Số Lượng</th>
          <th style="border: 2px solid white;">Thành Tiền</th>
        </tr>` +
    table(info.products) +
    `</table>
      <h2 style="color:white;">Tổng Thanh Toán</h2>
      <h2 style="color:white;">${info.total}</h2>
      <h2 style="color:white;">Cảm ơn bạn</h2>
    </div>
  </body>
`;
  return strTTT;
};
function table(list) {
  strTable = "<tr>";
  list.forEach((x) => {
    strTable += `
    <tr>
      <td style="border: 2px solid white;">${x._id}</td>
      <td style="border: 2px solid white;">
        <img
          src="${x.image}"
          alt="" style="width: 70px;
        aspect-ratio: 4/5;"
        />
      </td>
      <td style="border: 2px solid white;">${x.price}</td>
      <td style="border: 2px solid white;">${x.quantity}</td>
      <td style="border: 2px solid white;">${x.price * x.quantity}</td>
    </tr>`;
  });
  return strTable;
}
