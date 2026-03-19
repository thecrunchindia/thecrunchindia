export const fetchLocationDetails = async (lat, lon) => {
  if (!lat || !lon) return null;

  try {
    const TOKEN = import.meta.env.VITE_LOCATION_IQ_TOKEN;
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${TOKEN}&lat=${lat}&lon=${lon}&format=json&accept-language=en    `
    );

    if (!response.ok) return null;
    const data = await response.json();
    const addr = data.address;

    const place = addr.suburb || addr.neighbourhood || addr.town || addr.village || addr.city_district || "";
    const subDistrict = addr.county || "";
    const district = addr.city || addr.district || addr.state_district || "";
    const state = addr.state || "";
    const pincode = addr.postcode || "";

    const addressParts = [place, subDistrict, district, state]
      .map(item => item?.replace(/\s*(taluk|district)\s*/gi, "").trim())
      .filter(Boolean);
    if (pincode) {
      addressParts.push(pincode);
    }

    const finalAddress = [...new Set(addressParts)].join(", ");


    return {
      formattedAddress: finalAddress || data.display_name,
      pincode: pincode
    };

  } catch (error) {
    console.error("LocationIQ Error:", error);
    return null;
  }
};