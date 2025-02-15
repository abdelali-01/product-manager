let title = document.querySelector('#title') ;
let price = document.querySelector('#price') ;
let taxes = document.querySelector('#taxes') ;
let ads = document.querySelector('#ads') ;
let discount = document.querySelector('#discount') ;
let total = document.querySelector('#total') ;
let count = document.querySelector('#count') ;
let category = document.querySelector('#category') ;
let create = document.querySelector('.create') ;

let mode = 'create' ;
let up ;


function Calculateprice() {
   if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value  ;
    total.innerHTML = result + 'DA' ;
    total.style.background = 'green' ;
   }
   else{
    total.innerHTML = '00DA' ;
    total.style.background = '#de7272' ;
   }
}

// save data :
let dataProduct ;
let product = localStorage.getItem('product')
if(!product){
   dataProduct = [] ; 
}else{
   dataProduct = JSON.parse(product) ;
}

// create product :
create.onclick = function() {
    let newProduct = {
        title : title.value.toLowerCase() ,
        price : price.value ,
        taxes : taxes.value ,
        ads : ads.value ,
        discount : discount.value ,
        total : total.innerHTML ,
        count : count.value ,
        category : category.value.toLowerCase() ,
    }

    if(title.value != '' && price.value !='' && category.value != '' && count.value <= 100){
            if(mode === 'create'){
           if(newProduct.count > 1){
        for(let i = 0 ; i < newProduct.count ; i++){
            dataProduct.push(newProduct);
        }
        }else{
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct[up] = newProduct ;
        mode = 'create' ;
        count.style.display = 'block';
        create.innerHTML = 'Create' ;
    }
    clearData() ;
    }

 
    localStorage.setItem('product' , JSON.stringify(dataProduct)) ; 
    showData() ;;
}

// // clear unputs :
function clearData(){
    title.value = '' ;
    price.value = '' ;
    taxes.value = '' ;
    ads.value = '' ;
    discount.value = '' ;
    total.innerHTML = '' ;
    count.value = '' ;
    category.value = '' ;

    total.innerHTML = '00DA' ;
    total.style.background = '#de7272' ;
}
function showData() {
   let table = '';
   for( let i = 1 ; i< dataProduct.length ;i++){
    table += `
        <tr>
           <td>${i}</td>
           <td>${dataProduct[i].title}</td>
           <td>${dataProduct[i].price}</td>
           <td>${dataProduct[i].taxes}</td>
           <td>${dataProduct[i].ads}</td>
           <td>${dataProduct[i].discount}</td>
           <td>${dataProduct[i].total}</td>
           <td>${dataProduct[i].category}</td>
           <td><button onclick="updatePtoduct(${i})" id="updateBtn">update</button></td>
           <td><button onclick="deleteProduct(${i})" id="deleteBtn">delete</button></td>
        </tr>   
    `
    }
    document.getElementById('tbody').innerHTML = table ;
    let deleteAll = document.querySelector('.delete');
       if( dataProduct.length > 0){
          deleteAll.innerHTML = `
           <button onclick="deleteAllProduct()">delete All (${dataProduct.length-1})</button>
          `
       }else{
           deleteAll.innerHTML = '' ;
       }
}
showData();

function deleteProduct(i) {
  dataProduct.splice(i,1);
  localStorage.product = JSON.stringify(dataProduct);
  showData();
}
function updatePtoduct(i){
    title.value = dataProduct[i].title ;
    price.value = dataProduct[i].price ;
    taxes.value = dataProduct[i].taxes ;
    ads.value = dataProduct[i].ads ;
    discount.value = dataProduct[i].discount ;
    Calculateprice() ;
    category.value = dataProduct[i].category ;

    count.style.display = 'none';
    create.innerHTML = 'Update' ;
    mode = 'update' ;
    up = i ;
    scroll({ 
        top:0, 
        behavior:'smooth'
    })
}

function deleteAllProduct() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}


//search :
let searchMood = 'title' ;


function getSearchMode(id) {
    let search = document.querySelector('#search');
   if(id == 'byTitle'){
    searchMood = 'title' ;
    search.placeholder = 'Search By Title';
   }else{
    searchMood = 'category' ;
    search.placeholder = 'Search By Category' ;
   }
   search.focus() ;
   search.value = '';
   showData();
}
function scrollSearch() {
    scroll({
        top : '300',
        behavior : 'smooth' ,
       })
}

function searchData(value){
    let table = '' ;
    if(searchMood == 'title'){
        for(let i = 1 ; i < dataProduct.length ; i++){
            if(dataProduct[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                   <td>${i}</td>
                   <td>${dataProduct[i].title}</td>
                   <td>${dataProduct[i].price}</td>
                   <td>${dataProduct[i].taxes}</td>
                   <td>${dataProduct[i].ads}</td>
                   <td>${dataProduct[i].discount}</td>
                   <td>${dataProduct[i].total}</td>
                   <td>${dataProduct[i].category}</td>
                   <td><button onclick="updatePtoduct(${i})" id="updateBtn">update</button></td>
                   <td><button onclick="deleteProduct(${i})" id="deleteBtn">delete</button></td>
                </tr>   
            `
            }
        }
    }else{
        for(let i = 1 ; i < dataProduct.length ; i++){
            if(dataProduct[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                   <td>${i}</td>
                   <td>${dataProduct[i].title}</td>
                   <td>${dataProduct[i].price}</td>
                   <td>${dataProduct[i].taxes}</td>
                   <td>${dataProduct[i].ads}</td>
                   <td>${dataProduct[i].discount}</td>
                   <td>${dataProduct[i].total}</td>
                   <td>${dataProduct[i].category}</td>
                   <td><button onclick="updatePtoduct(${i})" id="updateBtn">update</button></td>
                   <td><button onclick="deleteProduct(${i})" id="deleteBtn">delete</button></td>
                </tr>   
            `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table ;
}

