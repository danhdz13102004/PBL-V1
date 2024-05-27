<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
  <title>Chart Example</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
</head>
<body>

<canvas id="myChart" width="400" height="200"></canvas>

<script>
  const currentURL = 'http://localhost:8080'; // Thay thế bằng URL thực tế của bạn
  async function fetchDataOfMonth() {
      const url = currentURL + "/api/nvql/getDoanhThuThang";
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error("Lỗi khi lấy dữ liệu từ URL");
          }
          const data = await response.json();
          
          let monthArr = [];
          let revenueArr = [];
          data.forEach(item => {
              monthArr.push(item.tenThang);
              revenueArr.push(item.doanhThu);
          });

          new Chart("myChart", {
              type: "bar",
              data: {
                labels: monthArr,
                datasets: [{
                  backgroundColor: "#0396ff",
                  data: revenueArr
                }]
              },
              options: {
                plugins: {
                  legend: {
                    display: false
                  },
                  title: {
                    display: true,
                    text: "Doanh Thu Các Tháng"
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
      } catch (error) {
          console.error("Error fetching data: ", error);
      }
  }

  // Gọi hàm để tạo biểu đồ
  fetchDataOfMonth();
</script>

</body>
</html>
