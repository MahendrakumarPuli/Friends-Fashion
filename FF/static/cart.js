// loading the cart
document.addEventListener("DOMContentLoaded",()=>{
    loadcart()
})

let cartitems=[]

function loadcart(){
    let cartvalue=localStorage.getItem("cart")
    console.log("cartval",cartvalue)
    if(cartvalue){
        // storing the parsed data back into the array cartitems
        cartitems=JSON.parse(cartvalue)
        // updating the cartui
        updatecartui()

    }
}
// updating/describing the cart Ui
function updatecartui(){
    // accessing the cart items
    let cartproducts=document.querySelector(".cart-items")
    cartproducts.innerHTML='' // to ensure that initially the cart is empty

    // printing the items into the cart in the cartui
    cartitems.forEach((ele)=>{
        // console.log(ele)
        // creating a div section to display the items in the cart
        let cartprod=document.createElement("div")
        cartprod.className='col-12 col-sm-12 col-md-3 col-lg-3 g-4'
        // displaying the items
        cartprod.innerHTML=`<div class="card product">
        <img src=${ele.imgsrc} class="image-fluid prod-img" height=400px alt="...">
        <div class="card-body prod-info">
        <h5 class="card-title prod-title">${ele.title}</h5>
        <div class="d-flex justify-content-between">
        <p class="card-text price"><i class="bi bi-currency-rupee"></i>${ele.price*ele.quantity}</p>
        
        <!-- adding the increment and decrement button -->
            <div class="quantity-container">
            <button class="btn btn-danger decrement">-</button>
            <span class="quantity-value">${ele.quantity}</span>
            <button class="btn btn-success increment">+</button>
            <button class="btn btn-success delete">Delete</button>
            </div>
        </div>
        </div>
        </div>`

        // adding functionality to increment ,decrement and delete
        // step1
        let quantitycont=cartprod.querySelector(".quantity-container")
        console.log(quantitycont)
        let incrementbtn=cartprod.querySelector(".increment")
        let decrementbtn=cartprod.querySelector(".decrement")
        let deletebtn=cartprod.querySelector(".delete")

        // step2
        // Increment
        incrementbtn.addEventListener("click",()=>{
            // passing the parameters to increment function when button clicked
            incrementquant(quantitycont,ele)
        })

        // Decrement
        decrementbtn.addEventListener("click",()=>{
            // passing the parameters to decrement function when button clicked
            decrementquant(quantitycont,ele)
        })

        // Delete
        deletebtn.addEventListener("click",()=>{
            // passing the parameters to delete function when button clicked
            deletequant(ele)
        })

        // appending the cartproduct to ui
        cartproducts.appendChild(cartprod)

    })    
    cartTotal()
}

// adding increment functionality
function incrementquant(val,item){
    item.quantity++     //value will be incremented
    val.innerText=item.quantity //printing the incremented value

    // updating the local storage
    localStorage.setItem("cart",JSON.stringify(cartitems))

    // updating the ui
    updatecartui()
}

// adding the decrement functionality
function decrementquant(val,item){
    if(item.quantity>1){
        item.quantity--        //value will be decremented
        val.innerText=item.quantity //printing the decremented value

        // updating the local storage
        localStorage.setItem("cart",JSON.stringify(cartitems))
    
        // updating the ui
        updatecartui()
    }
}

// adding delete functionality
function deletequant(item){
    // logic
    cartitems=cartitems.filter((ele)=>ele.title!==item.title)
    // updating the local storage
    localStorage.setItem("cart",JSON.stringify(cartitems))
    
    // updating the ui
    updatecartui()
}

// adding clear cart functionality
function removeall(){
    // logic
    cartitems.splice(0)
    // updating the local storage
    localStorage.setItem("cart",JSON.stringify(cartitems))
    
    // updating the ui
    updatecartui()
}

// adding cart total functionality
function cartTotal(){
    let totalEle=document.querySelector("#cart-total")
    console.log(totalEle)
    let cartTotal=cartitems.reduce((total,ele)=>total+ele.price*ele.quantity,0)
    totalEle.innerText="TOTAL : "+cartTotal
}
// const total = calculateTotal(cart);
// console.log("Total Amount:"+ <i class="bi bi-currency-rupee"></i> + total);


// adding cart-icon total functionality
// Example cart array
// const cart = [
//     { name: "Product 1", price: 100, quantity: 2 },
//     { name: "Product 2", price: 50, quantity: 1 },
//     { name: "Product 3", price: 150, quantity: 3 }
// ];

