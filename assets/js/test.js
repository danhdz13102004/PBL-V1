const initializeAddressSelectors = (
  provinceSelectorId,
  districtSelectorId,
  wardSelectorId,
  addressElementId
) => {
  const provinceSelectElement = document.getElementById(provinceSelectorId);
  const districtSelectElement = document.getElementById(districtSelectorId);
  const wardSelectElement = document.getElementById(wardSelectorId);
  const addressElement = document.getElementById(addressElementId);

  // Disable all selectors initially
  districtSelectElement.disabled = true;
  districtSelectElement.style.cursor = `not-allowed`;
  wardSelectElement.disabled = true;
  wardSelectElement.style.cursor = `not-allowed`;
  addressElement.disabled = true;
  addressElement.style.cursor = `not-allowed`;

  const cUrl = {
    provinceUrl: "https://web-staging.ghtklab.com/api/v1/public/address/list",
    districtUrl:
      "https://web-staging.ghtklab.com/api/v1/public/address/list?parentId={province-id}&type=3",
    wardUrl:
      "https://web-staging.ghtklab.com/api/v1/public/address/list?parentId={district-id}&type=1",
    alleyRoadUrl:
      "https://web-staging.ghtklab.com/api/v1/public/address/hamlet?parentId={ward-id}",
  };

  const loadProvinces = () => {
    fetch(cUrl.provinceUrl)
      .then((response) => response.json())
      .then((data) => {
        provinceSelectElement.innerHTML = `<option value="">Chọn tỉnh/ thành phố</option>`;
        data.data.forEach((province) => {
          const option = document.createElement(`option`);
          option.setAttribute(`value`, province.id);
          option.textContent = province.name;
          provinceSelectElement.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Lỗi khi fetch API:", error);
      });
  };

  const loadDistricts = () => {
    const provinceId = provinceSelectElement.value;
    if (provinceId !== "") {
      fetch(cUrl.districtUrl.replace(`{province-id}`, provinceId))
        .then((response) => response.json())
        .then((data) => {
          districtSelectElement.innerHTML = `<option value="">Chọn quận/ huyện</option>`;
          data.data.forEach((district) => {
            const option = document.createElement(`option`);
            option.setAttribute(`value`, district.id);
            option.textContent = district.name;
            districtSelectElement.appendChild(option);
          });
          districtSelectElement.disabled = false;
          districtSelectElement.style.cursor = `pointer`;
        })
        .catch((error) => {
          console.error("Lỗi khi fetch API:", error);
        });
    } else {
      districtSelectElement.innerHTML = `<option value="">Chọn quận/ huyện</option>`;
      districtSelectElement.disabled = true;
      districtSelectElement.style.cursor = `not-allowed`;
      wardSelectElement.innerHTML = `<option value="">Chọn xã/ phường</option>`;
      wardSelectElement.disabled = true;
      wardSelectElement.style.cursor = `not-allowed`;
      addressElement.disabled = true;
      addressElement.style.cursor = `not-allowed`;
      addressElement.value = ``;
    }
  };

  const loadWards = () => {
    const districtId = districtSelectElement.value;
    if (districtId !== "") {
      fetch(cUrl.wardUrl.replace(`{district-id}`, districtId))
        .then((Response) => Response.json())
        .then((data) => {
          wardSelectElement.innerHTML = `<option value="">Chọn xã/ phường</option>`;
          data.data.forEach((ward) => {
            const option = document.createElement(`option`);
            option.setAttribute(`value`, ward.id);
            option.textContent = ward.name;
            wardSelectElement.appendChild(option);
          });
          wardSelectElement.disabled = false;
          wardSelectElement.style.cursor = `pointer`;
        })
        .catch((error) => {
          console.error("Lỗi khi fetch API:", error);
        });
    } else {
      wardSelectElement.innerHTML = `<option value="">Chọn xã/ phường</option>`;
      wardSelectElement.disabled = true;
      wardSelectElement.style.cursor = `not-allowed`;
      addressElement.disabled = true;
      addressElement.style.cursor = `not-allowed`;
      addressElement.value = ``;
    }
  };

  const addressEnable = () => {
    const wardId = wardSelectElement.value;
    if (wardId !== "") {
      addressElement.disabled = false;
      addressElement.style.cursor = `text`;
    } else {
      addressElement.disabled = true;
      addressElement.value = ``;
      addressElement.style.cursor = `not-allowed`;
    }
  };

  const safeLoadDistricts = () => {
    provinceSelectElement.removeEventListener(`change`, loadDistricts);
    provinceSelectElement.addEventListener(`change`, loadDistricts);
  };

  const safeLoadWards = () => {
    districtSelectElement.removeEventListener("change", loadWards);
    districtSelectElement.addEventListener("change", loadWards);
  };

  const safeEnableAddress = () => {
    wardSelectElement.removeEventListener("change", addressEnable);
    wardSelectElement.addEventListener("change", addressEnable);
  };

  const initAddressSelectors = () => {
    loadProvinces();
    safeLoadDistricts();
    safeLoadWards();
    safeEnableAddress();
  };

  initAddressSelectors();
};

// Sử dụng hàm để khởi tạo các selector
initializeAddressSelectors(
  "checkout-info__province",
  "checkout-info__district",
  "checkout-info__ward",
  "checkout-info__address"
);
