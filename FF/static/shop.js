// loading all the items into the initially for selecting
document.addEventListener("DOMContentLoaded",()=>{
    // loading all the buttons by accessing it
    let addtocartbtn=document.querySelectorAll(".add-to-cart")
    // loading the cart-icon
    let cartIcon=document.getElementById("cart-icon")

    // adding the functionality to add to cart buttons
    addtocartbtn.forEach((button)=>{

        // console.log("btn:",button)
        // adding the events to the button

        button.addEventListener(("click"),(e)=>{
            // console.log(e.target)
            // accessing the product information through btn clicks
            let productData=button.parentElement.parentElement.parentElement
            // console.log(productData)
            // prodction information : img-src,title,price,description
            let imageUrl=productData.querySelector(".prod-img").src
            let pname=productData.querySelector(".prod-title").innerText
            let pprice=productData.querySelector(".price").innerText
            // console.log([imageUrl,pname,pprice])
            // creating the object format for selected items
            let selectedProd={
                title:pname,
                price:pprice,
                imgsrc:imageUrl,
                quantity:1
            }
            // console.log(selectedProd)
            // passing the selected product to add to art funcion
            addtocart(selectedProd)
        })
    })
    // function to navigate to the cart page
    cartIcon.addEventListener("click",()=>{
        window.location.href="cart.html"
    })
})


// empty array to store the cart added

let cartitems=[]

// adding items to the cart

function addtocart(product){
    // console.log("p:",product)
    // checking the items if exists in cart or not
    let existingitem=cartitems.find(item=>item.title===product.title)
    // console.log(existingitem)
    if (existingitem){
        existingitem.quantity++
    }
    else{
        cartitems.push(product)
    }
    // adding the cart items to local storage
    localStorage.setItem("cart",JSON.stringify(cartitems))
    // updating the cart-icon value
    iconvalue()
}

// updating the cart
function iconvalue(){
    let iconvalue=document.getElementById("icon-value")
    let totalele=cartitems.reduce((total,item)=>total+item.quantity,0)
    iconvalue.innerText=totalele
}

// loading the items into the local string
function loadcart(){
    let cartvalue=localStorage.getItem("cart")
    console.log("cartval",cartvalue)
    if(cartvalue){
        // storing the parsed data back into the array cartitems
        cartitems=JSON.parse(cartvalue)
        // updating the carticon
        iconvalue()
    }
}

loadcart()