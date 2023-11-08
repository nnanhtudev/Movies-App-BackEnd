const capitalizeFirstLetter = (inputString) => {
  return inputString
    .split(' ') // Tách thành các từ bằng khoảng trắng
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Chuyển chữ cái đầu của mỗi từ thành viết hoa
    .join(' '); // Kết hợp các từ lại thành chuỗi
}




module.exports = { capitalizeFirstLetter }