import './style.css';

let productDiv = document.querySelector('.product');
var CategoryListDiv = document.querySelector('.CategoryList');
let allCat = [];

let displayProduct = async (allCheckCat = []) => {
  productDiv.innerHTML = '';
  CategoryListDiv.innerHTML = '';
  let product = await fetch('https://fakestoreapi.com/products');
  let finalProduct = await product.json();
  finalProduct.forEach((element) => {
    if (!allCat.includes(element.category)) {
      CategoryListDiv.innerHTML += `<label> 
      <input type="checkbox" onclick="categoryFilter()" value="${element.category}"/> ${element.category} 
      </label>`;
      allCat.push(element.category);
    }
    if (allCheckCat.length == 0) {
      allCheckCat = allCat;
    }
    if (allCheckCat.includes(element.category)) {
      productDiv.innerHTML += `<div class="productItems">
      <img src="${element.image}" alt=""/>
      <h4>${element.category}</h4>
      <p>$${element.price}</p>
      <h3>${element.title}</h3>
    </div>`;
    }
  });
};

displayProduct();

let categoryFilter = () => {
  let checkInput = document.querySelectorAll("input[type='checkbox']");
  let checkdata = [];
  checkInput.forEach((e) => {
    if (e.checked) {
      checkdata.push(e.value);
    }
  });
  displayProduct(checkdata);
};
