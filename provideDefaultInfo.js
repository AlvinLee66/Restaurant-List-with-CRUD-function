function provideDefaultInfo(restaurantInfo) {
  if (restaurantInfo.name_en.length === 0) {
    restaurantInfo.name_en = '尚未填寫'
  }
    
  if (restaurantInfo.image.length === 0) {
    restaurantInfo.image = 'https://st2.depositphotos.com/4216129/9964/v/450/depositphotos_99642544-stock-illustration-stores-and-shop-facades.jpg'
  }

  if (restaurantInfo.phone.length === 0) {
    restaurantInfo.phone = '尚未填寫'
  }

  if (restaurantInfo.rating.length === 0) {
    restaurantInfo.rating = '尚未評分'
  }
  
  if (restaurantInfo.description.length === 0) {
    restaurantInfo.description = '尚未填寫描述'
  }
    
  return restaurantInfo
}
module.exports = provideDefaultInfo