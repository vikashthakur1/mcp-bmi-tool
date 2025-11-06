function calculateBMI(params) {
    const { unit = "metric", height_cm, weight_kg, height_in, weight_lb } = params;
  
    if (!["metric", "imperial"].includes(unit)) {
      return { status: "error", error: "Invalid unit. Use 'metric' or 'imperial'." };
    }
  
    let bmi;
  
    // ---- METRIC ----
    if (unit === "metric") {
      if (!height_cm || !weight_kg) {
        return { status: "error", error: "height_cm and weight_kg required for metric." };
      }
      if (height_cm <= 0 || weight_kg <= 0) {
        return { status: "error", error: "Height and weight must be positive." };
      }
  
      bmi = weight_kg / ((height_cm / 100) ** 2);
    }
  
    // ---- IMPERIAL ----
    else {
      if (!height_in || !weight_lb) {
        return { status: "error", error: "height_in and weight_lb required for imperial." };
      }
      if (height_in <= 0 || weight_lb <= 0) {
        return { status: "error", error: "Height and weight must be positive." };
      }
  
      bmi = 703 * weight_lb / (height_in ** 2);
    }
  
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
  
    return {
      status: "success",
      data: {
        bmi: Number(bmi.toFixed(1)),
        category,
        healthy_range: "18.5 - 24.9"
      }
    };
  }
  
  // TEST REQUEST
  const request = {
    method: "calculate_bmi",
    params: { unit: "metric", height_cm: 170, weight_kg: 65 }
  };
  
  console.log(JSON.stringify(calculateBMI(request.params), null, 2));
  