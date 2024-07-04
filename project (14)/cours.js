let title = document . getElementById ("title");
let price = document . getElementById ("price");
let taxes = document . getElementById ("taxes");
let ads = document . getElementById ("ads");
let discount = document . getElementById ("discount");
let total = document . getElementById ("total");
let count = document . getElementById ("count");
let category = document . getElementById ("category");
let  submit= document . getElementById ("submit");

let mod = 'create';
let tmp;
// get total
function gettotal()
{
    if( price.value != '' )
    {
        let result = ( +price.value + +taxes.value + +ads.value) - +discount . value ;
        total . innerHTML = result ;
        total . style . backgroundColor = 'green' ;
    }else{
        total . style . backgroundColor = 'brown' ;
        total . innerHTML = '' ;
    }
}
// create product
let datapro ;
if( localStorage . product != null ){
    datapro = JSON . parse ( localStorage . product )
}else{
    datapro = [];
};
submit . onclick = function ()
{
    let NEWPRO = {
        title : title . value . toLowerCase(),
        price : price . value ,
        taxes : taxes . value ,
        ads : ads . value ,
        discount : discount . value ,
        total : total . innerHTML ,
        count : count . value ,
        category : category . value . toLowerCase(),
    };
    if(title.value != '' && price.value != '' && category.value !='' && NEWPRO.count<501)
    {
        if(mod === 'create'){
            if( NEWPRO . count > 1 ){
                for(let i = 0 ; i < NEWPRO . count ; i++ ){
                    datapro . push ( NEWPRO ) ;
                }
            }else{
                datapro . push ( NEWPRO ) ;
            }
        }else{
            datapro [  tmp  ] = NEWPRO ;
            mod = 'create';
            submit . innerHTML = 'create' ;
            count . style . display = 'block'
        } 
        cleareData()
    }
    
   
    
    

   
// save localstorage
    localStorage . setItem ( 'product' , JSON.stringify ( datapro ) ) ;
    showData()
}




// cleare inputs
function cleareData() {
    title . value = '' ;
    price . value = '' ;
    taxes . value = '' ;
    ads . value = '' ;
    discount . value = '' ;
    total . innerHTML = '' ;
    count . value = '' ;
    category . value = '' ;
};


// read

function showData(){
    gettotal()
    let table = '' ;
    for(let i = 0 ; i < datapro . length ; i++ ) {
        table += `
        <tr>
            <td> ${ i+1 } </td>
            <td> ${ datapro [ i ] . title } </td>
            <td> ${ datapro [ i ] . price } </td>
            <td> ${ datapro [ i ] . taxes } </td>
            <td> ${ datapro [ i ] . ads } </td>
            <td> ${ datapro [ i ] . discount } </td>
            <td> ${ datapro [ i ] . total } </td>
            <td> ${ datapro [ i ] . category } </td>
            <td> <button onclick ="updateData( ${ i } )" id = "update">update</button> </td>
            <td> <button onclick ="delatedata( ${ i } )" id = "delate">delate</button> </td>
        </tr>
        `
        
    }
    document . getElementById( 'tbody' ) . innerHTML = table ;
    let btnDelete = document . getElementById( 'deleteAll' ) ;
    if( datapro . length > 0 ){
        btnDelete . innerHTML = `
        <button onclick="deleteAll()">delate all ( ${ datapro . length } )</button>
        `
    }else{
        btnDelete . innerHTML = '' ;
    }
    
}
showData()







// delate
function delatedata(i){
    datapro . splice(i,1)
    localStorage . product = JSON . stringify( datapro )
    showData()
}


function deleteAll(){
    localStorage . clear();
    datapro . splice(0);
    showData()
}





// count
// update

function updateData(i){
    title . value = datapro[i] . title ;
    price . value = datapro[i] . price ;
    taxes . value = datapro[i] . taxes ;
    ads . value = datapro[i] . ads ;
    discount . value = datapro[i] . discount ;
    gettotal() ;
    count . style . display = 'none' ;
    category . value = datapro[i] . category ;
    submit . innerHTML = 'Update' ;
    mod ='Update' ;
    tmp =i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// search

let  searchnMood = 'title';
function getSearchMood(id) 
{
    let search= document . getElementById ('search')
    if(id == 'searchtitle'){
        searchnMood='title'
    }else{
        searchnMood='category'
    }
    search.placeholder = 'search by ' + searchnMood ;
search.focus()
search.value = '';
showData()
}


function searchData(value) 
{
    let table = '';
    if(searchnMood == 'title')
    {
        for(let i = 0 ; i <datapro.length ; i++)
        {
            if(datapro[i].title.includes(value. toLowerCase()))
            {
                table += `
                    <tr>
                        <td> ${ i } </td>
                        <td> ${ datapro [ i ] . title } </td>
                        <td> ${ datapro [ i ] . price } </td>
                        <td> ${ datapro [ i ] . taxes } </td>
                        <td> ${ datapro [ i ] . ads } </td>
                        <td> ${ datapro [ i ] . discount } </td>
                        <td> ${ datapro [ i ] . total } </td>
                        <td> ${ datapro [ i ] . category } </td>
                        <td> <button onclick ="updateData( ${ i } )" id = "update">update</button> </td>
                        <td> <button onclick ="delatedata( ${ i } )" id = "delate">delate</button> </td>
                    </tr>
                `
            }
        }
    }
    else
    {
        for(let i = 0 ; i <datapro.length ; i++)
            {
                if(datapro[i].category.includes(value))
                {
                    table += `
                        <tr>
                            <td> ${ i } </td>
                            <td> ${ datapro [ i ] . title } </td>
                            <td> ${ datapro [ i ] . price } </td>
                            <td> ${ datapro [ i ] . taxes } </td>
                            <td> ${ datapro [ i ] . ads } </td>
                            <td> ${ datapro [ i ] . discount } </td>
                            <td> ${ datapro [ i ] . total } </td>
                            <td> ${ datapro [ i ] . category } </td>
                            <td> <button onclick ="updateData( ${ i } )" id = "update">update</button> </td>
                            <td> <button onclick ="delatedata( ${ i } )" id = "delate">delate</button> </td>
                        </tr>
                    `
                }
            }
    }
    document . getElementById( 'tbody' ) . innerHTML = table ;
}




// clean data









let btnup = document . getElementById ('btnup') ;
window.onscroll = function(){
   if(scrollY >= 100){
        btnup . style .display='block';
   }else{
        btnup . style .display='none';
   }
}
btnup . onclick = function(){
    scroll({
        left:0,
        top:0,
        behavior:'smooth',
    })
}