import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      _id: '1',
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'Shirts',
      image: 'https://cf.shopee.co.th/file/e45db12146ab3c620e7b5d286bac70ea', // 679px × 829px
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      _id: '2',
      name: 'Adidas Fit Shirt',
      slug: 'adidas-fit-shirt',
      category: 'Shirts',
      image: 'https://www.thaijpress.com/wp-content/uploads/2020/04/%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B8%B7%E0%B8%94%E0%B8%84%E0%B8%AD%E0%B8%A7%E0%B8%B5-%E0%B9%80%E0%B8%88.%E0%B9%80%E0%B8%9E%E0%B8%A3%E0%B8%AA-2570W_6.jpg',
      price: 250,
      countInStock: 0,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'high quality product',
    },
    {
      _id: '3',
      name: 'Nike Slim Pant',
      slug: 'nike-slim-pant',
      category: 'Pants',
      image: 'https://www.moveforwardparty.org/wp-content/uploads/2021/09/MFP-101-2021.09.08-%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%A3%E0%B8%84%E0%B8%81%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%84%E0%B8%81%E0%B8%A5-IMG_9078.jpg',
      price: 25,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'high quality product',
    },
    {
      _id: '4',
      name: 'Adidas Fit Pant',
      slug: 'adidas-fit-pant',
      category: 'Pants',
      image: 'https://fy.lnwfile.com/_/fy/_raw/46/qo/3m.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality product',
    },
  ],
};
export default data;


// {
//   "name": "Nike Slim Pant",
//   "slug": "Nike Slim Pant",
//   "image": "https://www.moveforwardparty.org/wp-content/uploads/2021/09/MFP-101-2021.09.08-%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%A3%E0%B8%84%E0%B8%81%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B9%84%E0%B8%81%E0%B8%A5-IMG_9078.jpg", 
//   "price": 150,
//   "category": "Shirts",
//   "brand": "Nike",
//   "countInStock": 10,
//   "rating": 4.5,
//   "numReviews": 10,
//   "description": "high quality shirt"
// }