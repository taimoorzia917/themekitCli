
 let cartBtn = document.querySelector("#AddToCart");
let form =  document.querySelector("#AddToCartForm");
let spinner =  document.querySelector("#spinner");
let notifyText =  document.querySelector("#cart-notif-txt");
console.log(form);
 form.addEventListener("submit", (e)=>{
  e.preventDefault();
  spinner.classList.add("spinnerCart");
  if(cartBtn.getAttribute("data-variant-id")) {
  removeItem()
  }
    else { 
      setTimeout(addItem, 2000);
    }
 })
 notify = () => {
   notifyText.innerHTML = `✅ Item Added to cart`;     
  }

 function removeItem() {
   let variantId =  cartBtn.getAttribute("data-variant-id");
   $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      dataType: 'json',
     data: {
  'id': parseFloat(variantId),
  'quantity': 0
}
   })
   .then(data => {
    cartBtn.textContent = "Add to cart";
    cartBtn.removeAttribute("data-variant-id");
})
  }
  function addItem() {
   $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      dataType: 'json',
      data: $('#'+"AddToCartForm").serialize()
   })
   .then(data => {
    // cartBtn.textContent = "Remove from cart";
    cartBtn.setAttribute("data-variant-id", data.variant_id);
    console.log('item added');
    spinner.classList.remove("spinnerCart");
    setTimeout(notify, 500);
})
          }

          // 

