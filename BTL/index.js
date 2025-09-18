const url_makes = 'https://car-api2.p.rapidapi.com/api/makes';
const url_mileages = 'https://car-api2.p.rapidapi.com/api/mileages';
const url_engines = 'https://car-api2.p.rapidapi.com/api/engines';

const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '02e21a2917mshb9f7023387f37a0p16f9b8jsnf44ab3717559',
    'x-rapidapi-host': 'car-api2.p.rapidapi.com'
  }
};

// Hàm lấy dữ liệu từ 1 endpoint
const fetchData = async (url) => {
  const res = await fetch(url, options);
  return res.json();
};

const getCarsData = async () => {
  try {
    // Gọi tất cả endpoint cùng lúc
    const [makesData, mileagesData, enginesData] = await Promise.all([
      fetchData(url_makes),
      fetchData(url_mileages),
      fetchData(url_engines)
    ]);

    // Ví dụ: lấy danh sách từ key "data" (tùy API trả về)
    const makes = makesData.data || [];
    const mileages = mileagesData.data || [];
    const engines = enginesData.data || [];

    // Gộp dữ liệu
    const mergedCars = makes.map(make => {
      const mileage = mileages.find(m => m.make_id === make.id) || {};
      const engine = engines.find(e => e.make_id === make.id) || {};

      return {
        id: make.id,
        name: make.name,             // từ makes
        country: make.country || "", // từ makes
        mileage: mileage.value || "",// từ mileages
        engine: {
          type: engine.type || "",
          fuel: engine.fuel_type || "",
          horsepower: engine.hp || ""
        }
      };
    });

    console.log(mergedCars);
    return mergedCars;

  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
  }
};

getCarsData();
