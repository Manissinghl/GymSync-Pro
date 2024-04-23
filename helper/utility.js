function calculateBMI(weight, height) {
    // Convert height from centimeters to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI
    const bmi = weight / (heightInMeters * heightInMeters);
    console.log(weight,height,bmi)
    // Determine BMI category
    let category;
    if (bmi < 18.5) {
        category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 25) {
        category = "Normal weight";
    } else if (bmi >= 25 && bmi < 30) {
        category = "Overweight";
    } else {
        category = "Obesity";
    }
    
    return category;
}
function removeEmpty(obj) {
    for (let key in obj) {
        if (obj[key] && typeof obj[key] === 'object') {
            removeEmpty(obj[key]); // Recursive call for nested objects
            if (Object.keys(obj[key]).length === 0) {
                delete obj[key]; // Delete empty nested objects
            }
        } else if (obj[key] === "" || obj[key] === null || obj[key] === undefined) {
            delete obj[key]; // Delete empty keys
        }
    }
    return obj;
}
function greetByTime() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Good morning";
    } else if (hour >= 12 && hour < 18) {
        return "Good afternoon";
    } else {
        return "Good night";
    }
}
function textToHex(text) {
    // Generate a hash from the string using a simple hashing algorithm
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to a hexadecimal color representation
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF; // Extract each byte from the hash
        color += value.toString(16).padStart(2, "0"); // Convert each byte to hexadecimal
    }

    return color;
}
export default {greetByTime,calculateBMI,textToHex,removeEmpty}